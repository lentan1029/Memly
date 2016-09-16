'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';


import MapView from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import * as MapActions from '../../redux/mapReducer.js';

import MemlyCallout from './MemlyCallout.js';

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.watchID = null;
  }

  // Track the user's location when component is done rendering
  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var startPosition = {longitude: position.longitude, latitude: position.latitude};
        this.props.dispatch(MapActions.updateUserLocation(startPosition));
      }, (error) => alert('We\'re truly sorry, but your geolocation seems to not be working correctly :(')
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition(({coords}) => {
      var lastPosition = {longitude: coords.longitude, latitude: coords.latitude};
      this.props.dispatch(MapActions.updateUserLocation(lastPosition));
    });
  }

  // Stop tracking the user's location when the component is removed
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  centerOnUser () {
    alert(JSON.stringify(this.props));
    // this.refs.map.animateToCoordinate(this.props.currentUserLocation, 200);
  }


  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          style={ styles.map }
          showsUserLocation={ true }
          followsUserLocation={ true }
          loadingEnabled={ true }
          showsPointsOfInterest={ false }
        >
          {this.props.memlys.map((memly, i)=>
            <MapView.Marker
              key={i}
              coordinate={memly.location}
              calloutOffset= {{ x: 10, y: -150 }}
            >
              <MapView.Callout tooltip>
                <MemlyCallout memly = {memly}/>
              </MapView.Callout>
            </MapView.Marker>

          )}
        </MapView>
        <TouchableOpacity style={ styles.button } onPress={ this.centerOnUser.bind(this) }>
          <Ionicons name="md-locate" size={28} color="#0972e3" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    paddingTop: 6,
    paddingBottom: 3,
    paddingRight: 8,
    paddingLeft: 8,
    backgroundColor: '#fff',
    shadowOffset: {
      height: 1,
      width: 0
    },
    borderRadius: 30
  },

});


const mapStateToProps = function(state) {
  return {
    currentUserLocation: state.mapReducer.currentUserLocation,
    memlys: state.memlysReducer.memlys,
  };
};
export default connect(mapStateToProps)(MapComponent);

