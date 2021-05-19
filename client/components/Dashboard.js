import React, { useState } from 'react';
import MapComponent from './MapComponent';
import OldMap from './OldMap';
import PatientProfile from './PatientProfile';
import MyAppointments from './appointments/MyAppointments';
import Medications from './Medications';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DocDocProfile from './DocDocProfile';

import { AppBar, Tabs, Tab, Typography, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  indicator: {
    backgroundColor: 'transparent',
  },
  tab: {
    backgroundColor: '#F5F5F5',
    color: 'black',
  },
  activeTab: {
    backgroundColor: '#004643',
    color: 'white',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ backgroundColor: '#004643' }}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function Dashboard() {
  const auth = useSelector((state) => state.auth);
  let query = useQuery();
  let index = query.get('index');
  if (index === null) {
    index = 0;
  } else {
    index = Number(index);
  }
  const [value, setValue] = useState(index);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <Box mt={3}>
      {auth.metaType === 'patient' ? (
        <Box>
          <AppBar position="static" style={{ backgroundColor: '#F5F5F5' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              classes={{ indicator: classes.indicator }}
              centered
              variant="fullWidth"
            >
              <Tab label="Find Doctor" className={value === 0 ? classes.activeTab : classes.tab} />
              <Tab label="Profile" className={value === 1 ? classes.activeTab : classes.tab} />
              <Tab label="Medications" className={value === 2 ? classes.activeTab : classes.tab} />
              <Tab label="Appointments" className={value === 3 ? classes.activeTab : classes.tab} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            {/* If new map is having trouble switch to old map */}
            {/* <OldMap /> */}
            <MapComponent />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PatientProfile />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Medications />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <MyAppointments />
          </TabPanel>
        </Box>
      ) : (
        <Box>
          <AppBar position="static" style={{ backgroundColor: '#bbb' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              variant="fullWidth"
            >
              <Tab label="Profile" />
              <Tab label="My Appointments" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <DocDocProfile />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MyAppointments />
          </TabPanel>
        </Box>
      )}
    </Box>
  );
}
