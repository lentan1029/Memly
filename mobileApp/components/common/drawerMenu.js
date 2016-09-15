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
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;


var DrawerMenu = () => {

  return (
    <View style={styles.menuContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.menuTitle}>
        Menu
        </Text>
      </View>

      <View style={styles.itemContainer}>
        <TouchableOpacity>
          <Text style={styles.menuText}><Icon style={styles.icon} name="camera-retro" size={30} color="white" />
            <Text>   </Text>Memlys</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.menuText}><Icon style={styles.icon} name="smile-o" size={30} color="white" />
            <Text>    </Text>My Memlys</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.menuText}><Icon style={styles.icon} name="user" size={30} color="white" />
            <Text>    </Text>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fbContainer}>
        <LoginButton publishPermissions={['publish_actions']} onLogoutFinished={() => Actions.LoginPage()}/>
      </View>
    </View>
  );
};


var styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0288D1'
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0288D1'
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#0288D1'
  },
  fbContainer: {
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
    marginLeft: 30,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    height: 50
  },
  icon: {
  }
});


export default DrawerMenu;