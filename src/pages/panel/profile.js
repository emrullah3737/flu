import React, { Component } from 'react';
import { Card, Image, Icon, Grid } from 'semantic-ui-react';
import Auth from '../../utils/auth';
import * as moment from 'moment';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: Auth.getProfile(),
    };
    console.log(Auth.getProfile());
  }

  profileCard = () => {
    return (<Card>
      <Image src={this.state.profile.photoURL || '/assets/images/steve.jpg'} />
      <Card.Content>
        <Card.Header>{this.state.profile.displayName || 'No Name'}</Card.Header>
        <Card.Meta>{this.state.profile.email}</Card.Meta>
        <Card.Description>No Desc...</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='clock' />
          Last Login: {moment(parseInt(this.state.profile.lastLoginAt, 10)).fromNow()}
        </a>
      </Card.Content>
    </Card>);
  }
  render() {
    return (
      <div>
        <Grid columns={2} padded>
          <Grid.Column>
            {this.profileCard()}
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
};
