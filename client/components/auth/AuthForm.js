import React from 'react';
import LoginForm from './LoginForm';
import UserSignup from './UserSignup';

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
    height: 350,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 200,
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
    <Box mt={5}>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Box className={classes.root}>
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              className={classes.tabs}
              centered
              indicatorColor="primary"
            >
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Patient Signup" {...a11yProps(1)} />
              <Tab label="Doctor Signup" {...a11yProps(2)} />
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
      </Grid>
    </Box>
  );
};

export default AuthForm;
