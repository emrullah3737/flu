import React, { Component } from 'react';
import Auth from '../utils/auth';
import loginController from '../controller/login';
import { Button, Grid, Form, Card, Loader, Dimmer } from 'semantic-ui-react'
import {
  Redirect,
  Link
} from "react-router-dom";
import ModalComponent from '../components/modal';

export default class Login extends Component {

  constructor(probs) {
    super(probs);
    this.state = {
      onLoginProcess: false,
      isLogin: Auth.isLogin,
      error: {
        modal: false,
        code: '',
        message: '',
      }
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
    if (code && message) return this.setState({ error: { modal: true, code, message }});

    Auth.login(user);
    this.setState({ isLogin: true });
  }

  errorModal = () => {
    return (<ModalComponent
      header={this.state.error.code ||  ''}
      content={this.state.error.message ||  ''}
      button="OK"
      modalOpen={this.state.error.modal}
      onClose={() => {
        this.setState({ error: { modal: false } });
        return this.state.error.modal;
      }}
    />);
  }

  loginForm = () => {
    return (<Form onSubmit={() => this.login()}>
      <Form.Field>
        <label>Email</label>
        <input onChange={this.emailOnChange} placeholder='Email' />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input type='password' onChange={this.passwordOnChange} placeholder='Passord' />
      </Form.Field>
      <Button primary>Login</Button>
    </Form>);
  }

  loader = () => {
    return (this.state.onLoginProcess) ? <Dimmer active><Loader /></Dimmer> : '';
  }
  render() {
    if (this.state.isLogin) return <Redirect to='/admin' />;
    return (
      <div style={{ 'paddingTop': 100 }}>
        {this.loader()}
        {this.errorModal()}
        <Grid columns={3} centered padded>
          <Grid.Row>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Card.Header>Login</Card.Header>
                  <Card.Description>Login to access panel.</Card.Description>
                  {this.loginForm()}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
};
