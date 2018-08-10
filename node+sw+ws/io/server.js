const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8083 });

// 监听连接
wss.on("connection", function connection(ws) {
  // 监听客户端发过来的消息
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  // 发送消息到客户端
  ws.send("something");
});
