import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
// import { connect } from 'react-redux';
import MapComponent from './MapComponent';
import PatientProfile from './PatientProfile';
import MyAppointments from './MyAppointments';
import Medications from './Medications';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
  const [value, setValue] = React.useState(index);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {auth.metaType === 'patient' ? (
        <div>
          <AppBar position='static' style={{ backgroundColor: '#bbb' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              centered
              variant='fullWidth'
            >
              <Tab label='Find Doctor' />
              <Tab label='My Doctors' />
              <Tab label='Profile' />
              <Tab label='Medications' />
              <Tab label='Appointments' />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <MapComponent />
          </TabPanel>
          <TabPanel value={value} index={1}>
            My doctors list
          </TabPanel>
          <TabPanel value={value} index={2}>
            <PatientProfile />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Medications />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <MyAppointments />
          </TabPanel>
        </div>
      ) : (
        <div>
          <AppBar position='static' style={{ backgroundColor: '#bbb' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              centered
              variant='fullWidth'
            >
              <Tab label='Profile' />
              <Tab label='My Patients' />
              <Tab label='My Appointments' />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            My Doctor Profile
          </TabPanel>
          <TabPanel value={value} index={1}>
            My Patients
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MyAppointments />
          </TabPanel>
        </div>
      )}
    </div>
  );
}
// const mapState = (state) => {
//   return {
//     auth: state.auth,
//   };
// };
// export default connect(mapState)(Dashboard);
