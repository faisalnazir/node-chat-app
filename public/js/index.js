var socket = io(); // connect to the socker
socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from Server');
});

socket.on('newMessage',function (message) {
  console.log('New message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: "User",
    text: jQuery('[name=message]').val()
  }, function (){

  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if (!navigator.geolocation) {
    return alert('you don\'t have geolocation');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    return alert('cannot get location');
  });


});

// From MDN
// function geoFindMe() {
//   var output = document.getElementById("out");
//
//   if (!navigator.geolocation){
//     output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
//     return;
//   }
//
//   function success(position) {
//     var latitude  = position.coords.latitude;
//     var longitude = position.coords.longitude;
//
//     output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
//
//     var img = new Image();
//     img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
//
//     output.appendChild(img);
//   }
//
//   function error() {
//     output.innerHTML = "Unable to retrieve your location";
//   }
//
//   output.innerHTML = "<p>Locating…</p>";
//
//   navigator.geolocation.getCurrentPosition(success, error);
// }
