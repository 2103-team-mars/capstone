import React, { Component } from 'react';
import { fetchDoctor } from '../store/singleDoctor';
import { connect } from 'react-redux';
import DocAppointments from './appointments/DocAppointments';
import EditDocProfile from './EditDocProfile';

import { Box, Grid, Typography, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const styles = {
  gridContainer: {
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
  },
  gridCalendar: {
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 0 0.5rem 0 rgb(0 0 0 / 25%)',
    gridArea: 'calendar',
  },
  image: {
    width: '40%',
    height: 'auto',
    borderRadius: 9999,
  },
};

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
      <Box style={styles.gridContainer}>
        <Box style={styles.gridProfile}>
          {this.state.showComponent ? (
            <EditDocProfile closeForm={this.onButtonClick} />
          ) : (
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
              <Fab
                color="secondary"
                aria-label="edit"
                style={{ alignSelf: 'flex-end' }}
                onClick={this.onButtonClick}
              >
                <EditIcon />
              </Fab>
            </Grid>
          )}
        </Box>
        <Box style={styles.gridCalendar}>
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
