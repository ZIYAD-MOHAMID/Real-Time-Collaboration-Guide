const yws = require("y-websocket/dist/server.cjs");

console.log("Testing y-websocket module...");
console.log("Available exports:", Object.keys(yws));

if (yws.setupWSConnection) {
  console.log("✅ setupWSConnection function found");
} else {
  console.log("❌ setupWSConnection function NOT found");
}
