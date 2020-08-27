import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route path="/settings" exact component={Settings} />
    <Route path="/:username/s/:post_id" component={() => <h1>post</h1>} />
    <Route path="/:username" component={Profile} />
  </Switch>
);

export default Routes;
