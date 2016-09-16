'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';

var Profile = (props) => (
  <View>
    <Image source={props.picture} style={styles.image} />

    <Button onPress={() => Actions.EditProfilePage()}
      containerStyle={styles.buttonContainer}
      style={styles.button}>
      Edit Profile
    </Button>
  </View>
);

module.exports = Profile;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    height: 45,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor:
    '#0288D1'
  },
  button: {
    fontSize: 20,
    color: 'white'
  },
  image: {
    width: 50,
    height: 50
  }
});