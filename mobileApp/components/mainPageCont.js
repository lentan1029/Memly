import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapComponent from './MapComponent/MapComponent.js';
import { Provider, connect } from 'react-redux';
import memlysReducer from '../redux/memlysReducer.js';

class MainPageContainer extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapComponent />
        <Text onPress={() => { alert(JSON.stringify(this.props)); } }>{ this.props.buttonText || 'Click Me' }</Text>
        <Text onPress={() => { 
          alert('clicked');
          this.props.dispatch({type: 'ADD_MEMLY', memly: {'buttonText': 'HELP'}}); }} > Change the text above </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

const mapStateToProps = function(state) {
  return {
    ...state,

    buttonText: state.memlysReducer.buttonText
  };
};

export default connect(mapStateToProps)(MainPageContainer);