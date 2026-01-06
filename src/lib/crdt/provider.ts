import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export class CRDTProvider {
  private doc: Y.Doc;
  private provider: WebsocketProvider;
  private documentId: string;
  private userId: string;
  private syncCallbacks: ((isSynced: boolean) => void)[] = [];
  private awarenessCallbacks: ((updates: any) => void)[] = [];

  constructor(documentId: string, userId: string) {
    this.documentId = documentId;
    this.userId = userId;
    this.doc = new Y.Doc();

    // Initialize WebSocket provider for real-time collaboration
    this.provider = new WebsocketProvider(
      process.env.WEBSOCKET_URL || "ws://localhost:1234",
      documentId,
      this.doc,
      {
        connect: true,
        // Add authentication parameters
        params: {
          userId,
          room: documentId,
        },
        // Add connection options for resilience
        // Remove invalid connection option
      }
    );

    // Set up user awareness with proper info
    this.setupUserAwareness();
    this.setupEventListeners();
  }

  private setupUserAwareness() {
    // Set initial user state
    this.provider.awareness.setLocalStateField("user", {
      id: this.userId,
      name: this.getUserName(),
      email: this.getUserEmail(),
      color: this.getUserColor(this.userId),
      cursor: { x: 0, y: 0 },
      isActive: true,
    });
  }

  private setupEventListeners() {
    // Connection status events
    this.provider.on("status", (event: any) => {
      console.log("WebSocket status:", event.status);
      const isConnected = event.status === "connected";
      this.syncCallbacks.forEach((callback) => callback(isConnected));
    });

    // Sync events
    this.provider.on("sync", (isSynced: boolean) => {
      this.syncCallbacks.forEach((callback) => callback(isSynced));
    });

    // Awareness events for user presence
    this.provider.awareness.on("update", (updates: any) => {
      this.awarenessCallbacks.forEach((callback) => callback(updates));
    });

    // Connection events - use type assertion to bypass TypeScript checking
    this.provider.on("connect" as any, () => {
      console.log(`Connected to room: ${this.documentId}`);
      this.syncCallbacks.forEach((callback) => callback(true));
    });

    this.provider.on("disconnect" as any, () => {
      console.log(`Disconnected from room: ${this.documentId}`);
      this.syncCallbacks.forEach((callback) => callback(false));
    });
  }

  // Get Y.js data structures
  getText(name: string = "content"): Y.Text {
    return this.doc.getText(name);
  }

  getArray(name: string = "tasks"): Y.Array<any> {
    return this.doc.getArray(name);
  }

  getMap(name: string = "drawing"): Y.Map<any> {
    return this.doc.getMap(name);
  }

  // Get connected users from awareness
  getConnectedUsers(): any[] {
    if (!this.provider?.awareness) return [];

    return Array.from(this.provider.awareness.getStates().values())
      .filter((state) => state.user && state.user.id !== this.userId)
      .map((state) => ({
        id: state.user.id,
        name: state.user.name || `User ${state.user.id}`,
        email: state.user.email || "",
        cursor: state.user.cursor || { x: 0, y: 0 },
        color: state.user.color || this.getUserColor(state.user.id),
        isActive: state.user.isActive !== false,
        lastSeen: new Date().toISOString(),
      }));
  }

  // Update user cursor position
  updateCursor(x: number, y: number) {
    if (!this.provider?.awareness) return;

    const currentState = this.provider.awareness.getLocalState() || {};
    const userState = {
      ...currentState.user,
      cursor: { x, y },
    };

    this.provider.awareness.setLocalStateField("user", userState);
  }

  // Get document state
  getDocument(): Y.Doc {
    return this.doc;
  }

  // Sync with database
  async syncWithDatabase(content?: Buffer): Promise<Buffer> {
    if (content) {
      // Load from database
      try {
        const state = new Uint8Array(content);
        Y.applyUpdate(this.doc, state);
      } catch (error) {
        console.error("Error applying database update:", error);
      }
    }

    // Save to database
    try {
      const state = Y.encodeStateAsUpdate(this.doc);
      const buffer = Buffer.from(state);
      return buffer;
    } catch (error) {
      console.error("Error encoding state:", error);
      return Buffer.alloc(0);
    }
  }

  // Event listeners
  onSync(callback: (isSynced: boolean) => void) {
    this.syncCallbacks.push(callback);
  }

  onAwarenessUpdate(callback: (updates: any) => void) {
    this.awarenessCallbacks.push(callback);
  }

  // Utility methods
  private getUserColor(userId: string): string {
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

  private getUserName(): string {
    // Try to get user info from session or localStorage
    if (typeof window !== "undefined") {
      try {
        const sessionElement = document.querySelector("[data-session]");
        if (sessionElement) {
          const sessionData = sessionElement.getAttribute("data-session");
          if (sessionData) {
            const session = JSON.parse(sessionData);
            return session.user?.name || `User ${this.userId}`;
          }
        }
      } catch {
        // Fallback to localStorage
        const session = localStorage.getItem("next-auth.session-token");
        return session ? `User ${this.userId}` : "Anonymous User";
      }
    }
    return `User ${this.userId}`;
  }

  private getUserEmail(): string {
    if (typeof window !== "undefined") {
      try {
        const sessionElement = document.querySelector("[data-session]");
        if (sessionElement) {
          const sessionData = sessionElement.getAttribute("data-session");
          if (sessionData) {
            const session = JSON.parse(sessionData);
            return session.user?.email || "";
          }
        }
      } catch {
        return "";
      }
    }
    return "";
  }

  // Cleanup
  destroy() {
    if (this.provider) {
      this.provider.destroy();
    }
    this.doc.destroy();
    this.syncCallbacks = [];
    this.awarenessCallbacks = [];
  }
}
