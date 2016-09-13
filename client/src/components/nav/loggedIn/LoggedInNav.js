import React from 'react';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

const LoggedInNav = (props) => {
  // const onClickLogOut = () => {
  //   props.LogMeOut();
  //   props.toggleLogIn();
  // }

  return (
    <div className="nav">
      <Link to="/" className="logo">Memly</Link>
      <Link to="/photo">Upload</Link>
      <Link to="/user/profile" onClick={()=>props.retrieveProfileInfo()}>Profile</Link>
      <Link to="/logout" onClick={props.LogMeOut}>Logout</Link>
    </div>
  );
};

export default LoggedInNav;