import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/auth';
import PatientSignup from './PatientSignup';
import DoctorSignup from './DoctorSignup';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

import { Box, Grid, TextField, Button, MenuItem } from '@material-ui/core';

const UserSignup = ({ metaType }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState('male');
  const [dob, setDob] = useState(new Date());
  const [location, setLocation] = useState('');

  const [patientInfo, setPatientInfo] = useState({});
  const [doctorInfo, setDoctorInfo] = useState({});

  const dispatch = useDispatch();

  const handleDobChange = (date) => {
    setDob(date);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const userInfo = {
      email,
      firstName,
      lastName,
      password,
      age,
      sex,
      dob,
      location,
    };
    if (profilePicture.length) userInfo.profilePicture = profilePicture;
    if (metaType === 'patient') {
      dispatch(signup(userInfo, patientInfo, metaType));
    } else {
      dispatch(signup(userInfo, doctorInfo, metaType));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ width: '100%' }}
      >
        <Box width="100%">
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            required
          />
        </Box>
        <Box width="100%" pt={2}>
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            required
            type="password"
          />
        </Box>
        <Box width="100%" pt={2}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(evt) => setFirstName(evt.target.value)}
            required
          />
        </Box>
        <Box width="100%" pt={2}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(evt) => setLastName(evt.target.value)}
            required
          />
        </Box>
        <Box width="100%" pt={2}>
          <TextField
            id="profilePicture"
            name="profilePicture"
            label="Profile Picture"
            variant="outlined"
            fullWidth
            value={profilePicture}
            onChange={(evt) => setProfilePicture(evt.target.value)}
          />
        </Box>
        <Box width="100%" pt={2}>
          <TextField
            id="age"
            name="age"
            label="Age"
            variant="outlined"
            fullWidth
            value={age}
            onChange={(evt) => setAge(evt.target.value)}
            required
          />
        </Box>
        <Box width="100%" pt={2}>
          <TextField
            id="sex"
            name="sex"
            label="Sex"
            variant="outlined"
            fullWidth
            value={sex}
            onChange={(evt) => setSex(evt.target.value)}
            required
            select
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
        </Box>
        <Box width="100%" pt={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableFuture
              openTo="year"
              format="dd/MM/yyyy"
              label="Date of birth"
              views={['year', 'month', 'date']}
              value={dob}
              onChange={handleDobChange}
              id="dob"
              name="dob"
              variant="outlined"
              fullWidth
              required
            />
          </MuiPickersUtilsProvider>
        </Box>
        <Box width="100%" pt={2}>
          <TextField
            id="location"
            name="location"
            label="Address"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(evt) => setLocation(evt.target.value)}
            required
            multiline
            rows={2}
            rowsMax={2}
          />
        </Box>
        {metaType === 'patient' && <PatientSignup />}
        {metaType === 'doctor' && <DoctorSignup />}
        <Box width="100%" pt={2}>
          <Button type="submit" variant="contained" fullWidth color="primary">
            Signup
          </Button>
        </Box>
      </Grid>
    </form>
  );
};

export default UserSignup;
