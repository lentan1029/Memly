//imports
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import MapComponent from './MapComponent/MapComponent.js';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

//set up for react-native-router-flux

const initialState = {
  scene: {},
};

var routes = function(state = initialState, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene,
      };

    // ...other actions
    default:
      return state;
  }
};


//test actions/reducers
// const addMemly = function(memly) {
//   return {
//     type: 'ADD_MEMLY',
//     memly,
//   }
// }
// {
//   type: 'ADD_MEMLY', 
//   memly: {
//     'buttonText': 'HELP'
//   }
// }

var memlysReducer = function(state = {buttonText: 'no help'}, action) {
  switch(action.type) {
    
    case 'ADD_MEMLY' : {
      console.log(state);
      console.log(action);
      return {
        // memlyIdStorage : {
        //   ...state.memlyIdStorage,
        //   [action.memly['_id']]: true, // DO SOMETHING WITH THISSSS
        // },
        // memlys: [action.memly, ...state.memlys,]
        'buttonText': action.memly.buttonText
      }
  }

    default : return state;
  }
}

const reducers = combineReducers({
  routes,
  memlysReducer
});


const RouterWithRedux = connect()(Router);
const middleware = [/* ...your middleware (i.e. thunk) */];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);
// const store = compose(createStore)(reducers);

class memly extends Component {
  render () {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key='root'>
            <Scene key='LoginPage' component={LoginPage} title='LoginPage' initial={true} />
            <Scene key='MainPage' component={MainPage} title='MainPage' />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

// class memly extends Component {
//   render() {
//     return (
//       <Router>
//         <Scene key='root'>
//           <Scene key='LoginPage' component={LoginPage} title='LoginPage' initial={true} />
//           <Scene key='MainPage' component={MainPage} title='MainPage' />
//         </Scene>
//       </Router>
//     );
//   }
// }

class LoginPage extends Component {
  render() {
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
                    alert(data.accessToken.toString());
                    Actions.MainPage();
                  }
                );
              }
            }
          }
          onLogoutFinished={() => alert('logout.')}/>
          <Text onPress={Actions.MainPage}> Maps </Text>
      </View>
    );
  }
}

class MainPageContainer extends Component {
  constructor (props) {
    super(props)
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

function mapStateToProps(state) {
  return {
    buttonText: state.memlysReducer.buttonText
  }
}

const MainPage = connect(mapStateToProps)(MainPageContainer);




// const style = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  map: {
    position: 'absolute',
    flex: 1
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('memly', () => memly);
