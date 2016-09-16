//====== actions to be dispatched to loginReducer ====== //
//action creators
export function updateFacebookUserID (facebookUserID) {
  console.log('updating facebook userID to:', facebookUserID);
  return {
    type: 'UPDATE_FACEBOOK_USERID',
    facebookUserID,
  };
}

//====== initial login state ====== //

const loginInitialState = {
  facebookUserID: 'meh'
};

//========= reducer to connect to component ====//

export default function loginReducer(state = loginInitialState, action) {
  switch (action.type) {

  case 'UPDATE_FACEBOOK_USERID' : {
    return {
      ...state,
      facebookUserID: action.facebookUserID
    };
  }

  default : return state;
  }
}
