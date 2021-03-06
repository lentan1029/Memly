import React, { Component } from 'react';
import {StyleSheet, Text, View, DeviceEventEmitter} from 'react-native';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import { updateFacebookInfo, getNearby, doUpload } from '../../helpers';

import { connect } from 'react-redux';

import { updateFacebookUserID } from '../../redux/loginReducer'; //action creator
import { updateUserFacebook } from '../../redux/userReducer';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

import Camera from 'react-native-camera';


class LoginPageContainer extends Component {
  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log('data.path is', data.path);
        doUpload(data.path, this.props.facebookUserID);
      })
      .catch(err => console.error(err));
  }

  render() {
    const context = this;
    return (
      <View style={styles.container}>
        <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert('login has error: ' + result.error);
              } else if (result.isCancelled) {
                alert('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    //get data from facebook using accesstoken
                    new GraphRequestManager().addRequest(
                      new GraphRequest(
                        '/me',
                        {
                          accessToken: data.accessToken,
                          parameters: {
                            fields: { //list of field that will be needed to populate the user profile in the db
                              string: 'id,email,name,first_name,last_name,picture,gender,birthday'
                            }
                          }
                        },
                        function(err, res) {
                          console.log('Graph err/result is:', err, res);
                          updateFacebookInfo(res) //update server with fb info, returns id
                          .then((found) => { 
                            context.props.dispatch(updateFacebookUserID(found._id));
                            console.log('what are we dispatching to updateuserfacebook', found);
                            context.props.dispatch(updateUserFacebook(found));
                            // updateProfile
                          });
                        }
                      )
                    ).start();
                    Actions.MainPage();
                  }
                );
              }
            }
          }
          onLogoutFinished={() => alert('logout.')}/>
          <View><Text onPress={
            () => {
              // console.log('http://google.com');
              getNearby(37.774929, -122.419416)
              .then((data)=>(console.log('data:', data)))
              .catch((err)=>(console.log('error:', err)));
            }
          }>{this.props.facebookUserID}</Text></View>
          <View>
            <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
              style={styles.preview}
              aspect={Camera.constants.Aspect.fill}>
              <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[TAKE PIC + UPLOAD]</Text>
            </Camera>
          </View>
      </View>
    );
  }
}

const mapStateToProps = function(state) {
  console.log('state:', state);
  return {
    ...state.loginReducer
  };
};

export default connect(mapStateToProps)(LoginPageContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
