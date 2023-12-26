const express = require('express');
const app = express();
const http = require('http').Server(app);

var path = require('path');

var io = require('socket.io')(http);

app.get('/', function(req, res){
    var options = {
        root: path.join(__dirname)
    }
    var fileName = 'index.html';
    res.sendFile(fileName, options);
})

// Broadcasting
var users = 0;
io.on('connection', function(socket) {
    console.log("User connected");

    // this message will only come to me.
    socket.emit('newUserConnected', { message : "Hii there!!"});
    
    users++;
    
    // this message will be broadcasted to all the messages connected except me.
    // socket.broadcast.emit() -> broadcasts the message to every socket except the current socket.
    // io.sockets.emit() -> firstly, the "sockets" word here is an inbuilt function, so don't dare to change it. Secondly, this actually broadcasts the message to every socket connected(including the current socket).
    socket.broadcast.emit('newUserConnected', { message : users + ' users connected' });

    socket.on('disconnect', function(){
        console.log("User disconnected")

        users--;
        socket.broadcast.emit('newUserConnected', { message : users + ' users connected'});
    })
})

http.listen(3000, function() { 
    console.log("Server is running at port 3000")
})