import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { fetchPatient } from '../store/patient';

import { Box, Grid, Typography, IconButton } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';

const styles = {
  gridContainer: {
    marginTop: '3rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    minHeight: 500,
    gridTemplateAreas: '"profile symptom" "profile extra"',
    gridGap: '1rem',
  },
  gridProfile: {
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 0 0.5rem 0 rgb(0 0 0 / 25%)',
    gridArea: 'profile',
    backgroundColor: '#f5f5f5',
  },
  gridSymptom: {
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 0 0.5rem 0 rgb(0 0 0 / 25%)',
    gridArea: 'symptom',
    position: 'relative',
    backgroundColor: '#f5f5f5',
  },
  gridExtra: {
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 0 0.5rem 0 rgb(0 0 0 / 25%)',
    gridArea: 'extra',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '40%',
    height: 'auto',
    borderRadius: 9999,
  },
};

const PatientProfileDoctor = () => {
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const patient = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchPatient(patientId));
  }, [patientId]);

  if (!patient.id) return <div>Loading...</div>;

  const { user: userInfo, symptoms, medications } = patient;

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
          <img style={styles.image} src={userInfo.profilePicture} />
          <Typography variant="h6" align="center">
            {userInfo.firstName} {userInfo.lastName}
          </Typography>
          <Grid item container justify="center" spacing={2}>
            <Grid item>
              <Typography align="center">
                <strong>Date of Birth:</strong> {userInfo.dob}
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center">
                <strong>Age:</strong> {userInfo.age}
              </Typography>
            </Grid>
          </Grid>
          <Typography align="center">
            <strong>Email:</strong> {userInfo.email}
          </Typography>
          <Typography align="center">
            <strong>Address:</strong> {userInfo.location}
          </Typography>
        </Grid>
      </Box>
      <Box style={styles.gridSymptom}>
        <Typography variant="h6" align="center">
          Symptoms
        </Typography>
        {symptoms.map((symptom) => {
          return (
            <Box key={symptom.id}>
              <Typography>{symptom.name}</Typography>
            </Box>
          );
        })}
      </Box>
      <Box style={styles.gridExtra}>
        <Box>
          <Typography variant="h6">Medications</Typography>
          {medications.map((medicine) => {
            return <Typography>{medicine.name}</Typography>;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default PatientProfileDoctor;
