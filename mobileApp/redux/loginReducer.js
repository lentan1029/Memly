//====== actions to be dispatched to loginReducer ====== //
//action creators
export function updateUser (userInfo) {
  console.log('updating User location with action');
  return {
    type: 'UPDATE_USER',
    userInfo,
  };
}

//====== initial login state ====== //

const loginInitialState = {
  userInfo: {
    id: null,
    email: null,
    birthday: null,
    picture: null,
    gender: null
  }
};

//========= reducer to connect to component ====//

export default function loginReducer(state = loginInitialState, action) {
  switch (action.type) {

  case 'UPDATE_USER' : {

    var res = { ...action.userInfo };
    for (var key in res) {
      if (action.userInfo[key]) {
        res[key] = action.userInfo[key];
      }
    };
    return res;
  }

  default : return state;
  }
}
