import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} isPrivate />
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route path="/settings" exact component={Settings} isPrivate />
    <Route
      path="/:username/s/:post_id"
      component={() => <h1>post</h1>}
      isPrivate
    />
    <Route path="/:username" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
