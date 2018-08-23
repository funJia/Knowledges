importScripts("tools.js");
onmessage = function(event) {
  var res = handler(event.data);
  postMessage(res);

};