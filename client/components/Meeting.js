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
    this.onRoomChange = this.onRoomChange.bind(this);
    this.answer = this.answer.bind(this);
    this.call = this.call.bind(this);
    this.end = this.end.bind(this);
  }
  componentDidMount() {
    const room = v4();
    this.setState({ room });
    socket.emit('join', room);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      this.setState({ stream });
      this.myStream.current.srcObject = stream;
    });
    socket.on('receive', (message) => {
      this.setState({
        chat: [...this.state.chat, message],
      });
    });
    socket.on('calling', (data) => {
      this.setState({
        receivingCall: true,
        callerSignal: data.signal,
        callerName: data.name,
      });
    });
    socket.on('ending', () => {
      this.end(false);
    });
  }
  answer() {
    console.log('running');
    this.setState({ callAccepted: true });
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: this.state.stream,
    });
    peer.on('signal', (data) => {
      socket.emit('answer', { room: this.state.room, signal: data });
    });
    peer.on('stream', (stream) => {
      this.theirStream.current.srcObject = stream;
    });
    peer.signal(this.state.callerSignal);
    this.connection.current = peer;
  }
  call(room) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: this.state.stream,
    });
    peer.on('signal', (data) => {
      socket.emit('join', room);
      socket.emit('call', {
        room,
        signal: data,
        name: this.props.auth.firstName + ' ' + this.props.auth.lastName,
      });
    });
    peer.on('stream', (stream) => {
      this.theirStream.current.srcObject = stream;
    });
    socket.on('answering', (signal) => {
      this.setState({ callAccepted: true, room });
      peer.signal(signal);
    });
    this.connection.current = peer;
  }
  end(initiator) {
    socket.removeAllListeners('answering');
    if (this.props.auth.metaType !== 'doctor') {
      socket.emit('leave', this.state.room);
    }
    this.setState({
      room: this.props.auth.metaType === 'doctor' ? this.state.room : '',
      receivingCall: false,
      callerSignal: null,
      callAccepted: false,
      roomToCall: '',
      callerName: '',
    });
    this.theirStream.current.srcObject = null;
    this.connection.current.destroy();
    if (initiator) {
      socket.emit('end', this.state.room);
    }
  }
  onChange(event) {
    this.setState({ msg: event.target.value });
  }
  onRoomChange(event) {
    this.setState({ roomToCall: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    socket.emit('send message', this.state.msg, this.state.room);
    this.setState({ msg: '', chat: [...this.state.chat, this.state.msg] });
  }
  render() {
    return (
      <div>
        <form onClick={this.onSubmit}>
          <input onChange={(event) => this.onChange(event)} value={this.state.msg} />
          <button type="submit">Send</button>
        </form>

        {this.state.chat.map((msg, idx) => (
          <div key={idx}>
            <p>{msg}</p>
          </div>
        ))}
        <video style={{ width: '600px' }} ref={this.myStream} autoPlay playsInline muted />
        {this.state.callAccepted ? (
          <video style={{ width: '600px' }} ref={this.theirStream} autoPlay playsInline />
        ) : null}
        {this.props.auth.metaType === 'doctor' ? (
          <div>
            <p>{this.state.room}</p>
          </div>
        ) : null}
        {this.state.callAccepted ? <button onClick={() => this.end(true)}>endCall</button> : null}
        {!this.state.callAccepted && this.state.receivingCall ? (
          <div>
            <p>{this.state.callerName}</p>
            <button onClick={this.answer}>Answer</button>
          </div>
        ) : null}
        {this.props.auth.metaType !== 'doctor' ? (
          <div>
            <input value={this.state.roomToCall} onChange={this.onRoomChange}></input>
            <button
              onClick={() => {
                this.call(this.state.roomToCall);
              }}
            >
              Call
            </button>
          </div>
        ) : null}
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
