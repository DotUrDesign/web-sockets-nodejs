const express = require('express');
const app = express();
const http = require('http').Server(app);

var path = require('path');
var io = require('socket.io')(http);

app.get('/', function(req, res){
    var options = {
        root : path.join(__dirname)
    }
    var fileName = 'index.html'
    res.sendFile(fileName, options)
})

// Rooms
var roomNo = 1;
var full = 0;
io.on('connection', function(socket){
    console.log("User connected")

    full++;
    if(full > 2)
    {
        roomNo++;
        full = 1;
    }

    socket.join(`room no.- ${roomNo}`);

    io.sockets.in(`room no.- ${roomNo}`).emit('connectedRoom', {message : "Connected to room no.- " +  roomNo});

    socket.on('disconnect', function(){
        console.log("User disconnected")

        full--;
        if(full == 0)
        {
            full = 2;
            roomNo--;
        }

    })
})

http.listen(3000, function(){
    console.log("Server is running at port 3000")
})