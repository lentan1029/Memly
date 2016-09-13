// window.intervalLocation = setInterval(function(){
//       navigator.geolocation.getCurrentPosition(function(position){
//       console.log('your position is lat: ' + position.coords.longitude + ', long: ' + position.coords.latitude)
//     });
//     }, 100);

// // Grab elements, create settings, etc.
// var video = document.getElementById('video');

// // Get access to the camera!
// if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//   console.log('true');
//     // Not adding `{ audio: true }` since we only want video now
//     navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
//         video.src = window.URL.createObjectURL(stream);
//         video.play();
//     });
// }
