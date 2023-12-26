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

var users = 0;
io.on('connection', function(socket) {
    console.log("User connected");
    users++;

    socket.emit('message', { message : users + " users connected"})

    io.emit('message', { message : users + " users connected" })

    socket.on('disconnect', function(){
        console.log("User disconnected")
    })
})

http.listen(3000, function() { 
    console.log("Server is running at port 3000")
})