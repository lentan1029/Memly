import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import {connect} from 'react-redux';

import * as LoginActions from '../../redux/loginReducer.js';
import { getNearby } from '../../helpers';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

class LoginPage extends Component {
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
                          context.props.dispatch(LoginActions.saveUser(res));
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
          <Text onPress={ 
            () => {
              getNearby(37.774929, -122.419416)
              .then((text)=>(console.log(text)))
              .catch((err)=>(console.log('error:', err)));
            }
          }>whattt</Text>
      </View>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    userInfo: state.loginReducer.userInfo
  };
};

export default connect(mapStateToProps)(LoginPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});