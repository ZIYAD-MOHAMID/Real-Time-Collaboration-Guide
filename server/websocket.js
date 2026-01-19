import WebSocket, { WebSocketServer as WSServer } from "ws";
import { createServer } from "http";
import { parse } from "url";
import { PubSub } from "graphql-subscriptions";
import { setupWSConnection } from "y-websocket/bin/utils";
// Store active rooms and users
const rooms = new Map();
const users = new Map();
const pubsub = new PubSub();

class WebSocketServer {
  constructor() {
    this.wss = null;
    this.port = process.env.WEBSOCKET_PORT || 1234;
  }

  start() {
    const server = createServer();
    this.wss = new WSServer({
      server,
      // No path restriction - handle all connections
    });

    this.wss.on("connection", (ws, req) => {
      this.handleConnection(ws, req);
    });

    server.listen(this.port, () => {
      console.log(`WebSocket server running on port ${this.port}`);
    });
  }

  handleConnection(ws, req) {
    // Parse room ID from URL - y-websocket uses the document ID as the path
    const parsedUrl = parse(req.url, true);
    const roomId = parsedUrl.pathname.substring(1); // Remove leading slash

    if (!roomId) {
      ws.close(1008, "Room ID required");
      return;
    }
    setupWSConnection(ws, req, { docName: roomId });
    console.log(`User connecting to room: ${roomId}`);

    // Get or create room
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        id: roomId,
        users: new Map(),
        createdAt: new Date(),
      });
    }

    const room = rooms.get(roomId);
    const userId = this.generateUserId();

    // Add user to room
    const user = {
      id: userId,
      ws,
      name: `User ${userId}`,
      email: "",
      color: this.getUserColor(userId),
      cursor: { x: 0, y: 0 },
      isActive: true,
      joinedAt: new Date(),
    };

    room.users.set(userId, user);
    users.set(ws, { userId, roomId });

    // Send welcome message
    ws.send(
      JSON.stringify({
        type: "connected",
        roomId,
        userId,
        users: Array.from(room.users.values()).map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          color: u.color,
          cursor: u.cursor,
          isActive: u.isActive,
        })),
      }),
    );

    // Notify other users in the room
    this.broadcastToRoom(
      roomId,
      {
        type: "user_joined",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          color: user.color,
          cursor: user.cursor,
          isActive: user.isActive,
        },
      },
      userId,
    );

    // Publish to GraphQL PubSub for activeUsers subscription
    this.publishActiveUsers(roomId);

    // Handle messages from this user
    ws.on("message", (data) => {
      this.handleMessage(roomId, userId, data);
    });

    // Handle disconnection
    ws.on("close", () => {
      this.handleDisconnection(roomId, userId);
    });

    // Handle errors
    ws.on("error", (error) => {
      console.error(`WebSocket error for user ${userId}:`, error);
    });
  }

  handleMessage(roomId, userId, data) {
    try {
      const room = rooms.get(roomId);
      if (!room) return;

      const user = room.users.get(userId);
      if (!user) return;

      // Handle binary data from y-websocket
      if (
        data instanceof Buffer ||
        data instanceof ArrayBuffer ||
        data instanceof Uint8Array
      ) {
        // Validate binary data before broadcasting
        if (data instanceof Buffer && data.length === 0) {
          console.warn("Received empty binary data, skipping broadcast");
          return;
        }

        if (data instanceof Uint8Array && data.length === 0) {
          console.warn("Received empty Uint8Array, skipping broadcast");
          return;
        }

        // Broadcast binary Y.js updates to other users in the room
        this.broadcastToRoom(roomId, data, userId);
        return;
      }

      // Handle text messages (JSON)
      if (typeof data === "string") {
        // Validate JSON string before parsing
        if (!data || data.trim().length === 0) {
          console.warn("Received empty string message, skipping");
          return;
        }

        const message = JSON.parse(data);

        switch (message.type) {
          case "cursor_update":
            user.cursor = message.cursor;

            // Broadcast cursor position to other users
            this.broadcastToRoom(
              roomId,
              {
                type: "cursor_update",
                userId,
                cursor: message.cursor,
              },
              userId,
            );
            break;

          case "content_update":
            // Broadcast content update to other users
            this.broadcastToRoom(
              roomId,
              {
                type: "content_update",
                userId,
                content: message.content,
                timestamp: new Date().toISOString(),
              },
              userId,
            );
            break;

          case "drawing_update":
            // Broadcast drawing data to other users
            this.broadcastToRoom(
              roomId,
              {
                type: "drawing_update",
                userId,
                drawing: message.drawing,
                timestamp: new Date().toISOString(),
              },
              userId,
            );
            break;

          case "user_info":
            // Update user information
            user.name = message.name || user.name;
            user.email = message.email || user.email;

            this.broadcastToRoom(
              roomId,
              {
                type: "user_updated",
                userId,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  color: user.color,
                  cursor: user.cursor,
                  isActive: user.isActive,
                },
              },
              userId,
            );

            // Publish updated active users list
            this.publishActiveUsers(roomId);
            break;

          default:
            console.log(`Unknown message type: ${message.type}`);
        }
      }
    } catch (error) {
      console.error("Error handling message:", error);
      console.error("Message data that caused error:", data);
    }
  }

  handleDisconnection(roomId, userId) {
    const room = rooms.get(roomId);
    if (!room) return;

    const user = room.users.get(userId);
    if (!user) return;

    // Remove user from room
    room.users.delete(userId);

    // Notify other users
    this.broadcastToRoom(
      roomId,
      {
        type: "user_left",
        userId,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      userId,
    );

    // Publish updated active users list
    this.publishActiveUsers(roomId);

    // Clean up if room is empty
    if (room.users.size === 0) {
      rooms.delete(roomId);
      console.log(`Room ${roomId} deleted (empty)`);
    }

    console.log(`User ${userId} disconnected from room ${roomId}`);
  }

  broadcastToRoom(roomId, message, excludeUserId = null) {
    const room = rooms.get(roomId);
    if (!room) return;

    room.users.forEach((user, userId) => {
      if (userId !== excludeUserId && user.ws.readyState === WebSocket.OPEN) {
        try {
          // Handle binary messages (for Y.js updates)
          if (
            message instanceof Buffer ||
            message instanceof ArrayBuffer ||
            message instanceof Uint8Array
          ) {
            user.ws.send(message);
          } else {
            // Handle text messages (JSON)
            user.ws.send(JSON.stringify(message));
          }
        } catch (error) {
          console.error(`Error sending message to user ${userId}:`, error);
        }
      }
    });
  }

  generateUserId() {
    return "user_" + Math.random().toString(36).substr(2, 9);
  }

  getUserColor(userId) {
    const colors = [
      "#ef4444",
      "#f59e0b",
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#ec4899",
    ];
    const index = userId.charCodeAt(0) % colors.length;
    return colors[index];
  }

  getRoomInfo(roomId) {
    const room = rooms.get(roomId);
    if (!room) return null;

    return {
      id: room.id,
      userCount: room.users.size,
      users: Array.from(room.users.values()).map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        color: user.color,
        cursor: user.cursor,
        isActive: user.isActive,
        joinedAt: user.joinedAt,
      })),
      createdAt: room.createdAt,
    };
  }

  // Publish active users to GraphQL PubSub
  publishActiveUsers(roomId) {
    const room = rooms.get(roomId);
    if (!room) return;

    const activeUsers = Array.from(room.users.values()).map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      cursor: user.cursor,
      color: user.color,
      isActive: user.isActive,
      lastSeen: new Date().toISOString(),
    }));

    pubsub.publish("ACTIVE_USERS", {
      activeUsers: {
        documentId: roomId,
        users: activeUsers,
      },
    });
  }

  // Get server stats
  getStats() {
    return {
      totalRooms: rooms.size,
      totalUsers: Array.from(rooms.values()).reduce(
        (sum, room) => sum + room.users.size,
        0,
      ),
      rooms: Array.from(rooms.keys()),
    };
  }
}

// Start the WebSocket server
const server = new WebSocketServer();
server.start();

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down WebSocket server...");
  process.exit(0);
});

export default WebSocketServer;
