'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Modal, TextInput, Image, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import MapView from 'react-native-maps';
import CustomMarker from './customMarker.js';
import MemlyCallout from './memlyCallout.js';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import Camera from 'react-native-camera';


import * as MapActions from '../../redux/mapReducer.js';
import * as CurrentMemlyActions from '../../redux/currentMemlyReducer.js';
import * as MemlysActions from '../../redux/memlysReducer.js';
import * as userReducer from '../../redux/userReducer.js';

import { AWS_SERVER } from '../../config';
import { doUpload, sendMemly, getNearby } from '../../helpers';
let { width, height } = Dimensions.get('window');

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

  sendMemly (memly, mediaUrl) {
    console.log('helpers sendmemly is being called', memly, mediaUrl);
    var memly = {
      ...memly,
      mediaUrl: AWS_SERVER + '/' + mediaUrl
    };
    this.props.dispatch(userReducer.updateUserMemlies(memly.mediaUrl));
    fetch(AWS_SERVER + '/mobile/user/createMemly', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(memly)
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  // Track the user's location when component is done rendering
  componentDidMount () {
    var context = this;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var startPosition = {longitude: position.longitude, latitude: position.latitude};
        context.props.dispatch(MapActions.updateUserLocation(startPosition));
        context.getMemlyInterval = setInterval(function() {
          getNearby(context.props.currentUserLocation.latitude, context.props.currentUserLocation.longitude)
          .then((data)=>{
            context.props.dispatch(MemlysActions.updateMemlys(data));
            console.log('memlys are', context.props.memlys);
            // data.forEach((memly) => {
            //   context.props.dispatch(MemlysActions.addMemly(memly));
            // });
          })
          .catch((err)=>(console.log('error:', err)));
        }, 5000);
      }, (error) => alert('We\'re truly sorry, but your geolocation seems to not be working correctly :(')
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    context.watchID = navigator.geolocation.watchPosition(({coords}) => {
      var lastPosition = {longitude: coords.longitude, latitude: coords.latitude};
      context.props.dispatch(MapActions.updateUserLocation(lastPosition));
      console.log('location is:', context.currentUserLocation);
    });
  }

  // Stop tracking the user's location when the component is removed
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    clearTimeout(this.getMemlyInterval);
  }

  centerOnUser () {
    this.refs.map.animateToCoordinate(this.props.currentUserLocation, 200);
  }

  _handlingPress(memly) {
    this.props.dispatch(CurrentMemlyActions.updateCurrentMemly(memly));
  }

  takePicture(cb) {
    this.camera.capture()
    .then((data) => {
      doUpload(data.path, this.props.facebookUserID, cb);
    })
    .catch(err => console.error(err));
  }

  makeComment(text) {
    this.setState({comment: text});
  }
  makeLocation(text) {
    this.setState({place: text});
  }
  createAndSendMemly(fileData) {
    this.sendMemly({ //user, comment, place, latitude, longitude //user has: userID, username, profilePhotoUrl
      user: this.props.user,
      id: this.props.user._id,
      comment: this.state.comment,
      place: this.state.place,
      latitude: this.props.currentUserLocation.latitude,
      longitude: this.props.currentUserLocation.longitude
    }, JSON.parse(fileData).path);
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
              <MapView.Callout 
                style = {{height: 100, width: 100, borderRadius: 50}} 
                tooltip>
                  <MemlyCallout 
                    _handlingPress = {context._handlingPress.bind(context)} 
                    memly = {memly}/>
              </MapView.Callout>
            </MapView.Marker>

          )}
        </MapView>
        <TouchableOpacity 
            style={ styles.button } 
            onPress={ this.centerOnUser.bind(this) }>
          <Ionicons 
            name="md-locate" 
            size={28} 
            color="#0972e3" />
        </TouchableOpacity>
        <View>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}>
           <View 
            style={{marginTop: 22}}>
            <View 
              style={styles.modalContainer}>
              <View 
                style={styles.modalHeaderContainer}>
                <Text 
                  style= {styles.memlyHeader}>
                  Memlify
                </Text>  
              </View>
              <Camera 
                ref={(cam) => {
                  this.camera = cam;
                }}
                style={styles.cameraView} 
                aspect={Camera.constants.Aspect.fill}>
              </Camera>
              <TextInput 
                placeholder = 'Comment'
                onChangeText={this.makeComment.bind(this)}
                style={styles.input}>
              <TextInput 
                placeholder = 'Location' 
                onChangeText={this.makeLocation.bind(this)} 
                style={styles.input} />
              <View style={styles.buttonHolder}>
                <Button 
                  style={styles.modalButton} 
                  containerStyle = {styles.modalButtonContainer} 
                  onPress={() => {
                    var context = this;
                    this.setModalVisible(!this.state.modalVisible);
                    this.takePicture(this.createAndSendMemly.bind(this));
                  }}> 
                  Take a Photo
                </Button>
                <Button 
                  containerStyle = {styles.modalButtonContainer} 
                  style={styles.modalButton} 
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>Cancel
                </Button>
              </View>
              </View>
            </View>
          </Modal>

        <TouchableOpacity 
          activeOpacity = {0.5} 
          style = {styles.modalButton, {bottom: 20}} 
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <View 
            style={styles.modalButtonText}>
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
  cameraView: {
    height: 400,
    width: width,
    justifyContent: 'center'
  },
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
    left: 20,
    height: 30,
    width: 300,
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 20
  },

  modalButtonContainer: {
    padding: 12,
    height: 50,
    width: width/2 - 25,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor:
    '#0288D1'
  },
  modalButton: {
    fontSize: 20,
    color: 'white'
  },
  buttonHolder: {
    height: 50,
    marginBottom: 10,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  modalContainer: {
    height: height-22,
    width: width,
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    justifyContent: 'space-around'
  },
  modalHeaderContainer: {
    justifyContent: 'center',
    alignItems:'center',
    width: width
  }
});


const mapStateToProps = function(state) {
  return {
    currentUserLocation: state.mapReducer.currentUserLocation,
    memlys: state.memlysReducer.memlys,
    currentMemly: state.currentMemlyReducer.currentMemly,
    facebookUserID: state.loginReducer.facebookUserID,
    user: state.userReducer.user
  };
};
export default connect(mapStateToProps)(MapComponent);

