import React, { Component } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

export default class Meeting extends Component {
  constructor() {
    super();
    this.state = { msg: '', chat: [] };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderChat = this.renderChat.bind(this);
  }
  componentDidMount() {
    const socket = io('http://localhost:8080');
    socket.on('connect', () => {
      socket.emit('join', 'room');
    });
    socket.on('receive', (message) => {
      //this is where we update state with new message
      this.setState({
        chat: [...this.state.chat, { message }],
      });
    });
  }
  onChange(event) {
    this.setState({ msg: event.target.value });
  }
  onSubmit() {
    socket.emit('send message', this.state.msg, 'room');
    this.setState({ msg: '' });
  }
  renderChat() {
    const { chat } = this.state;
    return chat.map(({ msg }, idx) => (
      <div key={idx}>
        <span style={{ color: 'green' }}>: </span>

        <span>{msg}</span>
      </div>
    ));
  }

  render() {
    console.log(this.state.msg);
    console.log(this.state.chat);
    return (
      <div>
        <input
          onChange={(event) => this.onChange(event)}
          value={this.state.msg}
        />
        <button onClick={this.onSubmit}>Send</button>
        <div>{this.renderChat()}</div>
      </div>
    );
  }
}
