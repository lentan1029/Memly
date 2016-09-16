const loginInitialState = {
  userInfo: {
    id: null,
    email: null,
    birthday: null,
    picture: null,
    gender: null
  }
};

//* ---  Action Creators --- *//

export function saveUser(userInfo) {
  return { type: 'SAVE_USER', userInfo };
}

export default function loginReducer(state = loginInitialState, action ) {
  switch (action.type) {

  case 'SAVE_USER' : {
    return {
      ...state,
      userInfo: action.userInfo
    };
  }

  default : return state;
  }
}