import React from 'react';

export default class Camera extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var video = document.querySelector('#videoElement');
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true}, handleVideo, videoError);
    }

    handleVideo = (stream) => {
      video.src = window.URL.createObjectURL(stream);
    };

    videoError = (err) => {
      console.log(err);
      return;
    };
  }

  render() {
    return (
      <video autoplay="true" id="videoElement">
      </video>
    );
  }
}