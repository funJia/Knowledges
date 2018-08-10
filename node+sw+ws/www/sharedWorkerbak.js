"use strict";

importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"
);

var socket = io(self.name),
  ports = [];

addEventListener("connect", function(event) {
  console.log("event", event);
  var port = event.ports[0];
  ports.push(port);
  port.start();

  port.addEventListener("message", function(event) {
    for (var i = 0; i < event.data.events.length; ++i) {
      var eventName = event.data.events[i];

      socket.on(event.data.events[i], function(e) {
        port.postMessage({ type: eventName, message: e });
      });
    }
  });
});

socket.on("connect", function() {
  for (var i = 0; i < ports.length; i++) {
    ports[i].postMessage({ type: "_connect" });
  }
});

socket.on("disconnect", function() {
  for (var i = 0; i < ports.length; i++) {
    ports[i].postMessage({ type: "_disconnect" });
  }
});
