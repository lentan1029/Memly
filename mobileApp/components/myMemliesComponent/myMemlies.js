'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';

var myMemlies = (props) => (
  <ScrollView containerStyle={styles.imageContainer}>
    <Text style={styles.info}>My Memlies</Text>
    {
      props.memlies.map((memly, index) => (
      <Image key={index} source={{uri: memly}} style={styles.image} />
      ))
    }
  </ScrollView>
);

module.exports = myMemlies;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
    borderColor: 'lightblue',
    borderWidth: 5,
    marginTop: 15,
    resizeMode: 'contain'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 75
  },
  info: {
    marginTop: 20,
    marginLeft: 50
  }
});