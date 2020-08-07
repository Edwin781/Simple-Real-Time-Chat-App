<<<<<<< HEAD
var express = require("express");
var Socket = require("socket.io");

//App Setup
var App = express();

var server = App.listen(8080, function () {
  console.log("Listening on port 8080");
});

//static file
App.use(express.static("Public"));
=======

var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));
>>>>>>> 5447b305dbfc00c7a232a569e862fd2e7901577b

//Socket Setup
//We want socket.io to work on this socket and listen for connection

//var io = Socket(server);
var username;
var ip;
//listen for connection
io.on("connection", function (socket) {
  ip = socket.handshake.address;
  console.log("Socket info", socket.handshake.address);
  console.log("New User Connected", socket.id);

  io.sockets.emit("logger", {
    Username,
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
