import React, { Component, PropTypes } from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class MemlyCallout extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.memly.name}</Text>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: 140,
    height: 140,
    backgroundColor: 'red'
  }
});