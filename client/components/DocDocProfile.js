import React, { Component } from 'react';
import { fetchDoctor } from '../store/singleDoctor';
import { connect } from 'react-redux';
import DocAppointments from './appointments/DocAppointments';
import EditDocProfile from './EditDocProfile';

import { Box, Grid, Typography, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import '../../public/styles/profiles.css';

export class DocDocProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  componentDidMount() {
    const docId = this.props.auth.metaId;
    this.props.fetchDoctor(docId);
    this.setState({
      showComponent: false,
    });
  }

  onButtonClick() {
    this.setState({
      showComponent: !this.state.showComponent,
    });
  }

  render() {
    const {
      profilePicture,
      firstName,
      lastName,
      location,
      email,
      dob,
      age,
      meta: { profession },
    } = this.props.auth;

    const specialties = this.props.singleDoc.specialties || [];

    return (
      <Box className="doctor-container">
        <Box className="grid-profile grid-item">
          {this.state.showComponent ? (
            <EditDocProfile closeForm={this.onButtonClick} />
          ) : (
            <Grid
              container
              direction="column"
              style={{ height: '100%', position: 'relative' }}
              className="child-spacing"
              wrap="nowrap"
            >
              <img className="profile-image" src={profilePicture} />
              <Typography variant="h6" align="center">
                {firstName} {lastName}
              </Typography>
              <Typography>
                <strong>Profession</strong>: {profession.name}
              </Typography>
              <Grid item container spacing={2}>
                <Grid item>
                  <Typography>
                    <strong>Date of Birth:</strong> {dob}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <strong>Age:</strong> {age}
                  </Typography>
                </Grid>
              </Grid>
              <Typography>
                <strong>Email:</strong> {email}
              </Typography>
              <Typography>
                <strong>Address:</strong> {location}
              </Typography>
              <Typography>
                <strong>Specializations:</strong>
              </Typography>
              {specialties.map((specialty) => (
                <Typography key={specialty.id}>{specialty.name}</Typography>
              ))}
              <Fab
                color="secondary"
                aria-label="edit"
                style={{ position: 'absolute', bottom: 10, right: 10 }}
                onClick={this.onButtonClick}
              >
                <EditIcon />
              </Fab>
            </Grid>
          )}
        </Box>
        <Box className="grid-calendar grid-item">
          <Typography align="center" variant="h6">
            My Appointment Schedule
          </Typography>
          <DocAppointments />
        </Box>
      </Box>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    singleDoc: state.singleDoctor,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchDoctor: (docId) => dispatch(fetchDoctor(docId)),
  };
};

export default connect(mapState, mapDispatch)(DocDocProfile);
