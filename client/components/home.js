import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAppointments } from '../store/appointments';
import { getDateString } from '../utils/dateUtils';
import SingleDoctor from '../SVG/singleDoctor';
import Meeting from '../SVG/Meeting';
import Icon from '../SVG/PatientWelcome';

import { Box, Grid, Typography, Button } from '@material-ui/core';
import '../../public/styles/home.css';

/**
 * COMPONENT
 */
export class Home extends React.Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.fetchAppointments(this.props.auth.metaType === 'doctor', this.props.auth.metaId);
    }
  }
  render() {
    const { auth, isLoggedIn } = this.props;

    if (!isLoggedIn) {
      return (
        <Box mt={3}>
          <Grid container>
            <Grid item md={6} container direction="column" justify="center" alignItems="center">
              <Typography variant="h1" align="center">
                Welcome
              </Typography>
              <Button
                to="/auth"
                component={Link}
                variant="contained"
                style={{ marginTop: '2rem', backgroundColor: '#6BAF5A' }}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item md={6}>
              <Box width="75%">
                <Meeting />
              </Box>
            </Grid>
          </Grid>
        </Box>
      );
    } else {
      return (
        <Box mt={3}>
          <Grid container justify="center">
            <Grid item md={6} container direction="column" className="welcome">
              <Box>
                <Typography variant="h4">
                  Hi, {auth.firstName} {auth.lastName}, how can we help you today?
                </Typography>
                <Box mt={4}>
                  {this.props.appointments.length ? (
                    <Typography variant="h6">
                      You have an upcoming appointment on{' '}
                      {getDateString(this.props.appointments[0].date)}
                    </Typography>
                  ) : (
                    <Typography variant="h6">You have no upcomming appointments</Typography>
                  )}
                </Box>
                {auth.metaType === 'patient' ? (
                  <Box className="grid-container" mt={4}>
                    <Button className="grid-button" to={'/dashboard?index=1'} component={Link}>
                      Not feeling well? Update your symptoms
                    </Button>
                    <Button className="grid-button" to={'/dashboard?index=0'} component={Link}>
                      Looking for a doctor? Browse the map
                    </Button>
                    <Button className="grid-button" to={'/dashboard?index=2'} component={Link}>
                      Check your medication
                    </Button>
                  </Box>
                ) : (
                  <Box className="grid-container" mt={4}>
                    <Button className="grid-button" to={'/dashboard?index=1'} component={Link}>
                      View your upcoming appointments
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box width="75%">{auth.metaType === 'patient' ? <Icon /> : <SingleDoctor />}</Box>
            </Grid>
          </Grid>
        </Box>
      );
    }
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
    appointments: state.appointments,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAppointments: (isDoctor, id) => dispatch(fetchAppointments(isDoctor, id)),
  };
};

export default connect(mapState, mapDispatch)(Home);
