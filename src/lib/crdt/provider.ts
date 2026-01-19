import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

type SaveHandler = (update: Uint8Array) => Promise<void>;

export class CRDTProvider {
  private doc: Y.Doc;
  private provider: WebsocketProvider;
  private documentId: string;
  private userId: string;

  private syncCallbacks: ((isSynced: boolean) => void)[] = [];
  private awarenessCallbacks: ((updates: any) => void)[] = [];
  private changeCallbacks: (() => void)[] = [];

  private saveHandler: SaveHandler | null = null;
  // Circuit breaker to prevent auto-save loops during initial data load
  private isInitialLoading = false;

  constructor(documentId: string, userId: string) {
    this.documentId = documentId;
    this.userId = userId;
    this.doc = new Y.Doc();

    const WS_PORT = process.env.NEXT_PUBLIC_WS_PORT || "1234";
    const WEBSOCKET_URL = `ws://localhost:${WS_PORT}`;

    try {
      this.provider = new WebsocketProvider(
        WEBSOCKET_URL,
        documentId,
        this.doc,
        {
          connect: true,
          params: { userId },
          disableBc: true,
        },
      );

      this.setupAwareness();
      this.setupEvents();
      this.setupYjsListeners();
    } catch (e) {
      // If the provider fails, we catch it here so the UI doesn't crash
      console.error("Yjs startup blocked to prevent crash");
    }
  }
  /* ================= YJS ================= */

  private setupYjsListeners() {
    this.doc.on("update", () => {
      this.changeCallbacks.forEach((cb) => cb());
    });
  }

  /* ================= AWARENESS ================= */

  private setupAwareness() {
    this.provider.awareness.setLocalStateField("user", {
      id: this.userId,
      name: `User ${this.userId}`,
      color: this.getUserColor(this.userId),
      cursor: { x: 0, y: 0 },
      isActive: true,
    });
  }

  /* ================= EVENTS ================= */

  private setupEvents() {
    this.provider.on("status", (event: any) => {
      const connected = event.status === "connected";
      this.syncCallbacks.forEach((cb) => cb(connected));
    });

    this.provider.on("sync", (isSynced: boolean) => {
      this.syncCallbacks.forEach((cb) => cb(isSynced));
    });

    this.provider.awareness.on("update", (updates: any) => {
      this.awarenessCallbacks.forEach((cb) => cb(updates));
    });
  }

  /* ================= DATA ================= */

  getText(name = "content"): Y.Text {
    return this.doc.getText(name);
  }

  getArray<T = any>(name = "tasks"): Y.Array<T> {
    return this.doc.getArray(name);
  }

  getMap<T = any>(name = "drawing"): Y.Map<T> {
    return this.doc.getMap(name);
  }

  getDocument(): Y.Doc {
    return this.doc;
  }

  /* ================= DATABASE SYNC ================= */

  registerSaveHandler(handler: SaveHandler) {
    this.saveHandler = handler;
  }

  getUpdate(): Uint8Array {
    return Y.encodeStateAsUpdate(this.doc);
  }
  async syncWithDatabase() {
    // If we are currently applying an update from the database,
    // DO NOT send a save request back.
    if (!this.saveHandler || this.isInitialLoading) return;

    try {
      const update = Y.encodeStateAsUpdate(this.doc);

      // Safety: Don't save if the document is empty
      if (update.length < 10) return;

      await this.saveHandler(update);
      console.log("✅ CRDT saved to DB");
    } catch (err) {
      console.error("❌ CRDT sync failed:", err);
    }
  }

  /** Apply DB update with loop protection */
  applyUpdate(update: Uint8Array) {
    if (!update || update.length < 4) return;
    try {
      this.isInitialLoading = true;
      Y.applyUpdate(this.doc, update, "remote");

      // Release the lock after Yjs has stabilized
      setTimeout(() => {
        this.isInitialLoading = false;
      }, 100);
    } catch (err) {
      this.isInitialLoading = false;
      console.error("Failed to apply Yjs update:", err);
    }
  }

  /* ================= USERS ================= */

  getConnectedUsers(): any[] {
    return Array.from(this.provider.awareness.getStates().values())
      .filter((state: any) => state.user && state.user.id !== this.userId)
      .map((state: any) => state.user);
  }

  updateCursor(x: number, y: number) {
    const state = this.provider.awareness.getLocalState();
    if (!state?.user) return;

    this.provider.awareness.setLocalStateField("user", {
      ...state.user,
      cursor: { x, y },
    });
  }

  /* ================= EVENTS API ================= */

  onSync(cb: (isSynced: boolean) => void) {
    this.syncCallbacks.push(cb);
  }

  onAwarenessUpdate(cb: (updates: any) => void) {
    this.awarenessCallbacks.push(cb);
  }

  onChange(cb: () => void) {
    this.changeCallbacks.push(cb);
    return () => {
      const i = this.changeCallbacks.indexOf(cb);
      if (i !== -1) this.changeCallbacks.splice(i, 1);
    };
  }

  private getUserColor(userId: string) {
    const colors = [
      "#ef4444",
      "#f59e0b",
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#ec4899",
    ];
    return colors[userId.charCodeAt(0) % colors.length];
  }

  destroy() {
    this.provider.destroy();
    this.doc.destroy();
    this.syncCallbacks = [];
    this.awarenessCallbacks = [];
    this.changeCallbacks = [];
    this.saveHandler = null;
  }
}
