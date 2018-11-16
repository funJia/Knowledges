"use strict";

importScripts("./reconnecting-websocket-iife.js", "./NotificationEnhance.js");

// var socket = io(self.name),
//var ws = new WebSocket(self.name);
// 支持websocket 断线重连
var ws = new ReconnectingWebSocket(self.name);
var ports = [];

addEventListener("connect", function(event) {
  console.log("event", event);
  var port = event.ports[0];
  ports.push(port);
  port.start();

  port.addEventListener("message", function(event) {
    for (var i = 0; i < event.data.events.length; ++i) {
      var eventName = event.data.events[i];

      ws.onmessage = function(e) {
        // 浏览器消息通知
        // 一个进程只允许提醒一次
        var noticeData = JSON.parse(e.data);
        noticeData = noticeData.data;
        // 普通消息（总要级别的），异常消息，满员订单状态更改消息时使用浏览器通知
        if (
          noticeData.type == 1 ||
          noticeData.type == 2 ||
          noticeData.type == 3
        ) {
          sendNotice && sendNotice(noticeData);
        }
        for (var i = 0; i < ports.length; i++) {
          ports[i].postMessage({
            type: eventName,
            message: e.data
          });
        }
      };
    }
  });
});

ws.onopen = function() {
  for (var i = 0; i < ports.length; i++) {
    ports[i].postMessage({ type: "_connect" });
  }
  ws.send(
    JSON.stringify({
      path: "/index/ws/index",
      data: "3eqweqwew"
    })
  );
};

ws.onerror = function() {
  for (var i = 0; i < ports.length; i++) {
    ports[i].postMessage({ type: "_disconnect" });
  }
};

ws.onclose = function(evt) {
  for (var i = 0; i < ports.length; i++) {
    ports[i].postMessage({ type: "_disconnect" });
  }
};
