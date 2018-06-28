import React, { Component } from 'react';
import { Form, Card, Image, Icon, Grid, Input, Popup } from 'semantic-ui-react';
import Auth from '../../utils/auth';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { upload, downloadURL } from '../../services/firestorage';
import ContentLoaderComponent from '../../components/contentLoader';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    const { displayName, email, photoURL, lastLoginAt } = Auth.getProfile();
    this.state = {
      displayName,
      email,
      photoURL,
      avatarProcess: true,
      lastLoginAt,
      nameClick: false,
      emailClick: false,
    };
  }

  updateProfile = async({ displayName, photoURL }) => {
    const { currentUser } = firebase.auth();
    try {
      const obj = {};
      if (displayName) Object.assign(obj, { displayName });
      if (photoURL) Object.assign(obj, { photoURL });
      return await currentUser.updateProfile(obj);
    } catch (error) {
      return error;
    }
  }

  inputNameChange = async (e) => {
    const displayName = e.target.value;
    this.setState({ displayName });
    try {
      await this.updateProfile({ displayName });
      const { currentUser } = firebase.auth();
      Auth.setProfile(currentUser);
    } catch (error) {
      console.log(error);
    }
  }

  displayName = () => {
    if (!this.state.nameClick) {
      return (<a onClick={() => this.setState({ nameClick: true })}>{this.state.displayName || 'Display Name'}</a>);
    }
    return this.inputNameForm();
  }

  inputNameForm = () => {
    return (<Form onSubmit={() => this.setState({ nameClick: false })} size='mini'>
      <Form.Field>
        <Input onChange={this.inputNameChange} value={this.state.displayName} placeholder='Display Name' />
      </Form.Field>
    </Form>);
  }

  uploadPhoto = async (e) => {
    const file = e.target.files[0];
    this.setState({ avatarProcess: true });
    try {
      const task = await upload({ file, folder: 'avatar'});
      const photoURL = await downloadURL(task);
      this.setState({ photoURL });
      await this.updateProfile({ photoURL });
      const { currentUser } = firebase.auth();
      Auth.setProfile(currentUser);
    } catch (error) {
      console.log({ error });
    }
  }

  avatar = (avatarId) => {
    return (<div>
      <label htmlFor={avatarId}>
        <ContentLoaderComponent
        active={this.state.avatarProcess}
        message='Avatar is loading...'
        content={<Image style={{ minHeight: '150px' }} onLoad={() => this.setState({ avatarProcess: false })} as='a' src={this.state.photoURL || '/assets/images/steve.jpg'} />}
        />
      </label>
    </div>);
  }

  profileCard = () => {
    const avatarId = 'uploadPhoto';
    return (<Card>
        <Popup
        trigger={this.avatar(avatarId)}
          content='Change your avatar'
          position='right center'
        />
      <Input style={{ visibility: 'hidden', marginTop: '-15%', }} id={avatarId} placeholder='sadasd' type='file' onChange={this.uploadPhoto} />
      <Card.Content>
        <Card.Header>{this.displayName()}</Card.Header>
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
