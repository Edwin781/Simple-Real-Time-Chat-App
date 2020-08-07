var express = require("express");
var app = express();
var path = require("path");
const { getHeapCodeStatistics } = require("v8");
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;

var ip;

//Routing
//app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7);
  }
  console.log(`hello world ip is ${ip}`);
  res.send(`Page Works`);
});

server.listen(port, (data) => {
  console.log("Server listening at port %d", port);
});

getmydata = (ip) => {
  if (ip.substr(0, 7) == "::ffff:") {
    return (ip = ip.substr(7));
  }
  return ip;
};
//Socket Setup
//We want socket.io to work on this socket and listen for connection

//var io = Socket(server);
var username;

// //listen for connection
// io.on("connection", function (socket) {
//   ip = getmydata(socket.handshake.address);
//   //   console.log("this is it", ip);
//   //   console.log("Socket info", socket.handshake.address);
//   console.log("New User Connected", socket.id);

//   socket.on("chat", function (data) {
//     username = data.handle;
//     io.sockets.emit("chat", data);
//   });

//   socket.on("Username", function (data) {
//     /* var username = socket.data;
//          socket.emit('CurrentUser',username) */

//     var username = data.handle;

//     console.log(`Current user detail is ${username} and Ip -> ${ip}`);
//     /* io.sockets.emit("logger", {
//       username,
//       ip,
//     }); */
//   });

//   socket.on("disconnect", function () {
//     socket.broadcast.emit("user-left", username);
//   });

//   socket.on("typing", function (data) {
//     socket.broadcast.emit("typing", data);
//   });
// });
