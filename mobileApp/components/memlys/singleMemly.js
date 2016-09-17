'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, DatePickerIOS, Picker, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';


let { width, height } = Dimensions.get('window');

// {
//       location: {
//         latitude: 37.7836966,
//         longitude: -122.4089664
//       },
//       user: {
//         name: 'Mike Wong',
//         avatarUrl: 'http://www.menshairstyles.net/d/76238-2/Young+Asian+man+hairstyles.PNG'
//       },
//       place: 'Hack Reactor',
//       comment: 'Hey guys!',
//       key: 'Hack Reactor',
//       defaultAnimation: 2,
//       showInfo: false,
//       media: {
//         url: '../../images/test-assets/hackreactor.jpg',
//         timestamp: new Date()
//       }
//     }

var SingleMemly = (props) => {
  alert(JSON.stringify(props));
  return (
  <ScrollView>
    <View style={styles.imageContainer}>
      <Image source={{uri: props.memly.user.avatarUrl}} style={styles.image} />
    </View>
    <View style={styles.userContainer}>
      <Text style = {styles.userNameText}> {props.memly.user.name}</Text>
      <Text style = {styles.commentText}> {props.memly.comment}</Text>
    </View>
    <View style={styles.memlyContainer}>
      <Image source= {{uri: props.memly.media.url}} style = {styles.memlyImage} />
      <View style={styles.memlyButtonContainer}>
        <Button></Button>
        <Button></Button>
      </View>
      <Text style = {styles.memlyPlace}> {props.memly.place} </Text>
    </View>

  </ScrollView>
);
};

module.exports = SingleMemly;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    height: 45,
    width: 150,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor:
    '#0288D1'
  },
  button: {
    fontSize: 20,
    color: 'white'
  },
  buttonLocation: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'lightblue',
    borderWidth: 5,
  },
  imageContainer: {
    alignItems: 'flex-start',
    marginLeft: 20,
    justifyContent: 'flex-start',
    marginTop: 20
  },
  userContainer: {
    marginTop: -90,
    justifyContent: 'center',
    marginLeft: 140,
  },
  userNameText: {
    fontSize: 25
  },
  commentText: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  memlyContainer: {
    top: 50
  },
  memlyImage: {
    height:365,
    width: width,
    maxHeight: 365,
    maxWidth: width,

    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  memlyButtonContainer: {

  },
  memlyPlace: {
    fontSize: 28,
    alignSelf: 'center',
  }


});