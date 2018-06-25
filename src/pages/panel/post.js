import React, { Component } from 'react';
import { Grid, Form, Feed } from 'semantic-ui-react';
import FeedComponent from '../../components/feed';
import ChatComponent from '../../components/chat';
import * as firebase from 'firebase';

export default class Post extends Component {

  constructor(probs) {
    super(probs);
    const firestore = firebase.firestore();
    const db = firebase.database();
    this.dbRef = db.ref().child('chat'); //REALTIME DATABASE
    this.feeds = firestore.collection('feeds'); //FIRESTORE
    this.state = {
      content: 'Hello World',
      image: '/assets/images/steve.jpg',
      date: '4 days ago',
      posts: [],
      chatLoaded: false,
      postLoaded: false,
      chat: [],
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ content: value });
  }

  componentDidMount() {
    const posts = [];
    const self = this;

    // REALTIME DATABASE
    this.dbRef.on('value', snapshot => {
      const chat = [];
      snapshot.forEach((data) => {
        chat.push(data.val());
      });
      self.setState({ chat, chatLoaded: true });
    });

    //FIRESTORE
    this.feeds.orderBy('content', 'asc').get().then(function (querySnapshot) {
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      self.setState({ posts, postLoaded: true });
    });
  }

  handleSubmit = () => {
    const data = this.state.posts;
    const { content, date, image } = this.state;

    // FIREBASE SET
    const newStoreRef = this.dbRef.push();
    newStoreRef.set({ content, date, image, createdAt: Date.now() });

    // FIRESTORE ADD
    this.feeds.add({ content, date, image, createdAt: Date.now() }).then(() => {
    });

    // SetState
    data.push({ content, date, image });
    this.setState({ posts: data });
  }

  render() {
    return (
      <div>
        <Grid padded columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Form
                onSubmit={this.handleSubmit}
              >
                {this.state.post}
                <Form.Group>
                  <Form.Input
                    placeholder='Post'
                    name='post'
                    onChange={this.handleChange}
                  />
                  <Form.Button content='Submit' />
                </Form.Group>
              </Form>
            </Grid.Column>
            <Grid.Column className='feed-list'>
            <h2>Feed</h2>
              <FeedComponent postLoaded={this.state.postLoaded} posts={this.state.posts} />
            </Grid.Column>
            <Grid.Column className='feed-list'>
              <h2>Chat</h2>
              <ChatComponent chatLoaded={this.state.chatLoaded} chat={this.state.chat} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
};
