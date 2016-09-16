'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


var Profile = (props) => (
  <View>
    <Button
      containerStyle={{padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'white'}}
      style={{fontSize: 20, color: 'skyblue'}}>
      Press me!
    </Button>
  </View>
);

module.exports = Profile;

const styles = StyleSheet.create({
  nav: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e52d27',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18
  },
  navItem: {
    width: 26
  },
});