const express = require("express");
const app = express();
const http = require('http').Server(app);   // This line creates an HTTP server instance and associates it with your Express app. It essentially wraps your Express app into an HTTP server. This is necessary because Socket.IO needs a server to attach itself to for handling WebSocket connections.

var path = require('path');

var io = require('socket.io')(http);    // This line initializes a new instance of Socket.IO and binds it to the previously created HTTP server (http). By doing this, Socket.IO can use the same server that Express uses to serve HTTP requests, enabling it to handle WebSocket connections over the same port.

app.get('/', function(req, res) {
    
    var options = {
        root : path.join(__dirname)
    }
    var fileName = 'index.html'
    res.sendFile(fileName, options);
})

// this actually listens to event named "connection" and executes the callback function.
io.on('connection', function(socket){
    console.log("User connected")

    setTimeout(function(){
        // .send automatically sets the event name as "message", so need to mention the name of the event.
        socket.send("User has been connected, socket has been established")
    }, 3000)

    
    setTimeout(function(){
        // 1. Custom event created on server side and catch on client side.
        socket.emit('server-custom-event', {
            name : "Pratyush",
            batch : "2020-24",
            college : "IIIT BBSR"
        })
    }, 2000)


    // 2. Custom event created on client side and catch on server side.
    socket.on("client-custom-event", function(obj){
        console.log(
            obj.name,
            obj.batch,
            obj.college
        )
    })


    // .on -> event listener for both client and server side.
    /* io.on('connection', ...) is for handling the connection event for any client, and socket.on('disconnect', ...) is for handling disconnect events specific to each client's connection. */
    socket.on('disconnect', function(){
        console.log("User disconnected")
    })

})



http.listen(3000, function() {
    console.log("Server is listening at port 3000")
})
