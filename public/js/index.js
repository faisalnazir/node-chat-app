var socket = io(); // connect to the socker
socket.on('connect', function () {
  console.log('Connected to server');


  socket.emit('createMessage',{
    from: 'adeela@yaooo.com',
    text: 'This is Faisal-message'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from Server');
});

socket.on('newMessage',function (message) {
  console.log('New message', message);
});
