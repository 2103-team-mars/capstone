import React, { Component } from 'react';
import { fetchDoctor } from '../store/singleDoctor';
import { connect } from 'react-redux';
import DocAppointments from './appointments/DocAppointments';

import { Box, Grid, Typography } from '@material-ui/core';
import '../../public/styles/profiles.css';

export class PatientDocProfile extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const docId = Number(this.props.match.params.docId);
    this.props.fetchDoctor(docId);
  }
  render() {
    if (!this.props.singleDoc.user) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      const { profilePicture, firstName, lastName, location, dob, age, email } =
        this.props.singleDoc.user;

      const { profession, specialties } = this.props.singleDoc;

      return (
        <Box className="doctor-container" mt={3}>
          <Box className="grid-profile grid-item plat-bg">
            <Grid
              container
              direction="column"
              style={{ height: '100%' }}
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
            </Grid>
          </Box>
          <Box className="grid-calendar grid-item plat-bg">
            <Typography align="center" variant="h6">
              Appointment Availabilities
            </Typography>
            <DocAppointments doctorFirstName={firstName} doctorLastName={lastName} />
          </Box>
        </Box>
      );
    }
  }
}

const mapState = (state) => {
  return {
    singleDoc: state.singleDoctor,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchDoctor: (docId) => dispatch(fetchDoctor(docId)),
  };
};

export default connect(mapState, mapDispatch)(PatientDocProfile);
