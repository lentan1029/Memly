//imports
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import MapComponent from './components/MapComponent/MapComponent.js';
import LoginPage from './components/loginPage.js';
import MainPage from './components/mainPageCont.js';
import ProfilePage from './components/profilePage.js';
import routes from './redux/routesReducer.js';
import memlysReducer from './redux/memlysReducer.js';

const reducers = combineReducers({
  routes,
  memlysReducer
});


const RouterWithRedux = connect()(Router);
const middleware = [/* ...your middleware (i.e. thunk) */];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);


export default class memly extends Component {
  render () {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key='root'>
            <Scene key='LoginPage' component={LoginPage} title='LoginPage' initial={true} />
            <Scene key='MainPage' component={MainPage} title='MainPage' />
            <Scene key='ProfilePage' component={ProfilePage} title='ProfilePage' />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}


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

