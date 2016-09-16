import React, { Component, PropTypes } from 'react';

import {StyleSheet, View, Text, Image, Animate, LayoutAnimation, TouchableHighlight} from 'react-native';

export default class MemlyCallout extends Component {
  constructor(props) {
    super(props);
    this.state= {
      w: 100,
      h: 100
    };
  }

  componentWillMount() {

  }

  _handePress() {
    alert('what');
  }


  render() {
    var _handlingPress = function() {
      alert('what');
    };

    return (

      <TouchableHighlight style = {{height: 80, width: 80, backgroundColor: 'orange'}} underlayColor="transparent" onSelect = {_handlingPress}>
        <View style={styles.container}>
          <Image 
            source={{uri: this.props.memly.user.avatarUrl}}
            style={{borderRadius: 50, alignSelf: 'center', opacity: 1, resizeMode: 'contain', width: this.state.w-3, height: this.state.h-3}} />
        </View>
      </TouchableHighlight>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth:2,
    borderRadius: 100,
    flexDirection: 'column',
    alignSelf: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#50E3C2',

  }
});