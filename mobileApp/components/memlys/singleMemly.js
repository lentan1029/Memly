'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, DatePickerIOS, Picker, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';


let { width, height } = Dimensions.get('window');

var SingleMemly = (props) => (
  <ScrollView>
  <View style={styles.userInfo}>
    <View style={styles.imageContainer}>
      <Image source={{uri: props.memly.user.avatarUrl}} style={styles.image} />
    </View>
    <View style={styles.userContainer}>
      <Text style = {styles.userNameText}> {props.memly.user.name}</Text>
      <Text style = {styles.commentText}> {props.memly.comment}</Text>
    </View>
  </View>
    <View style={styles.memlyContainer}>
      <Image source= {{uri: props.memly.media.url}} style = {styles.memlyImage} />
      <Text style={styles.memlyPlace}>{props.memly.place}</Text>
      <View style={styles.memlyButtonContainer}>
        <Button containerStyle = {styles.buttonContainer} style = {styles.button}>✓</Button>
        <Button containerStyle = {styles.buttonContainer} style = {styles.button}>x</Button>
      </View>
    </View>

  </ScrollView>
);

module.exports = SingleMemly;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    height: 50,
    width: 100,
    overflow: 'hidden',
    borderRadius: 50,
    backgroundColor:
    '#0288D1'
  },
  userInfo: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-around'
  },
  button: {
    fontSize: 50,
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
    alignItems: 'center',
    marginLeft: 20,
    justifyContent: 'center',
  },
  userContainer: {
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

  memlyImage: {
    height:height,
    width: width,
    maxHeight: height,
    maxWidth: width,

    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  memlyButtonContainer: {
    height: 70,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  memlyPlace: {
    fontSize: 28,
    alignSelf: 'center',
  }


});