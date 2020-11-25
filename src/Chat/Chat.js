import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  sendMessage = (text) => {
    const message = {
      text,
      role: ROLE.CUSTOMER,
    };
    const robotMessage = answersData.find((answer) => {
      const result = answer.tags.map((item) => text.includes(item));
      return result.includes(true);
    });
    if (robotMessage !== undefined) {
      this.setState((state) => {
        return {
          messages: state.messages.concat(message),
        };
      });
      setTimeout(() => {
        this.setState((state) => {
          return {
            messages: state.messages.concat(robotMessage),
          };
        });
      }, 1000);
    } else {
      this.setState((state) => {
        return {
          messages: state.messages.concat(message),
        };
      });
    }
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput onMessageChange={this.sendMessage} />
      </main>
    );
  }
}

export default Chat;
