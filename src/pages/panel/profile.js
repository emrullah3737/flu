import React, { Component } from 'react';
import { Form, Card, Image, Icon, Grid } from 'semantic-ui-react';
import Auth from '../../utils/auth';
import * as moment from 'moment';
import * as firebase from 'firebase';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    const { displayName, email, photoURL, lastLoginAt } = Auth.getProfile();
    this.state = {
      displayName,
      email,
      photoURL,
      lastLoginAt,
      nameClick: false,
      emailClick: false,
    };
  }

  updateProfile = async({ displayName, photoURL }) => {
    const { currentUser } = firebase.auth();
    try {
      return await currentUser.updateProfile({
        displayName,
        photoURL: '/assets/images/steve.jpg',
      });
    } catch (error) {
      return error;
    }
  }

  inputNameChange = async (e) => {
    const displayName = e.target.value;
    this.setState({ displayName });
    const { photoURL } = this.state;
    try {
      await this.updateProfile({ displayName, photoURL });
      const { currentUser } = firebase.auth();
      console.log(currentUser);
      Auth.setProfile(currentUser);
    } catch (error) {
      console.log(error);
    }
  }

  inputName = () => {
    if (!this.state.nameClick) {
      return (<a onClick={() => this.setState({ nameClick: true })}>{this.state.displayName || 'Display Name'}</a>);
    }
    return this.inputNameForm();
  }

  inputNameForm = () => {
    return (<Form onSubmit={() => this.setState({ nameClick: false })} size='mini'>
      <Form.Field>
        <input onChange={this.inputNameChange} value={this.state.displayName} placeholder='Display Name' />
      </Form.Field>
    </Form>);
  }

  profileCard = () => {
    return (<Card>
      <Image src={this.state.photoURL || '/assets/images/steve.jpg'} />
      <Card.Content>
        <Card.Header>{this.inputName()}</Card.Header>
        <Card.Meta>{this.state.email}</Card.Meta>
        <Card.Description>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='clock' />
          Last Login: {moment(parseInt(this.state.lastLoginAt, 10)).fromNow()}
        </a>
      </Card.Content>
    </Card>);
  }

  render() {
    return (
      <div>
        <Grid columns={3} padded>
          <Grid.Column>
            {this.profileCard()}
          </Grid.Column>
          <Grid.Column>
            ...
          </Grid.Column>
          <Grid.Column>
            ...
          </Grid.Column>
        </Grid>
      </div>
    )
  }
};
