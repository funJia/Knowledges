const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8088 });

// 监听连接
wss.on("connection", function connection(ws) {
  console.log(666);
  // 监听客户端发过来的消息
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  // const inter = setInterval(() => {
  //   // 发送消息到客户端
  //   if (ws.OPEN) ws.send("something");
  //   else clearInterval(inter);
  // }, 1000);

  const interval = setInterval(function ping() {
    console.log(wss.clients.size);
    wss.clients.forEach(function each(ws) {
      try {
        ws.send("something");
      } catch (error) {}
    });
  }, 3000);
});
