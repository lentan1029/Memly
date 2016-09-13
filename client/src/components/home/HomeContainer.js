import React, { PropTypes } from 'react'
import Home from './Home'
import LoggedInNavContainer from '../nav/loggedIn/LoggedInNavContainer'
import LoggedOutNavContainer from '../nav/loggedOut/LoggedOutNavContainer'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import { connect } from 'react-redux'
//import actions to dispatch on store
import * as userActions from '../../redux/userReducer'

class HomeContainer extends React.Component {

  static propTypes = {
    isLoggedIn: PropTypes.bool //will be initially set to false thanks to redux store's default isLoggedIn property
  };

  // componentWillMount() {
  //   console.log(this.props, 'will mount props');
  // } 

  // componentDidMount() {
  //   //console.log('it hit componentDidMount =====>', this.state.user, this.props);
  // }


  // componentDidUpdate() {
  //   //console.log('it hit componentDidUpdate =====>', this.state.user, this.props);
  // }
  componentWillReceieveProps(nextProps){
    console.log(nextProps, nextProps)
  }

  // //updateUserState changes the state of 'user'. it gets called when 'onClick' one of the navbar items in LoggInNavContainer
  // updateUserState(userObject) {
  //   this.setState({
  //     user: userObject
  //   });
  //   //console.log('checking if user state is updated', this.state.user);
  // }


  // toggleLogIn() {
  //   // var changeLogInState = !this.state.isLoggedIn;
  //   // this.setState({
  //   //   isLoggedIn: changeLogInState
  //   // });
  //   this.props.dispatch(userActions.toggeLogIn(!this.props.isLoggedIn))
  // }

  // changeNavToAlreadyLoggedIn() {
  //   this.props.dispatch(userActions.userAuth());
  // }

  render() {
    // var context = this;
    // var childToggleLogIn = this.toggleLogIn.bind(this);
    // var childChangeNavToAlreadyLoggedIn = this.changeNavToAlreadyLoggedIn.bind(this);
    // const childrenWithProps = React.Children.map(this.props.children,
    //   (child) => React.cloneElement(child, {
    //     toggleLogIn: childToggleLogIn,
    //     changeNavToAlreadyLoggedIn: childChangeNavToAlreadyLoggedIn
    //   })
    // );

    return(
      <div>
        {this.props.isLoggedIn ? <LoggedInNavContainer/> : <LoggedOutNavContainer/>}
        <div className="body-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}
// function used by connect(below) to map default state properties as props to our component. 
// notice how althouth the state tree contains all the different states of our entire app,
// we are only interested in extracting the state that this component will use/need
function mapStateToProps(state){
  console.log(state, 'mapStateToProps state')
  return {
    isLoggedIn: state.userReducer.isLoggedIn //<=== shouldnt have to do this...? 
  }
}

// 'connect' from react-redux allows us to set the default state we assign to the statetree onto our components as props!
// i.e. you won't see this.state anymore... since we are now completely separating state logic from container logic. 
export default connect(mapStateToProps)(HomeContainer)
