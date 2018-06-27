import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react'
import Auth from '../../utils/auth';
import {
  Route,
  Link,
  Redirect
} from "react-router-dom";
import * as firebase from 'firebase';

import Home from './home';
import Post from './post';
import Profile from './profile';

export default class Panel extends Component {

  constructor(probs) {
    super(probs);
    const {  location: { pathname } } = probs;
    const path = pathname.split('/')[2];
    this.state = {
      isLogin: Auth.isLogin,
      activeItem: path ? path : 'home',
    }
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  logout() {
    Auth.logout(async () => {
      this.setState({ isLogin: false });
      try {
        await firebase.auth().signOut();
      } catch (error) {
        console.log({ error });
      }
    });
  }

  render() {
    const { activeItem } = this.state

    if (!this.state.isLogin) return <Redirect to='/login' />;
    return (
        <div>
          <Segment inverted>
            <Menu inverted pointing secondary>
              <Menu.Item
                as={Link}
                to={`${this.props.match.url}`}
                name='home'
                active={activeItem === 'home'}
                onClick={(...args) => { this.handleItemClick(...args) }}
              />
              <Menu.Item
                as={Link}
                to={`${this.props.match.url}/post`}
                name='post'
                active={activeItem === 'post'}
                onClick={(...args) => { this.handleItemClick(...args) }}
              />
              <Menu.Menu position='right'>
                <Menu.Item
                  as={Link}
                  name='profile'
                  to={`${this.props.match.url}/profile`}
                  active={activeItem === 'profile'}
                  onClick={(...args) => { this.handleItemClick(...args) }}
                />
                <Menu.Item
                  name='logout'
                  active={activeItem === 'logout'}
                  onClick={(...args) => {
                    this.handleItemClick(...args);
                    this.logout();
                  }}
                />
              </Menu.Menu>
            </Menu>
          </Segment>
        <Route exact path={`${this.props.match.url}`} component={Home} />
        <Route path={`${this.props.match.url}/post`} component={Post} />
        <Route path={`${this.props.match.url}/profile`} component={Profile} />
        </div>
    )
  }
};
