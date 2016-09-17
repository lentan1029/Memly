'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';

var EditProfile = (props) => (

  <ScrollView>

    <View style={styles.infoContainer}>
      <Text style={styles.info}>Name:       <TextInput style={styles.input} /> </Text>
      <Text style={styles.info}>Email:        <TextInput style={styles.input}/></Text>
      <Text style={styles.info}>Bio:            <TextInput style={styles.input}/></Text>
    </View>
    
    <View style={styles.genderBox}>
      <Text style={styles.info}>Gender:</Text>  
      <Picker style={styles.pickerBox} selectedValue={'male'} onValueChange={(sex) => console.log(sex)}>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
    </View>
    <View style={styles.dateBox}>
      <Text style={styles.info}>Birthday:</Text>
      <DatePicker style={styles.datePickerBox} date={props.birthday} mode="date" placeholder="select date"
          format="MM/DD/YYYY" minDate="05/18/1900" maxDate="05/18/2017" confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => { alert(date); } }
      />
    </View>
    <View style={styles.imageContainer}>
      <Image source={{uri: props.picture}} style={styles.image} />
      <Text>PUT CAMERA HERE</Text>
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


module.exports = EditProfile;

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
    marginTop: 15
  },
  infoContainer: {
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 25
  },
  info: {
    marginTop: 20
  },
  input: {
    height: 20,
    width: 250,
    backgroundColor: 'lightblue'
  },
  pickerBox: {
    width: 100,
    height: 40,
    alignSelf: 'center',
    marginTop: 60,
    justifyContent: 'flex-end'
  },
  genderBox: {
    width: 300,
    height: 60,
    marginLeft: 25,
    marginTop: 30
  },
  dateBox: {
    width: 300,
    height: 60,
    marginLeft: 25,
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  datePickerBox: {
    width: 150,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginTop: -30,
    marginLeft: 30
  }
});