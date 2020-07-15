import Cookies from 'js-cookie'
import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import NotFound from './screens/NotFound'


class AppRoutes extends Component {

  constructor(props) {
    super(props)
    this.loggedIn = this.loggedIn.bind(this)
  }

  loggedIn() {
    return Cookies.get('isLoggedIn') === "true"
  }

  render () {
    return (
      <Switch>
        <Route exact path="/" render={() => (
          !this.loggedIn() ? (
            <Login />
          ) : (
            <Dashboard />
          )
        )}/>
        <Route component={ NotFound } onEnter={this.requireAuth} />
      </Switch>
    );
  }
}

export default withRouter(AppRoutes);