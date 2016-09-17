'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';

var Profile = (props) => (

  <View>
    <View style={styles.imageContainer}>
      <Image source={{uri: props.picture}} style={styles.image} />
    </View>

    <View style={styles.infoContainer}>
      <Text style={styles.info}>Name: {props.name}</Text>
      <Text style={styles.info}>Email: {props.email}</Text>
      <Text style={styles.info}>Gender: {props.gender}</Text>
      <Text style={styles.info}>Birthday: {props.birthday}</Text>
      <Text style={styles.info}>About Me: {props.bio}</Text>
    </View>

    <View style={styles.buttonLocation}>
      <Button onPress={() => {
        props.hideSideMenu();
        Actions.EditProfilePage();
      }}
        containerStyle={styles.buttonContainer}
        style={styles.button}>
        Edit Profile
      </Button>
    </View>

  </View>
);

module.exports = Profile;

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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 75
  },
  infoContainer: {
    marginTop: 45,
    marginLeft: 35
  },
  info: {
    marginTop: 20
  }
});