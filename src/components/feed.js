import React, { Component } from 'react';
import { Image, Feed, Transition, Loader } from 'semantic-ui-react';

export default class FeedComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const loader = !(this.props.postLoaded) ? <Loader active inline='centered' /> : '';
    return (
      <div>
        {loader}
        <Transition.Group duration={200} divided='true' size='large' verticalalign='middle'>
          {this.props.posts.map((feed, i) =>
            <Feed key={i}>
              <Feed.Event>
                <Feed.Label>
                  <Image src={feed.image} />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Date>{feed.date}</Feed.Date>
                  {feed.content}
                </Feed.Content>
              </Feed.Event>
            </Feed>
          )}
        </Transition.Group>
      </div>
    )
  }
};
