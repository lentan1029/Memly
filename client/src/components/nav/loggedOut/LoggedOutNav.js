import React from 'react';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

const LoggedOutNav = (props) => {
  return (
    <div className="nav">
      <Link to="/" className="logo">Memly</Link>
      <a href="/auth/facebook">Login</a>
    </div>
    );
};

export default LoggedOutNav;