import React, { PropTypes } from 'react'
import LoggedInNav from './LoggedInNav'
import axios from 'axios'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import { connect } from 'react-redux'
import * as userActions from '../../../redux/userReducer'

class LoggedInNavContainer extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    user: PropTypes.object,
  }

  LogMeOut() {
    axios.get('/logout')
      .then((res) => {
        this.props.dispatch(userActions.userUnauth()) //(invoked before axios call response?)
        console.log('I made it to logout button', res);
      });
  }

  // retrieveProfileInfo() {
  //   //console.log('i am hitting the getProfile function');
  //   axios.get('/user/retrieve/profileinfo/')
  //     .then((res) => {
  //       //console.log('I hit the the getProfile function and got a response--------->', res.data);
  //       this.props.dispatch(userActions.fetchUserSuccess(res.data));
  //     });
  // }
  retrieveProfileInfo() {
    //console.log('i am hitting the getProfile function');
    axios.get('/user/retrieve/profileinfo/')
      .then((res) => {
        //console.log('I hit the the getProfile function and got a response--------->', res.data);
        this.props.dispatch(userActions.updateUserFacebook(res.data));
      });
  }

  // RENDER METHOD HERE IS MESSING UP THE STATE DURING RENDER! FIXX!!!
  render() {
    return(
      <div className = 'NavContainer'>
        <LoggedInNav LogMeOut={this.LogMeOut.bind(this)} retrieveProfileInfo={this.retrieveProfileInfo.bind(this)}/>
      </div>
      )
  }

}

function mapStateToProps (state) {
  return {
    isLoggedIn: state.userReducer.isLoggedIn, //<=== shouldnt have to do this...? 
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(LoggedInNavContainer);