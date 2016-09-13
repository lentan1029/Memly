
import React, { PropTypes } from 'react'
import LoggedOutNav from './LoggedOutNav'
import axios from 'axios';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import { connect } from 'react-redux'
import * as userActions from '../../../redux/userReducer'

class LoggedOutNavContainer extends React.Component {

  // constructor(props){
  //   super(props);
  //   this.state = {

  //   }
  // }

  static propTypes = {
    isLoggedIn: PropTypes.bool,
    user: PropTypes.object,
  }


  logInWithFacebook() {
    console.log('is this function for facebook login getting hit???');
    axios.get('/auth/facebook')
      .then(function(res) {
        console.log(res, 'loginwithfb');
      });
  }

  componentWillUnmount() {
    console.log(this.props, 'yooloooo')
  }


  render() {
    return(
      <div>
        <LoggedOutNav isLoggedIn={this.props.isLoggedIn} logInWithFacebook={this.logInWithFacebook}/>
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

export default connect(mapStateToProps)(LoggedOutNavContainer)