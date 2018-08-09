var io, connectedSockets;

io = require("socket.io").listen(8083);
connectedSockets = 0;

io.sockets.on("connection", function(socket) {
  connectedSockets++;
  console.log("Socket connected! Conected sockets:", connectedSockets);

  socket.on("disconnect", function() {
    connectedSockets--;
    console.log("Socket disconnect! Conected sockets:", connectedSockets);
  });
});

// emulate one broadcast message per second
setInterval(function() {
  io.emit("message", "Hola " + new Date().getTime());
}, 1000);
