import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyStatusBar from './myStatusBar.js';


var DrawerMenu = () => {

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuTitle}>
      Menu
      </Text>

      <TouchableOpacity onPress={Actions.LoginPage}>
        <Text style={styles.menuText}><Icon style={styles.icon} name="camera-retro" size={30} color="white" />
          Memlys</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.menuText}><Icon style={styles.icon} name="smile-o" size={30} color="white" />
          My Memlys</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.menuText}><Icon style={styles.icon} name="user" size={30} color="white" />
          Profile</Text>
      </TouchableOpacity>
    </View>
  );
};


var styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0288D1'
  },
  menuTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white'
  },
  menuText: {
    textAlign: 'center',
    marginTop: 30,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    height: 50
  },
  icon: {
    position: 'relative',
    marginRight: 25
  }
});


export default DrawerMenu;