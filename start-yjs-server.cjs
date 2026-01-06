const http = require("http");
const { WebSocketServer } = require("ws");

// الوصول المباشر لملف السيرفر الداخلي
const yws = require("y-websocket/dist/server.cjs");

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (conn, req) => {
  yws.setupWSConnection(conn, req);
});

server.listen(4000, () => {
  console.log("🔥 Yjs WebSocket Server running on ws://localhost:4000");
});
