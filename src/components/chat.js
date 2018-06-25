import React, { Component } from 'react';
import { Feed, Loader } from 'semantic-ui-react';

export default class ChatComponent extends Component {
  render() {
    const loader = !(this.props.chatLoaded) ? <Loader active inline='centered' /> : '';
    return (
      <div>
        {loader}
        <Feed>
          {this.props.chat.map((e, i) =>
            <Feed.Event
              key={i}
              icon='pencil'
              date={e.date}
              summary={e.content}
            />
          )}
        </Feed>
      </div>
    )
  }
};
