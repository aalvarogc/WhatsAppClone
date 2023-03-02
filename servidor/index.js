const express = require('express');
const app = express();
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

var usersRoom1 = [];
var usersRoom2 = [];
var usersRoom3 = [];

var usersConnectedRoom1 = 0;
var usersConnectedRoom2 = 0;
var usersConnectedRoom3 = 0;

var users = [];

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    switch (socket.room) {
      case "1":
        usersConnectedRoom1--;
        var userIndex = users.indexOf(socket.username);
        usersRoom1.splice(userIndex, 1);
        io.to(socket.room).emit('userHasDisconnected', socket.username);
        io.to(socket.room).emit('usersConnected', usersRoom1);
        io.to(socket.room).emit('numUsersConnected', usersConnectedRoom1);
        break;
      case "2":
        usersConnectedRoom2--;
        var userIndex = users.indexOf(socket.username);
        usersRoom2.splice(userIndex, 1);
        io.to(socket.room).emit('userHasDisconnected', socket.username);
        io.to(socket.room).emit('usersConnected', usersRoom2);
        io.to(socket.room).emit('numUsersConnected', usersConnectedRoom2);
        break;
      case "3":
        usersConnectedRoom3--;
        var userIndex = users.indexOf(socket.username);
        usersRoom3.splice(userIndex, 1);
        io.to(socket.room).emit('userHasDisconnected', socket.username);
        io.to(socket.room).emit('usersConnected', usersRoom3);
        io.to(socket.room).emit('numUsersConnected', usersConnectedRoom3);
        break;
    }
  });

  socket.on('setUsername', (userData)=>{
    socket.username = userData.username;

    datoNombre = {nuevoNombre: userData.username, antiguoNombre: socket.username};

    socket.username = userData.username;
    socket.room = userData.room;

    socket.join(userData.room);

    switch(userData.room){
      case "1":
        usersConnectedRoom1++;
        usersRoom1.push({userID: socket.id, username: socket.username, userImg: userData.userImg})
        io.to(socket.room).emit('userHasConnected', socket.username);
        io.to(socket.room).emit('usersConnected', usersRoom1);
        io.to(socket.room).emit('numUsersConnected', usersConnectedRoom1);
        break;
      case "2":
        usersConnectedRoom2++;
        usersRoom2.push({userID: socket.id, username: socket.username, userImg: userData.userImg})
        io.to(socket.room).emit('userHasConnected', socket.username);
        io.to(socket.room).emit('usersConnected', usersRoom2);
        io.to(socket.room).emit('numUsersConnected', usersConnectedRoom2);
        break;
      case "3":
        usersConnectedRoom3++;
        usersRoom3.push({userID: socket.id, username: socket.username, userImg: userData.userImg})
        io.to(socket.room).emit('userHasConnected', socket.username);
        io.to(socket.room).emit('usersConnected', usersRoom3);
        io.to(socket.room).emit('numUsersConnected', usersConnectedRoom3);
        break;
    }
  })

  socket.on('message', (msg)=>{
    datosMsg = {username: socket.username, clientID: socket.clientID, serverID: socket.id, msg: msg.msg, time: msg.time}
    io.to(socket.room).emit('message', datosMsg);
  });

  socket.on("userTyping", (data)=>{
    io.emit('userTyping', {userID: socket.id, isTyping: data.isTyping});
  })
});



server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})