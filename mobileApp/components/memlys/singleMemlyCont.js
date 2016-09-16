import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/Ionicons';


import MapComponent from '../mapComponent/mapComponent.js';
import MyStatusBar from '../common/myStatusBar.js';
import TopNavigationBar from '../common/topNavBar.js';
import DrawerMenu from '../common/drawerMenu.js';
import SingleMemly from './SingleMemly.js';

class SingleMemlyContainer extends Component {
  constructor (props) {
    super(props);
    this.state = { isOpen: false }; 
  }

  showSideMenu () {
    this.setState({ isOpen: true });
  }

  hideSideMenu () {
    this.setState({ isOpen: false });
  }

  render() {
    const menu = <DrawerMenu hideSideMenu={this.hideSideMenu.bind(this)} />;
    return (
      <SideMenu menu={menu} menuPosition={'right'} isOpen={ this.state.isOpen } >
          <MyStatusBar backgroundColor="#0288D1"/>
          <View style ={ styles.container2}>
            <TopNavigationBar showSideMenu={this.showSideMenu.bind(this)} />
            <View style={ styles.container1 }>
              <SingleMemly memly={this.props.currentMemly}/>
            </View>
          </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    flex: 1
  },
  container1: {
    flex: 15,
    backgroundColor: '#F5FCFF',
  }
});

const mapStateToProps = function(state) {
  return {
    ...state,
    currentMemly: state.currentMemlyReducer.currentMemly
  };
};

export default connect(mapStateToProps)(SingleMemlyContainer);
