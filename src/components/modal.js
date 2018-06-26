import React, { Component } from 'react';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';

export default class componentName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }
  componentDidMount() {
    this.setState({ modalOpen: this.props.modalOpen });
  }

  componentWillReceiveProps(nextProps) {
    const { modalOpen } = nextProps;
    this.setState({ modalOpen });
  }

  handleClose = () => {
    this.setState({ modalOpen: this.props.onClose() });
  }

  render() {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon={this.props.headerIcon || 'browser'} content={this.props.header || 'Header'} />
        <Modal.Content>
          <h3>{this.props.content || 'Content'}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.handleClose} inverted>
            <Icon name={this.props.buttonIcon || 'checkmark'} />{this.props.button || 'Button'}
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
};
