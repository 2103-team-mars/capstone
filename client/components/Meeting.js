import React, { Component } from 'react';
import { socket } from '../utils/socket';
import Peer from 'simple-peer';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Grid, Box, Typography, withStyles, Button, TextField } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import CallEndIcon from '@material-ui/icons/CallEnd';

const styles = {
  gridContainer: {
    display: 'grid',
    'grid-template-columns': '2fr 2fr',
    'grid-template-rows': '1fr',
    'grid-gap': '0.2rem',
    'grid-template-areas': "'myVid theirVid'",
    height: 500,
    width: '100%',
  },
  myVid: {
    backgroundColor: 'red',
    'grid-area': 'myVid',
  },
  theirVid: {
    backgroundColor: 'blue',
    'grid-area': 'theirVid',
  },
  chatBox: {
    backgroundColor: 'green',
    'grid-area': 'chatBox',
  },
  video: {
    width: '90%',
    margin: '0 auto',
    display: 'block',
  },
};

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

  componentWillUnmount() {
    if (this.state.callAccepted) {
      this.end(true);
    }

    socket.removeAllListeners('receive');
    socket.removeAllListeners('calling');
    socket.removeAllListeners('answering');
    socket.removeAllListeners('ending');

    if (this.state.stream) {
      this.state.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  answer() {
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
    const { callAccepted, receivingCall, callerName, room, roomToCall, chat, msg } = this.state;
    const { classes } = this.props;
    const isDoctor = this.props.auth.metaType === 'doctor';
    return (
      <Box pt={3}>
        <Typography variant="h4">Meeting</Typography>
        {isDoctor && (
          <>
            <Typography variant="h6">
              <strong>Room Code:</strong> {room}
            </Typography>
            <CopyToClipboard text={room}>
              <Button variant="outlined">Copy Room Code</Button>
            </CopyToClipboard>
          </>
        )}
        <Box pt={1}>
          {callAccepted && <button onClick={() => this.end(true)}>endCall</button>}
          {!callAccepted && receivingCall && (
            <div>
              <p>{callerName} is calling you</p>
              <button onClick={this.answer}>Answer</button>
            </div>
          )}
          {!isDoctor && (
            <div>
              <input value={roomToCall} onChange={this.onRoomChange}></input>
              <button
                onClick={() => {
                  this.call(roomToCall);
                }}
              >
                Call
              </button>
            </div>
          )}
        </Box>
        <Box pt={2}>
          <Grid container spacing={2} justify="center">
            {callAccepted && (
              <Grid item md={6}>
                <video className={classes.video} ref={this.theirStream} autoPlay playsInline />{' '}
              </Grid>
            )}
            <Grid item md={6}>
              <video className={classes.video} ref={this.myStream} autoPlay playsInline muted />
            </Grid>
          </Grid>
        </Box>

        <Box>
          {chat.map((msg, idx) => (
            <div key={idx}>
              <p>{msg}</p>
            </div>
          ))}
        </Box>

        <form onClick={this.onSubmit}>
          <input onChange={(event) => this.onChange(event)} value={msg} />
          <button type="submit">Send</button>
        </form>
      </Box>
    );
  }
}
const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState)(withStyles(styles)(Meeting));
