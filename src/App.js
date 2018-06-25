import React, { Component } from 'react';
import Auth from './utils/auth';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Login from './pages/login';
import Panel from './pages/panel/index';
import Post from './pages/panel/post';

export default class componentName extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" />
            <Route  path="/admin" component={Panel} />
            <Route path="/login" component={Login} />
          </div>
        </Router>
      </div>
    )
  }
};

