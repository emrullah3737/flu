import React, { Component } from 'react';
import Auth from '../utils/auth';
import loginController from '../controller/login';
import { Button, Grid, Form, Card, Loader, Dimmer } from 'semantic-ui-react'
import {
  Redirect,
  Link
} from "react-router-dom";

export default class Login extends Component {

  constructor(probs) {
    super(probs);
    this.state = {
      onLoginProcess: false,
      isLogin: Auth.isLogin,
    };
  }

  emailOnChange = (e) => {
    this.setState({ email: e.target.value });
  }

  passwordOnChange = (e) => {
    this.setState({ password: e.target.value });
  }

  login = async () => {
    this.setState({ onLoginProcess: true });
    const { user, code, message } = await loginController({
      email: this.state.email,
      password: this.state.password,
    });
    this.setState({ onLoginProcess: false });
    if (code && message) return console.log(code, message);
    console.log({ user });
    Auth.login({ email: 'asdasd', password: 'm1h8r513737' });
    this.setState({ isLogin: true });
  }
  render() {
    if (this.state.isLogin) return <Redirect to='/admin' />;
    const loader = (this.state.onLoginProcess) ? <Dimmer active><Loader /></Dimmer> : '';
    return (
      <div style={{ 'paddingTop': 100 }}>
        {loader}
        <Grid columns={3} centered padded>
          <Grid.Row>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Card.Header>Login</Card.Header>
                  <Card.Description>Login to access panel.</Card.Description>
                  <Form onSubmit={() => this.login()}>
                    <Form.Field>
                      <label>Email</label>
                      <input onChange={this.emailOnChange} placeholder='Email' />
                    </Form.Field>
                    <Form.Field>
                      <label>Password</label>
                      <input onChange={this.passwordOnChange} placeholder='Passord' />
                    </Form.Field>
                    <Button primary>Login</Button>
                  </Form>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
};
