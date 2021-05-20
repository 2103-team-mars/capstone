import React, { Component } from 'react';
import { socket } from '../utils/socket';
import Peer from 'simple-peer';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
  Grid,
  Box,
  Typography,
  withStyles,
  Button,
  TextField,
  IconButton,
} from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import CallEndIcon from '@material-ui/icons/CallEnd';
import SendIcon from '@material-ui/icons/Send';

const styles = {
  video: {
    maxHeight: '90%',
    maxWidth: '90%',
    minWidth: '80%',
    margin: '0 auto',
    display: 'block',
  },
  boundingBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: '1rem',
    display: 'inline-block',
  },
};

const peerConfig = {
  iceServers: [
    {
      urls: ['stun:23.21.150.121'],
    },
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:stun4.l.google.com:19302',
      ],
    },
    {
      url: 'stun:numb.viagenie.ca:3478',
    },
    {
      url: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com',
    },
  ],
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
        chat: [message, ...this.state.chat],
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
      config: peerConfig,
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
      config: peerConfig,
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
    console.log('submit');
    const { firstName, lastName } = this.props.auth;
    const message = { msg: this.state.msg, author: `${firstName} ${lastName}` };
    socket.emit('send message', message, this.state.room);
    this.setState({ msg: '', chat: [message, ...this.state.chat] });
  }

  render() {
    const { callAccepted, receivingCall, callerName, room, roomToCall, chat, msg } = this.state;
    const { classes } = this.props;
    const isDoctor = this.props.auth.metaType === 'doctor';
    return (
      <Box mt={3}>
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
        <Box mt={1} className={!isDoctor || callAccepted ? classes.boundingBox : ''}>
          {callAccepted && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CallEndIcon />}
              onClick={() => this.end(true)}
            >
              End Call
            </Button>
          )}
          {!callAccepted && receivingCall && (
            <Box>
              <Typography variant="h6">{callerName} is calling you</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CallIcon />}
                onClick={this.answer}
              >
                Answer
              </Button>
            </Box>
          )}
          {!isDoctor && !callAccepted && (
            <Box>
              <TextField
                value={roomToCall}
                onChange={this.onRoomChange}
                id="roomToCall"
                name="roomToCall"
                label="Room to Call"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => {
                        this.call(roomToCall);
                      }}
                    >
                      <CallIcon />
                    </IconButton>
                  ),
                }}
              ></TextField>
            </Box>
          )}
        </Box>
        <Box pt={2}>
          <Grid container spacing={2} justify="center">
            <Grid item md={6} container direction="column" alignItems="center">
              {callAccepted && (
                <Grid item>
                  <video className={classes.video} ref={this.theirStream} autoPlay playsInline />
                </Grid>
              )}
              <Grid item>
                <video className={classes.video} ref={this.myStream} autoPlay playsInline muted />
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Grid
                item
                style={{ height: '100%', width: '100%' }}
                container
                direction="column-reverse"
              >
                <form onSubmit={this.onSubmit} style={{ height: 75 }}>
                  <TextField
                    value={msg}
                    onChange={this.onChange}
                    id="msg"
                    name="msg"
                    variant="outlined"
                    required
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <IconButton type="submit">
                          <SendIcon />
                        </IconButton>
                      ),
                    }}
                  ></TextField>
                </form>
                <Grid
                  item
                  container
                  direction="column-reverse"
                  wrap="nowrap"
                  style={{
                    border: '1px solid black',
                    height: 500,
                    padding: 10,
                    overflowY: 'auto',
                  }}
                >
                  {chat.map(({ msg, author }, index) => (
                    <Box key={index}>
                      <Typography>
                        <strong>{author}:</strong> {msg}
                      </Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
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
