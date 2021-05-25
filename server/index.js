const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');
const formatMessage = require('./utils');
const { getCurrentUser, getAllUsersInRoom, joinRoom, leaveRoom } = require('./users'); 

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ name, room}) => {
    const user = joinRoom(socket.id, name, room);
    socket.join(user.room);
    socket.emit('message', formatMessage('Admin', 'Welcome to the chat'));
    socket.broadcast.to(user.room).emit('message', formatMessage('Admin', `${user.name} has joined the chat`));
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getAllUsersInRoom(user.room),
    });
  });

  socket.on('chatMessage', (text) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.name, text));
  });

  socket.on('disconnecting', () => {
    const user = leaveRoom(socket.id);
    if (user) {
      socket.to(user.room).emit('message', formatMessage('Admin', `${user.name} has left the chat`));
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getAllUsersInRoom(user.room),
      });
    }
  });
});

app.use(cors());

server.listen(port, () => console.log(`Server started on port ${port}`));
