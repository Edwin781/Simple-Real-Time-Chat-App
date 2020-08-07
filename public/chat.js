//Make Connection
var Socket = io.connect();

//Query DOM
var message = document.getElementById("message");
(handle = document.getElementById("handle")),
  (btn = document.getElementById("send")),
  (output = document.getElementById("output")),
  (feedback = document.getElementById("feedback")),
  (UserLeft = document.getElementById("UserLeft")),
  (Login = document.getElementById("loginBtn")),
  (ChatPage = document.getElementById("mario-chat")),
  (LoginPage = document.getElementById("login"));

ChatPage.style.display = "none";
var currentuser;
//Emit Event
Login.addEventListener("click", function () {
  Socket.emit("Username", {
    handle: handle.value,
  });

  LoginPage.style.display = "none";
  ChatPage.style.display = "block";
});

btn.addEventListener("click", function () {
  Socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });

  message.value = "";
});

//User left event
Socket.emit("user-left", handle.value);

//User typing Event Listener
message.addEventListener("keypress", function () {
  Socket.emit("typing", handle.value);
});

//Listen for Events Sent back from server

Socket.on("chat", function (data) {
  feedback.innerHTML = " ";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong> " + data.message + "</p>";
});

//get user log test
Socket.on("logger", (data) => {
  console.log(`Current logged in user detail ${data}`);
});

Socket.on("Username", function (data) {
  currentuser = data;
});
i;

Socket.on("typing", function (data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message..</em></p>";
});

Socket.on("user-left", function (data) {
  UserLeft.innerHTML = "<p><em>" + data + " disconnected </em></p>";
});
