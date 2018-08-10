"use strict";

// importScripts(
//   "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"
// );

// var socket = io(self.name),
var ws = new WebSocket("ws://localhost:8088");
var ports = [];

addEventListener("connect", function(event) {
  console.log("event", event);
  var port = event.ports[0];
  ports.push(port);
  port.start();

  port.addEventListener("message", function(event) {
    for (var i = 0; i < event.data.events.length; ++i) {
      var eventName = event.data.events[i];

      // socket.on(event.data.events[i], function(e) {
      //   port.postMessage({ type: eventName, message: e });
      // });

      // ws.onmessage = function(e) {
      //   port.postMessage({ type: eventName, message: e });
      // };

      ws.onmessage = function(e) {
        for (var i = 0; i < ports.length; i++) {
          ports[i].postMessage({
            type: eventName,
            message: e.data
          });
          //ports[i].postMessage({ type: "message", message: event });
        }
      };
    }
  });
});

// socket.on("connect", function() {
//   for (var i = 0; i < ports.length; i++) {
//     ports[i].postMessage({ type: "_connect" });
//   }
// });

// socket.on("disconnect", function() {
//   for (var i = 0; i < ports.length; i++) {
//     ports[i].postMessage({ type: "_disconnect" });
//   }
// });

// ws.onmessage = function(e) {
//   for (var i = 0; i < ports.length; i++) {
//     ports[i].postMessage({ type: "message", message: e.data });
//   }
// };

ws.onopen = function() {
  for (var i = 0; i < ports.length; i++) {
    ports[i].postMessage({ type: "_connect" });
  }
  // ws.send(
  //   JSON.stringify({
  //     path: "/index/ws/index",
  //     data: "3eqweqwew"
  //   })
  // );
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
