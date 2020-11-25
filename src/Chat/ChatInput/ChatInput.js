import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  valueChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  inputMessage = () => {
    const { value } = this.state;
    if (value !== '') {
      this.props.onMessageChange(value);
      this.setState({
        value: '',
      });
    }
  };

  render() {
    return (
      <footer className="ChatInput">
        <input type="text" onChange={this.valueChange} value={this.state.value} />
        <button type="button" onClick={this.inputMessage}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
