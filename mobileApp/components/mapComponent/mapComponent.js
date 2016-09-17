'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Modal, TextInput} from 'react-native';
import {connect} from 'react-redux';

import MapView from 'react-native-maps';
import CustomMarker from './customMarker.js';
import MemlyCallout from './memlyCallout.js';
import Ionicons from 'react-native-vector-icons/Ionicons.js';

import * as MapActions from '../../redux/mapReducer.js';
import * as CurrentMemlyActions from '../../redux/currentMemlyReducer.js';
import * as MemlysActions from '../../redux/memlysReducer.js';

import axios from 'axios';




class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.watchID = null;
    this.state = {
      w: 100,
      h: 100,
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  // Track the user's location when component is done rendering
  componentDidMount () {

    setInterval(() => {
      console.log('Polling for nearby markers...');
      axios.get('/api/nearby', {
        params: {
          latitude: this.props.currentUserLocation.latitude,
          longitude: this.props.currentUserLocation.longitude
        }
      })
      .then((response) => {
        // 'response.data' is an array of memlys to be displayed
        console.log(response.data, 'data from updateMemly\'s function');

        // let { memlys, memlyIdStorage } = this.state;

        // If our memlys storage does not yet contain the new memly,
        // add the new memly to our storage
        response.data.forEach((memly) => {
          if (!this.props.memlyIdStorage[memly._id]) {
            console.log('!memlyIdStorage');
              // memlyIdStorage[memly._id] = true;
            this.props.dispatch(memlysActions.addMemly(memly));
            // memlys.push(memly);
          }
        });

        // this.setState({ memlys, memlyIdStorage });
        // console.log(this.state.memlys);
      })
      .catch((error) => {
        console.log(error);
      });
    }, 5000);


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

  updateMemlys() {

    console.log('updating memlys');
    
  }

  centerOnUser () {
    alert(JSON.stringify(this.props));
    this.refs.map.animateToCoordinate(this.props.currentUserLocation, 200);
  }

  _handlingPress(memly) {
    this.props.dispatch(CurrentMemlyActions.updateCurrentMemly(memly));
  }

  render() {
    var context = this;
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
              calloutOffset= {{ x: -10, y: 0 }}
            >
              <MapView.Callout style = {{height: 100, width: 100, borderRadius: 50}} tooltip>
                  <MemlyCallout _handlingPress = {context._handlingPress.bind(context)} memly = {memly}/>
              </MapView.Callout>
            </MapView.Marker>

          )}
        </MapView>
        <TouchableOpacity style={ styles.button } onPress={ this.centerOnUser.bind(this) }>
          <Ionicons name="md-locate" size={28} color="#0972e3" />
        </TouchableOpacity>
        <View style={{marginTop: 22}}>
        

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed."); } }
          >
         <View style={{marginTop: 22}}>
          <View style={styles.container, {flexDirection: 'column', alignItems: 'center'}}>
            <Text style={styles.memlyHeader}>Memlify</Text>  
              <TextInput style={styles.input}  placeholder = 'Title'/> 
              <TextInput style={styles.input} multiline={true} placeholder = 'Comment'/> 
              <TextInput placeholder = 'Location' style={styles.input} /> 

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>

        <TouchableOpacity activeOpacity = {0.5} style = {styles.modalButton, {bottom: 20}} onPress={() => {
          this.setModalVisible(true);
        }}>
          <View style={styles.modalButtonText}>
            <Text >
              Memlify
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
  modalButton: {

    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 1,
      width: 0
    },
    backgroundColor: '#fff',
    borderRadius: 30
  },
  modalButtonText: {
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 1,
      width: 0
    },
    backgroundColor: '#fff',
    borderRadius: 30
  },
  memlyHeader: {
    fontSize: 25,
    height: 50
  },
  memlyTitle: {
    height: 40,
    width: 360,
    fontSize: 20
  },
  memlyComment: {
    height: 50,
    width: 360,
    fontSize: 20
  },
  memlyLocation: {
    height: 40,
    width: 360,
    fontSize: 20
  },
  input: {
    marginBottom: 5,
    left: 100,
    height: 30,
    width: 200,
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 20
  }
});


const mapStateToProps = function(state) {
  return {
    currentUserLocation: state.mapReducer.currentUserLocation,
    memlys: state.memlysReducer.memlys,
    currentMemly: state.currentMemlyReducer.currentMemly
  };
};
export default connect(mapStateToProps)(MapComponent);

