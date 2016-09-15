'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

var MyStatusBar = ({backgroundColor}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar backgroundColor={backgroundColor} />
  </View>
);

const styles = StyleSheet.create({
  statusBar: {
    height: 20,
  },
});

module.exports = MyStatusBar;