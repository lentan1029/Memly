const initialState = {
  scene: {},
};
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

export default routes = function(state = initialState, action = {}) {
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