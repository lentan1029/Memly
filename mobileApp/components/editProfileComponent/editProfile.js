'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Picker, TouchableHighlight, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import Camera from 'react-native-camera';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {user: props.user, modalVisible: false};
  }

  takePicture(cb) {
    this.camera.capture()
      .then((data) => {
        console.log('data.path is', data.path);
        // doUpload(data.path, this.props.facebookUserID, cb);
      })
      .catch(err => console.error(err));
  }

  setModalVisible(visible) {
    this.setState({...this.state, modalVisible: visible});
  }

  render() {
    return (

      <ScrollView>

        <View style={styles.infoContainer}>
          <Text style={styles.info}><TextInput style={styles.input} value={this.state.user.name} placeholder={'Full Name'} onChangeText={(text) => { this.setState({...this.state, user: {...this.state.user, name: text }}); }}/></Text>
          <Text style={styles.info}><TextInput style={styles.input} value={this.state.user.email} placeholder={'email'} onChangeText={(text) => { this.setState({...this.state, user: {...this.state.user, email: text }}); }}/></Text>
          <Text style={styles.info}><TextInput style={styles.input} value={this.state.user.bio} placeholder={'About Me'} onChangeText={(text) => { this.setState({...this.state, user: {...this.state.user, bio: text }}); }}/></Text>
        </View>
        
        <View style={styles.genderBox}>
          <Text style={styles.info}>Gender:</Text>  
          <Picker style={styles.pickerBox} selectedValue={this.state.user.gender} onValueChange={(sex) => { this.setState({...this.state, user: {...this.state.user, gender: sex }}); }}>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.info}>Birthday:</Text>
          <DatePicker style={styles.datePickerBox} date={this.state.user.birthday} mode="date" placeholder="select date"
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
              onDateChange={(date) => { this.setState({...this.state, user: {...this.state.user, birthday: date }}); }}
          />
        </View>
        <TouchableHighlight onPress={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}>
          <View style={styles.imageContainer}>
            <Image source={{uri: this.state.user.profilePhotoUrl}} style={styles.image} />
          </View>
        </TouchableHighlight>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert('Modal has been closed.'); } }
          >
         <View style={{marginTop: 22}}>
          <View style={{height: 600, width: 400, flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
            <Text style={styles.memlyHeader}>Edit Profile Photo</Text>  
            <Camera ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.cameraView} aspect={Camera.constants.Aspect.fill}></Camera>

            <Button containerStyle = {styles.modalButtonContainer} style={styles.modalButton} onPress={() => {
              var context = this;
              this.setModalVisible(!this.state.modalVisible);
              this.takePicture( (fileData) => {
                console.log('sendmemlyisbeingcalled');
                sendMemly({ //user, comment, place, latitude, longitude //user has: userID, username, profilePhotoUrl
                  user: context.props.user,
                  id: context.props.user._id,
                  comment: 'some comment',
                  place: 'a place',
                  latitude: context.props.currentUserLocation.latitude,
                  longitude: context.props.currentUserLocation.longitude
                }, JSON.parse(fileData).path);
              });
            }}> Take a Photo
            </Button>
            <Button containerStyle = {styles.modalButtonContainer} style={styles.modalButton} onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>Cancel
            </Button>
            </View>
          </View>
        </Modal>

        <View style={styles.buttonLocation}>
          <Button onPress={() => {
            this.props.hideSideMenu();
            this.props.submitInfo({
              ...this.props.user,
              birthday: this.state.user.birthday,
              email: this.state.user.email,
              gender: this.state.user.gender,
              bio: this.state.user.bio,
              name: this.state.user.name,
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
  },
  modalButtonContainer: {
    padding: 10,
    height: 45,
    width: 150,
    margin: 10,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor:
    '#0288D1'
  },
  modalButton: {
    fontSize: 20,
    color: 'white'
  },
  cameraView: {
    height: 500,
    width: 500,
    justifyContent: 'center'
  }
});