import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { fetchPatient, postMedicationsThunk } from '../store/patient';

import {
  Box,
  Grid,
  Typography,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../../public/styles/profiles.css';

const PatientProfileDoctor = () => {
  const [name, setName] = useState('');
  const [strength, setStrength] = useState(0);
  const [company, setCompany] = useState('');
  const [instructions, setInstructions] = useState('');
  const [reason, setReason] = useState('');
  const [dialog, setDialog] = useState(false);
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const patient = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchPatient(patientId));
  }, [patientId]);

  const handleClose = () => {
    setDialog(false);
    setName('');
    setStrength(0);
    setCompany('');
    setInstructions('');
    setReason('');
  };
  const handleClickOpen = () => {
    setDialog(true);
  };

  const handlePost = (event) => {
    event.preventDefault();
    dispatch(
      postMedicationsThunk(patient.id, {
        name,
        strength,
        company,
        instructions,
        reason,
      })
    );
    handleClose();
  };

  if (!patient.id) return <div>Loading...</div>;

  const { user: userInfo, symptoms, medications } = patient;

  return (
    <Box className="patient-container" mt={3}>
      <Box className="grid-profile grid-item plat-bg">
        <Grid
          container
          direction="column"
          style={{ height: '100%' }}
          className="child-spacing"
          wrap="nowrap"
        >
          <img className="profile-image" src={userInfo.profilePicture} />
          <Typography variant="h6" align="center">
            {userInfo.firstName} {userInfo.lastName}
          </Typography>
          <Grid item container spacing={2}>
            <Grid item>
              <Typography>
                <strong>Date of Birth:</strong> {userInfo.dob}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <strong>Age:</strong> {userInfo.age}
              </Typography>
            </Grid>
          </Grid>
          <Typography>
            <strong>Email:</strong> {userInfo.email}
          </Typography>
          <Typography>
            <strong>Address:</strong> {userInfo.location}
          </Typography>
        </Grid>
      </Box>
      <Box className="grid-symptom grid-item plat-bg">
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
      <Box className="grid-extra grid-item plat-bg">
        <Box>
          <Typography variant="h6">Medications</Typography>
          {medications.map((medication) => {
            return (
              <Accordion key={medication.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{
                    backgroundColor: '#e5e5e5',
                  }}
                >
                  <Typography>
                    <strong>{medication.name}</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ display: 'block' }}>
                  <Typography>
                    <strong>Dosage:</strong> {medication.strength}
                  </Typography>
                  <Typography>
                    <strong>Company:</strong> {medication.company}
                  </Typography>
                  <Typography>
                    <strong>Instructions:</strong> {medication.instructions}
                  </Typography>
                  <Typography>
                    <strong>Reason:</strong> {medication.reason}
                  </Typography>
                </AccordionDetails>{' '}
              </Accordion>
            );
          })}
          <Fab
            color="primary"
            aria-label="add"
            style={{ position: 'absolute', bottom: 10, right: 10 }}
            onClick={handleClickOpen}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>
      <Dialog onClose={handleClose} open={dialog}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Medication
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            required
            style={{ marginTop: '1rem' }}
          />
          <TextField
            id="strength"
            name="strength"
            label="Strength"
            variant="outlined"
            type="number"
            fullWidth
            value={strength}
            onChange={(event) => {
              setStrength(event.target.value);
            }}
            required
            style={{ marginTop: '1rem' }}
          />
          <TextField
            id="company"
            name="company"
            label="Company"
            variant="outlined"
            fullWidth
            value={company}
            onChange={(event) => {
              setCompany(event.target.value);
            }}
            required
            style={{ marginTop: '1rem' }}
          />
          <TextField
            id="instructions"
            name="instructions"
            label="Instructions"
            variant="outlined"
            fullWidth
            value={instructions}
            onChange={(event) => {
              setInstructions(event.target.value);
            }}
            required
            style={{ marginTop: '1rem' }}
          />
          <TextField
            id="reason"
            name="reason"
            label="Reason"
            variant="outlined"
            fullWidth
            value={reason}
            onChange={(event) => {
              setReason(event.target.value);
            }}
            required
            style={{ marginTop: '1rem' }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handlePost} color="primary">
            Add Medication
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientProfileDoctor;
