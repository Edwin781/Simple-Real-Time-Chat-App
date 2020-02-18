
var express = require('express');
var Socket = require('socket.io');

//App Setup
var App = express();


var server = App.listen(3000,function(){

    console.log('Listening on port 3000');
})

//static file
App.use(express.static('Public'));

//Socket Setup
//We want socket.io to work on this socket and listen for connection

var io = Socket(server);
var username;

//listen for connection
io.on('connection', function(socket){
    console.log('New User Connected', socket.id);

    socket.on('chat',function(data){
        username = data.handle;
        io.sockets.emit('chat',data);
    });

    socket.on('Username', function(data){
        
        /* var username = socket.data;
        socket.emit('CurrentUser',username) */
    });

    socket.on('disconnect', function(){
        
       socket.broadcast.emit('user-left', username);
        
    });
   
    socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
    });
});



