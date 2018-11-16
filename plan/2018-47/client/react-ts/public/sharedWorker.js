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
    var id = event.data.id,
      type = event.data.type;

    switch (type) {
      case "register":
        event.target.id = event.data.id;
        break;
      case "message":
        ws.onmessage = function(e) {
          // 生成SharedWork消息唯一识别码
          var notice = JSON.parse(e.data);
          notice.swId = guid();
          var data = JSON.stringify(notice);

          for (var i = 0; i < ports.length; i++) {
            console.log(ports[i]);
            ports[i].postMessage({
              type: type,
              message: data
            });
          }
        };
        break;
      case "syncCloseNotice":
        var noticeId = event.data.content;
        syncCloseNotice(id, noticeId);
        break;
      default:
        break;
    }

    // for (var i = 0; i < event.data.events.length; ++i) {
    //   var eventName = event.data.events[i];
    //   if (eventName)
    //     ws.onmessage = function(e) {
    //       // 生成SharedWork消息唯一识别码
    //       var notice = JSON.parse(e.data);
    //       notice.swId = guid();
    //       var data = JSON.stringify(notice);

    //       for (var i = 0; i < ports.length; i++) {
    //         console.log(ports[i]);
    //         ports[i].postMessage({
    //           type: eventName,
    //           message: data
    //         });
    //       }
    //     };
    // }
  });
});

// 同步被关闭通知
var syncCloseNotice = function(portId, noticeId) {
  var port = null;
  for (var i = 0; i < ports.length; i++) {
    port = ports[i];
    if (portId != port.id) {
      port.postMessage({
        type: "syncCloseNotice",
        message: JSON.stringify({
          ids: noticeId
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
