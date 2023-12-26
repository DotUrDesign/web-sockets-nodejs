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

/*
Namespace is a path or an endpoint which provides a way to segment the communication channels between server and clients.
Use case ->
1) segmentation of functionality -> Each segment fulfils a wholesome different purpose.
2) Authentication or Authorization -> Suppose, there is an authenticated namespace which actually needs the users to login first.
3) Load balancing -> distributes the load among different namespaces
4) Isolation of communication -> Each namespace has its own communication channel. Clients connected to one namespace won't receive messages sent on another namespace.
*/

// Custom-namespace
const cspn = io.of('/custom-namespace');
cspn.on('connection', function(socket){
    console.log("User connected")

    cspn.emit('message' , { message : "Hey boi!!"})

    socket.on('disconnect', function() {
        console.log("User disconnected")
    })
})

http.listen(3000, function() { 
    console.log("Server is running at port 3000")
})