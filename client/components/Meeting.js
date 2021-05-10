import React, { Component } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

export default class Meeting extends Component {
  constructor() {
    super();
    this.state = { msg: '', chat: [] };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const socket = io('http://localhost:8080');
    socket.on('connect', () => {
      socket.emit('join', 'room');
    });
    socket.on('receive', (message) => {
      this.setState({
        chat: [...this.state.chat, message],
      });
    });
  }
  onChange(event) {
    this.setState({ msg: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    socket.emit('send message', this.state.msg, 'room');
    this.setState({ msg: '' });
  }
  render() {
    return (
      <div>
        <form onClick={this.onSubmit}>
          <input
            onChange={(event) => this.onChange(event)}
            value={this.state.msg}
          />
          <button type='submit'>Send</button>
        </form>

        {this.state.chat.map((msg, idx) => (
          <div key={idx}>
            <p>{msg}</p>
          </div>
        ))}
      </div>
    );
  }
}
