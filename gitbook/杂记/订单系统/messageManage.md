######消息管理

1.消息推送

服务端和客户端是否用 websocket[^1] 实现消息推送

2.客户端多个页面消息共享

客户端使用 sharedWorker[^2] + websocket 实现多个页面消息共享

案例展示：
[sharedWorker](https://github.com/funJia/Knowledges/tree/master/sharedworker-demo-01)
[多页面消息共享实例（socket.io 版）](https://github.com/funJia/Knowledges/tree/master/node%2Bsw%2Bsocket.io)

[^1]: https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket
[^2]: https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker
