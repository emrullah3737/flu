import React, { Component } from 'react';
import { Loader, Segment, Dimmer } from 'semantic-ui-react';

export default class ContentLoaderComponent extends Component {
  render() {
    return (<Segment>
      <Dimmer active={this.props.active}>
        <Loader>{this.props.message}</Loader>
      </Dimmer>
      {this.props.content}
    </Segment>);
  }
};
