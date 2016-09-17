'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = props.user;
  }

  render() {
    return (

      <ScrollView>

        <View style={styles.infoContainer}>
          <Text style={styles.info}><TextInput style={styles.input} value={this.state.name} placeholder={'Full Name'} onChangeText={(text) => { this.setState({...this.state, name: text }); }}/></Text>
          <Text style={styles.info}><TextInput style={styles.input} value={this.state.email} placeholder={'email'} onChangeText={(text) => { this.setState({...this.state, email: text }); }}/></Text>
          <Text style={styles.info}><TextInput style={styles.input} value={this.state.bio} placeholder={'About Me'} onChangeText={(text) => { this.setState({...this.state, bio: text }); }}/></Text>
        </View>
        
        <View style={styles.genderBox}>
          <Text style={styles.info}>Gender:</Text>  
          <Picker style={styles.pickerBox} selectedValue={this.state.gender} onValueChange={(sex) => { this.setState({...this.state, gender: sex}); } }>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.info}>Birthday:</Text>
          <DatePicker style={styles.datePickerBox} date={this.state.birthday} mode="date" placeholder="select date"
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
              onDateChange={(date) => { this.setState({...this.state, birthday: date }); } }
          />
        </View>
        <View style={styles.imageContainer}>
          <Image source={{uri: this.state.profilePhotoUrl}} style={styles.image} />
          <Text>Allow Change of Image!</Text>
        </View>

        <View style={styles.buttonLocation}>
          <Button onPress={() => {
            this.props.hideSideMenu();
            this.props.submitInfo({
              ...this.props.user,
              birthday: this.state.birthday,
              email: this.state.email,
              gender: this.state.gender,
              bio: this.state.bio,
              name: this.state.name,
              id: this.props.user._id
            });
            Actions.pop();
          }}
            containerStyle={styles.buttonContainer}
            style={styles.button}>
            Save Profile
          </Button>

        </View>

      </ScrollView>
    );
  }
}


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
    alignItems: 'center',
    marginTop: 15
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