onconnect = function(e) {
  var port = e.ports[0];
  port.postMessage("connected");
  port.onmessage = function(e) {
    var jsonData = JSON.parse(e.data);
    var workerResult = "Result: " + jsonData.name + "," + jsonData.age;
    port.postMessage(workerResult);
  };
};
