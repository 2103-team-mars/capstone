import React, { Component } from 'react';
import { socket } from './socket';
import Peer from 'simple-peer';
import { v4 } from 'uuid';
import { connect } from 'react-redux';

class Meeting extends Component {
  constructor() {
    super();
    this.state = {
      msg: '',
      chat: [],
      room: '',
      stream: null,
      receivingCall: false,
      callerSignal: null,
      callAccepted: false,
      roomToCall: '',
      callerName: '',
    };
    this.myStream = React.createRef();
    this.theirStream = React.createRef();
    this.connection = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const room = v4();
    this.setState({ room });
    socket.emit('join', room);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.setState({ stream });
        this.myStream.current.srcObject = stream;
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
    this.setState({ msg: '', chat: [...this.state.chat, this.state.msg] });
  }
  render() {
    console.log(this.state.chat);
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
        <video
          style={{ width: '200px' }}
          ref={this.myStream}
          autoPlay
          playsInline
        />
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState)(Meeting);
