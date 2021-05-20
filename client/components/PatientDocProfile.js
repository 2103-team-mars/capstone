import React, { Component } from 'react';
import { fetchDoctor } from '../store/singleDoctor';
import { connect } from 'react-redux';
import DocAppointments from './appointments/DocAppointments';

import { Box, Grid, Typography } from '@material-ui/core';

const styles = {
  gridContainer: {
    marginTop: '3rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    minHeight: 600,
    gridTemplateAreas: '"profile calendar" "profile calendar"',
    gridGap: '1rem',
  },
  gridProfile: {
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 0 0.5rem 0 rgb(0 0 0 / 25%)',
    gridArea: 'profile',
    backgroundColor: '#f5f5f5',
  },
  gridCalendar: {
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 0 0.5rem 0 rgb(0 0 0 / 25%)',
    gridArea: 'calendar',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '40%',
    height: 'auto',
    borderRadius: 9999,
  },
};

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
        <Box style={styles.gridContainer}>
          <Box style={styles.gridProfile}>
            <Grid
              container
              direction="column"
              justify="space-around"
              alignItems="center"
              style={{ height: '100%' }}
            >
              <img style={styles.image} src={profilePicture} />
              <Typography variant="h6" align="center">
                {firstName} {lastName}
              </Typography>
              <Typography align="center">
                <strong>Profession</strong>: {profession.name}
              </Typography>
              <Grid item container justify="center" spacing={2}>
                <Grid item>
                  <Typography align="center">
                    <strong>Date of Birth:</strong> {dob}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align="center">
                    <strong>Age:</strong> {age}
                  </Typography>
                </Grid>
              </Grid>
              <Typography align="center">
                <strong>Email:</strong> {email}
              </Typography>
              <Typography align="center">
                <strong>Address:</strong> {location}
              </Typography>
              <Typography align="center">
                <strong>Specializations:</strong>
              </Typography>
              {specialties.map((specialty) => (
                <Typography key={specialty.id}>{specialty.name}</Typography>
              ))}
            </Grid>
          </Box>
          <Box style={styles.gridCalendar}>
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
