import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import NotFound from './screens/NotFound'


class AppRoutes extends Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/dashboard" component={ Dashboard } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default AppRoutes;