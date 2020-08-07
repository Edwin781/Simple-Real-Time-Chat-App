var express = require("express");
var app = express();
var path = require("path");
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;

var ip;

app.get("/", function (req, res) {
  console.log("This", req.ip);
  //res.send("hello world");
});

server.listen(port, (data) => {
  console.log("Server listening at port %d", port);
  console.log("Some data", data);
});

// Routing
app.use(express.static(path.join(__dirname, "public")));

//Socket Setup
//We want socket.io to work on this socket and listen for connection

//var io = Socket(server);
var username;

//listen for connection
io.on("connection", function (socket) {
  ip = socket.handshake.address;
  console.log("Socket info", socket.handshake.address);
  console.log("New User Connected", socket.id);

  io.sockets.emit("logger", {
    username,
    ip,
  });

  socket.on("chat", function (data) {
    username = data.handle;
    io.sockets.emit("chat", data);
  });

  socket.on("Username", function (data) {
    /* var username = socket.data;
        socket.emit('CurrentUser',username) */
  });

  socket.on("disconnect", function () {
    socket.broadcast.emit("user-left", username);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
