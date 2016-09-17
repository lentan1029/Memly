import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Modal} from 'react-native';

export class PostMemly extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => { alert("Modal has been closed."); } }
      >
        <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
        </View>
      </Modal>
      );
  }
}
