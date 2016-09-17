'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, DatePickerIOS, Picker, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';


let { width, height } = Dimensions.get('window');

var SingleMemly = (props) => (
  <ScrollView>
    <View style={styles.memlyContainer}>
      <View style={styles.imgContainer}>
        <Image source= {{uri: props.memly.media.url}} style = {styles.memlyImage} />
      </View>
      <Text style={styles.memlyPlace}>{props.memly.place}</Text>
      <View style={styles.commentBox}>
        <Text style = {styles.commentText}> {props.memly.comment}</Text>
      </View>
      <View style={styles.memlyButtonContainer}>
        <Button containerStyle = {styles.buttonContainer} style = {styles.button}>👍</Button>
        <Button containerStyle = {styles.buttonContainer} style = {styles.button}>👎</Button>
      </View>
    </View>
  </ScrollView>
);

module.exports = SingleMemly;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    width: 100,
    overflow: 'hidden',
    margin: 20,
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
    fontSize: 25,
    color: 'white',
    margin: 10
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
    fontStyle: 'italic',
  },
  commentBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  memlyImage: {
    height:height-200,
    width: width-50,
    resizeMode: 'cover',
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  imgContainer: {
    borderRadius: 50,
  },
  memlyButtonContainer: {
    height: 70,
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },
  memlyPlace: {
    fontSize: 28,
    alignSelf: 'center',
  },
  memlyContainer: {
    marginTop: 20,
  }


});