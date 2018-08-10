######消息管理

1.消息推送

服务端和客户端是否用 websocket[^1] 实现消息推送

2.客户端多个页面共享消息

客户端使用 sharedWorker[^2] + websocket 实现多个页面消息共享（共享 websocket）

3.调试 sharedWorker

在浏览器上打开该地址 chrome://inspect/#workers 可以调试 sharedWorker

案例展示：
[sharedWorker](https://github.com/funJia/Knowledges/tree/master/sharedworker-demo-01)
[多页面消息共享实例（socket.io 版）](https://github.com/funJia/Knowledges/tree/master/node%2Bsw%2Bsocket.io)
[多页面消息共享实例（ws 版）](https://github.com/funJia/Knowledges/tree/master/node%2Bsw%2Bws)
[多页面消息共享实例（ant+react+redux+typescript+ws 版）](https://github.com/funJia/Knowledges/tree/master/node%2Bsw%2Bws)

websocket 服务端：

```javaScript
const WebSocket = require("ws");
// 监听端口
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
```

websocket 客户端：

```javascript
// 建立连接
var ws = new WebSocket("ws://localhost:80");

// 监听连接
ws.onopen = function() {
  console.log("open");
  // 发送消息给服务端
  ws.send(data + "7777");
};

// 监听消息
ws.onmessage = function(evt) {
  console.log(evt);
};

// 监听关闭事件
ws.onclose = function(evt) {
  console.log("WebSocketClosed!", evt);
};

// 监听错误事件
ws.onerror = function(evt) {
  console.log("WebSocketError!", evt);
};
```

[^1]: https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket
[^2]: https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker
