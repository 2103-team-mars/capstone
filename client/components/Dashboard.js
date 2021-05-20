import React, { useState } from 'react';
import MapComponent from './MapComponent';
import OldMap from './OldMap';
import PatientProfile from './PatientProfile';
import MyAppointments from './appointments/MyAppointments';
import Medications from './Medications';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DocDocProfile from './DocDocProfile';

import { AppBar, Tabs, Tab, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  indicator: {
    backgroundColor: 'transparent',
  },
  tab: {
    backgroundColor: '#d8d8d8',
    opacity: 1,
    color: 'black',
  },
  activeTab: {
    backgroundColor: 'white',
    opacity: 1,
    color: 'black',
    borderRight: '1px solid #999',
    borderLeft: '1px solid #999',
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
      style={{ backgroundColor: 'white' }}
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
        <Box style={{ boxShadow: '0 0 0.5rem 0 rgb(0 0 0 / 40%)' }}>
          <AppBar position="static">
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
        <Box style={{ boxShadow: '0 0 0.5rem 0 rgb(0 0 0 / 40%)' }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              classes={{ indicator: classes.indicator }}
              centered
              variant="fullWidth"
            >
              <Tab label="Profile" className={value === 0 ? classes.activeTab : classes.tab} />
              <Tab
                label="My Appointments"
                className={value === 1 ? classes.activeTab : classes.tab}
              />
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
