import React from 'react';
import { render } from 'react-dom';
import routes from './routes';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userReducer from './redux/userReducer';
import memlysReducer from './redux/memlysReducer';
import mapReducer from './redux/mapReducer';
import imageUploadReducer from './redux/imageUploadReducer';

// Combine reducers to be included in 'createStore'
const reducers = combineReducers({
  userReducer,
  memlysReducer,
  mapReducer,
  imageUploadReducer,
});

// Create store that houses state-tree of app
// Can be modified by dispatching actions on above reducers
// (see 'redux/' for actions)
const store = createStore(reducers);

render(
  // Provider will make the Redux-Store (state tree) accessible to ALL components. 
  //(React specific helper module for simplifying redux!)
  <Provider store={store}>
    {routes}
  </Provider>
  , document.getElementById('app')
);