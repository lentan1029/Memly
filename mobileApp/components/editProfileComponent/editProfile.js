'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, DatePickerIOS, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';

var Profile = (props) => (

  <ScrollView>

    <View style={styles.infoContainer}>
      <Text style={styles.info}>Name:       <TextInput style={styles.input} /> </Text>
      <Text style={styles.info}>Email:        <TextInput style={styles.input}/></Text>
      <Text style={styles.info}>Birthday:  </Text> 
      <Text style={styles.info}>Gender:<Picker style={styles.picker} selectedValue={'male'} onValueChange={(sex) => console.log(sex)}>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker></Text>
       
    </View>

    <View style={styles.imageContainer}>
      <Image source={{uri: props.picture}} style={styles.image} />
    </View>

    <View style={styles.buttonLocation}>
      <Button onPress={() => {
        props.hideSideMenu();
        Actions.EditProfilePage();
      }}
        containerStyle={styles.buttonContainer}
        style={styles.button}>
        Save Profile
      </Button>
    </View>

  </ScrollView>
);

module.exports = Profile;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    height: 45,
    width: 150,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor:
    '#0288D1'
  },
  button: {
    fontSize: 20,
    color: 'white'
  },
  buttonLocation: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'lightblue',
    borderWidth: 5,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 75
  },
  infoContainer: {
    justifyContent: 'center',
    marginTop: 45,
    marginLeft: 25
  },
  info: {
    marginTop: 20
  },
  input: {
    marginTop: 5,
    width: 250,
    height: 30,
    backgroundColor: 'lightblue'
  },
  picker: {
    width: 100,
    height: 20
  }
});