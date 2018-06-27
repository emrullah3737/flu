import React, { Component } from 'react';
import Auth from '../utils/auth';
import loginController from '../controller/login';
import registerController from '../controller/register';
import { Button, Grid, Form, Card, Loader, Dimmer, Modal, Header } from 'semantic-ui-react'
import {
  Redirect,
  Link
} from "react-router-dom";
import ModalComponent from '../components/modal';

export default class Login extends Component {

  constructor(probs) {
    super(probs);
    this.state = {
      loader: false,
      registerModal: false,
      isLogin: Auth.isLogin,
      loginError: {
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

  reEmailOnChange = (e) => {
    this.setState({ reEmail: e.target.value });
  }

  rePasswordOnChange = (e) => {
    this.setState({ rePassword: e.target.value });
  }

  login = async () => {
    this.setState({ loader: true });
    const { user, code, message } = await loginController({
      email: this.state.email,
      password: this.state.password,
    });
    this.setState({ loader: false });
    if (code && message) return this.setState({ loginError: { modal: true, code, message }});

    Auth.login(user);
    this.setState({ isLogin: true });
  }

  errorModal = () => {
    return (<ModalComponent
      header={this.state.loginError.code ||  ''}
      content={this.state.loginError.message ||  ''}
      button="OK"
      modalOpen={this.state.loginError.modal}
      onClose={() => {
        this.setState({ loginError: { modal: false } });
        return this.state.loginError.modal;
      }}
    />);
  }

  loginForm = () => {
    return (<div>
      <Grid centered columns={1}>
        <Grid.Column>
          <Form onSubmit={this.login}>
            <Form.Field>
              <label>Email</label>
              <input onChange={this.emailOnChange} placeholder='Email' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type='password' onChange={this.passwordOnChange} placeholder='Password' />
            </Form.Field>
            <Button primary>Login</Button>
          </Form>
        </Grid.Column>
        <Grid.Column>
          {this.registerFormModal()}
        </Grid.Column>
      </Grid>
      </div>);
  }

  loader = () => {
    return (this.state.loader) ? <Dimmer active><Loader /></Dimmer> : '';
  }

  register = async () => {
    this.setState({ registerModal: false })
    this.setState({ loader: true });
    const { user, code, message } = await registerController({
      email: this.state.reEmail,
      password: this.state.rePassword,
    });
    this.setState({ loader: false });
    if (code && message) return this.setState({ loginError: { modal: true, code, message } });
  }

  open = () => this.setState({ registerModal: true })
  close = () => this.setState({ registerModal: false })

  registerFormModal = () => {
    return (<Modal open={this.state.registerModal} onOpen={this.open} onClose={this.close} size='tiny' trigger={<Button>Sign up</Button>}>
      <Modal.Header>Sign Up</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Sign up to login</Header>
          <Form onSubmit={this.register}>
            <Form.Field>
              <label>Email</label>
              <input onChange={this.reEmailOnChange} placeholder='Email' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type='password' onChange={this.rePasswordOnChange} placeholder='Password' />
            </Form.Field>
            <Grid centered columns={1}>
              <Grid.Column>
                <Button primary>Sign up</Button>
              </Grid.Column>
            </Grid>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>);
  }

  render() {
    if (this.state.isLogin) return <Redirect to='/admin' />;
    return (
      <div style={{ 'paddingTop': 100 }}>
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
        {this.loader()}
      </div>
    )
  }
};
