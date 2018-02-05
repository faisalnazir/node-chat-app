const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected!');
  // socket.emit from Admin welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat App'));
  // socket.broadcast.emit from : admin text new user joined.
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage',(newMessage) => {
    console.log('CreateMessage', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  })
});



app.use(express.static(publicPath));

server.listen(port , () => {
  console.log(`Started on port ${port}`);
});
