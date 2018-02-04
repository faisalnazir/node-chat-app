const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected!');
  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  })
});

app.use(express.static(publicPath));

server.listen(port , () => {
  console.log(`Started on port ${port}`);
});
