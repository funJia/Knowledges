"use strict";

importScripts("./reconnecting-websocket-iife.js");

// var socket = io(self.name),
//var ws = new WebSocket(self.name);
// 支持websocket 断线重连
var ws = new ReconnectingWebSocket(self.name);
var ports = [];

function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

addEventListener("connect", function(event) {
  console.log("event", event);
  var port = event.ports[0];
  ports.push(port);
  port.start();

  port.addEventListener("message", function(event) {
    event.target.id = event.data.id;
    for (var i = 0; i < event.data.events.length; ++i) {
      var eventName = event.data.events[i];
      ws.onmessage = function(e) {
        // 生成SharedWork消息唯一识别码
        var notice = JSON.parse(e.data);
        notice.swId = guid();
        var data = JSON.stringify(notice);

        for (var i = 0; i < ports.length; i++) {
          console.log(ports[i]);
          ports[i].postMessage({
            type: eventName,
            message: data
          });
        }
      };
    }
  });
});

// 同步被关闭通知
var syncCloseNotice = function(data) {
  var port = null;
  for (var i = 0; i < ports.length; i++) {
    port = ports[i];
    if (data.id != port.id) {
      ports[i].postMessage({
        type: "eventName",
        message: JSON.stringify({
          ids: data.noticeId
        })
      });
    }
  }
};

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
