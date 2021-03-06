(function(gio) {
  "use strict";

  var onConnect = function() {
    console.log("connected!");
  };

  var onDisConnect = function() {
    console.log("disconnect!");
  };

  var ws = gio("ws://localhost:8083", onConnect, onDisConnect);
  ws.setWorker("sharedWorker1.js");

  ws.registerEvent("message", function(data) {
    console.log("message", data);
    document.body.append("<div>66666666666</div>");
  });

  ws.onError(function(data) {
    console.log("error", data);
  });

  ws.start();
})(gio);
