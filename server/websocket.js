const WebSocket = require('ws')
const http = require('http')
const url = require('url')

// Store active rooms and users
const rooms = new Map()
const users = new Map()

class WebSocketServer {
  constructor() {
    this.wss = null
    this.port = process.env.WEBSOCKET_PORT || 3001
  }

  start() {
    const server = http.createServer()
    this.wss = new WebSocket.Server({ 
      server,
      path: '/room/:id'
    })

    this.wss.on('connection', (ws, req) => {
      this.handleConnection(ws, req)
    })

    server.listen(this.port, () => {
      console.log(`WebSocket server running on port ${this.port}`)
    })
  }

  handleConnection(ws, req) {
    // Parse room ID from URL
    const parsedUrl = url.parse(req.url, true)
    const pathParts = parsedUrl.pathname.split('/')
    const roomId = pathParts[pathParts.length - 1]

    if (!roomId) {
      ws.close(1008, 'Room ID required')
      return
    }

    console.log(`User connecting to room: ${roomId}`)

    // Get or create room
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        id: roomId,
        users: new Map(),
        createdAt: new Date()
      })
    }

    const room = rooms.get(roomId)
    const userId = this.generateUserId()

    // Add user to room
    const user = {
      id: userId,
      ws,
      name: `User ${userId}`,
      email: '',
      color: this.getUserColor(userId),
      cursor: { x: 0, y: 0 },
      isActive: true,
      joinedAt: new Date()
    }

    room.users.set(userId, user)
    users.set(ws, { userId, roomId })

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connected',
      roomId,
      userId,
      users: Array.from(room.users.values()).map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        color: u.color,
        cursor: u.cursor,
        isActive: u.isActive
      }))
    }))

    // Notify other users in the room
    this.broadcastToRoom(roomId, {
      type: 'user_joined',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        color: user.color,
        cursor: user.cursor,
        isActive: user.isActive
      }
    }, userId)

    // Handle messages from this user
    ws.on('message', (data) => {
      this.handleMessage(roomId, userId, data)
    })

    // Handle disconnection
    ws.on('close', () => {
      this.handleDisconnection(roomId, userId)
    })

    // Handle errors
    ws.on('error', (error) => {
      console.error(`WebSocket error for user ${userId}:`, error)
    })
  }

  handleMessage(roomId, userId, data) {
    try {
      const message = JSON.parse(data)
      const room = rooms.get(roomId)

      if (!room) return

      const user = room.users.get(userId)
      if (!user) return

      switch (message.type) {
        case 'cursor_update':
          user.cursor = message.cursor
          
          // Broadcast cursor position to other users
          this.broadcastToRoom(roomId, {
            type: 'cursor_update',
            userId,
            cursor: message.cursor
          }, userId)
          break

        case 'content_update':
          // Broadcast content update to other users
          this.broadcastToRoom(roomId, {
            type: 'content_update',
            userId,
            content: message.content,
            timestamp: new Date().toISOString()
          }, userId)
          break

        case 'drawing_update':
          // Broadcast drawing data to other users
          this.broadcastToRoom(roomId, {
            type: 'drawing_update',
            userId,
            drawing: message.drawing,
            timestamp: new Date().toISOString()
          }, userId)
          break

        case 'user_info':
          // Update user information
          user.name = message.name || user.name
          user.email = message.email || user.email
          
          this.broadcastToRoom(roomId, {
            type: 'user_updated',
            userId,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              color: user.color,
              cursor: user.cursor,
              isActive: user.isActive
            }
          }, userId)
          break

        default:
          console.log(`Unknown message type: ${message.type}`)
      }
    } catch (error) {
      console.error('Error handling message:', error)
    }
  }

  handleDisconnection(roomId, userId) {
    const room = rooms.get(roomId)
    if (!room) return

    const user = room.users.get(userId)
    if (!user) return

    // Remove user from room
    room.users.delete(userId)

    // Notify other users
    this.broadcastToRoom(roomId, {
      type: 'user_left',
      userId,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }, userId)

    // Clean up if room is empty
    if (room.users.size === 0) {
      rooms.delete(roomId)
      console.log(`Room ${roomId} deleted (empty)`)
    }

    console.log(`User ${userId} disconnected from room ${roomId}`)
  }

  broadcastToRoom(roomId, message, excludeUserId = null) {
    const room = rooms.get(roomId)
    if (!room) return

    room.users.forEach((user, userId) => {
      if (userId !== excludeUserId && user.ws.readyState === WebSocket.OPEN) {
        try {
          user.ws.send(JSON.stringify(message))
        } catch (error) {
          console.error(`Error sending message to user ${userId}:`, error)
        }
      }
    })
  }

  generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9)
  }

  getUserColor(userId) {
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']
    const index = userId.charCodeAt(0) % colors.length
    return colors[index]
  }

  getRoomInfo(roomId) {
    const room = rooms.get(roomId)
    if (!room) return null

    return {
      id: room.id,
      userCount: room.users.size,
      users: Array.from(room.users.values()).map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        color: user.color,
        cursor: user.cursor,
        isActive: user.isActive,
        joinedAt: user.joinedAt
      })),
      createdAt: room.createdAt
    }
  }

  // Get server stats
  getStats() {
    return {
      totalRooms: rooms.size,
      totalUsers: Array.from(rooms.values()).reduce((sum, room) => sum + room.users.size, 0),
      rooms: Array.from(rooms.keys())
    }
  }
}

// Start the WebSocket server
const server = new WebSocketServer()
server.start()

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down WebSocket server...')
  process.exit(0)
})

module.exports = WebSocketServer
