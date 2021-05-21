import React from 'react';
import LoginForm from './LoginForm';
import UserSignup from './UserSignup';
import Login from '../../SVG/LogIn';
import { Tabs, Tab, Box, makeStyles, Grid } from '@material-ui/core';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: '100%', overflow: 'auto' }}
      {...other}
    >
      {value === index && (
        <Box p={3} width="100%">
          {children}
        </Box>
      )}
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 200,
  },
  tab: {
    minWidth: 0,
  },
  container: {
    borderRadius: '1rem',
    boxShadow: '0 0 0.5rem 0 rgb(0 0 0 / 30%)',
    width: '75%',
    margin: '3rem auto 0',
    overflow: 'hidden',
  },
  authContainer: {
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    position: 'relative',
    minHeight: 500,
  },
  svgContainer: {
    backgroundColor: 'white',
    padding: '1rem',
  },
}));

/**
 * COMPONENT
 */
const AuthForm = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box mt={5} className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12} md={6} className={classes.authContainer}>
          <Box className={classes.root}>
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              className={classes.tabs}
              centered
              indicatorColor="primary"
            >
              <Tab label="Login" {...a11yProps(0)} className={classes.tab} />
              <Tab label="Patient Signup" wrapped {...a11yProps(1)} className={classes.tab} />
              <Tab label="Doctor Signup" wrapped {...a11yProps(2)} className={classes.tab} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <LoginForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <UserSignup metaType="patient" />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <UserSignup metaType="doctor" />
            </TabPanel>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className={classes.svgContainer}>
          <Login />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthForm;
