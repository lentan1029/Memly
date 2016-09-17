import React from 'react';
import axios from 'axios';
import ImageRetrieve from './ImageRetrieve';

export default class ImageRetrieveContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 0.0,
        lng: 0.0
      },
      images: []
    };
    this.geolocate();
  }

  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      }, function() {
        alert('Geolocation failed');
      });
    } else {
      alert('Your browser doesn\'t support geolocation');
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    this.geolocate();

    axios.get('/api/nearby', {
      params: {
        latitude: this.state.location.lat,
        longitude: this.state.location.lng
      }
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return ( <ImageRetrieve handleSubmit = { this.handleSubmit.bind(this) } />	);
  }
}
