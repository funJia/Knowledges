const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8088 });

// 监听连接
wss.on("connection", function connection(ws) {
  console.log(666);
  // 监听客户端发过来的消息
  ws.on("message", function incoming(message) {
    debugger;
    console.log("received: %s", message);
  });

  // const inter = setInterval(() => {
  //   // 发送消息到客户端
  //   if (ws.OPEN) ws.send("something");
  //   else clearInterval(inter);
  // }, 1000);

  let num = 0;
  let msg = "waiting",
    file = "";
  const interval = setInterval(function ping() {
    console.log(wss.clients.size);
    num += 50;
    wss.clients.forEach(function each(ws) {
      try {
        let _num = num;
        if (num >= 100) {
          _num = 100;
          file = "http://m.excelcn.com/1/16737.ett";
          msg = "complete";
        }
        ws.send(
          JSON.stringify({
            code: "0000",
            msg: "",
            data: {
              type: 100,
              code: _num,
              file,
              msg
            }
          })
        );
      } catch (error) {
        debugger;
      }
    });
  }, 3000);
});
