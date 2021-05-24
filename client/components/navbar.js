import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from '../store';
import AboutUs from './AboutUs';

import { makeStyles, AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: '#9CCA91',
    color: 'black',
  },
  title: {
    textTransform: 'none',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 135,
    height: 'auto',
  },
}));

const Navbar = ({ handleClick, isLoggedIn }) => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Button color="inherit" className={classes.title} component={RouterLink} to="/home">
            <img
              className={classes.logo}
              src={
                'https://upload.wikimedia.org/wikipedia/commons/9/98/Imageedit_13_5270063664.png'
              }
              alt="Hello Health"
            />
          </Button>
          <Grid item xs container direction="row-reverse">
            {isLoggedIn && (
              <>
                <Button onClick={handleClick} color="inherit">
                  Logout
                </Button>
                <Button component={RouterLink} to="/aboutus" color="inherit">
                  About Us
                </Button>
                <Button component={RouterLink} to="/BMICalculator" color="inherit">
                  BMI Calculator
                </Button>
                <Button component={RouterLink} to="/meeting" color="inherit">
                  Meeting
                </Button>
                <Button component={RouterLink} to="/dashboard" color="inherit">
                  Dashboard
                </Button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Button component={RouterLink} to="/auth" color="inherit">
                  Login
                </Button>

                <Button component={RouterLink} to="/aboutus" color="inherit">
                  About Us
                </Button>
                <Button component={RouterLink} to="/BMICalculator" color="inherit">
                  BMI Calculator
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
