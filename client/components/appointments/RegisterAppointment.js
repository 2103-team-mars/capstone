import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAppointment, leaveAppointment, registerAppointment } from '../../store/appointments';
import { Link } from 'react-router-dom';

import { Box, Typography, Button, DialogContentText, TextField } from '@material-ui/core';

export const DoctorAppointment = ({ event, handleClose }) => {
  const dispatch = useDispatch();
  const removeAppointment = (id) => {
    dispatch(deleteAppointment(id));
    handleClose();
  };

  return (
    <Box>
      <Typography>
        {event.patient ? (
          <Box>
            <strong>Patient:</strong>{' '}
            <Link to={`/patients/${event.patient.id}`}>
              {event.patient.user.firstName + ' ' + event.patient.user.lastName}
            </Link>
          </Box>
        ) : (
          'Unclaimed'
        )}
      </Typography>
      {!!event.patient && (
        <Typography>
          <strong>Topic:</strong> {event.topic}
        </Typography>
      )}
      <Button variant="contained" onClick={() => removeAppointment(event.id)}>
        Remove Appointment
      </Button>
    </Box>
  );
};

export const PatientAppointment = ({ event, doctorFirstName, doctorLastName, handleClose }) => {
  const [topic, setTopic] = useState('');
  const dispatch = useDispatch();

  const cancelAppointment = (id) => {
    dispatch(leaveAppointment(id, true));
    handleClose();
  };

  const claimAppointment = (id) => {
    dispatch(registerAppointment(topic, id));
    setTopic('');
    handleClose();
  };

  return (
    <Box>
      {!event.patient ? (
        <Box>
          <DialogContentText>
            Please enter a topic for the appointment with Dr. {doctorFirstName} {doctorLastName}
          </DialogContentText>
          <TextField
            margin="dense"
            id="topic"
            label="Topic"
            fullWidth
            onChange={(evt) => setTopic(evt.target.value)}
          />
          <Button onClick={() => claimAppointment(event.id)} variant="outlined">
            Claim Appointment
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography>
            <strong>Topic:</strong> {event.topic}
          </Typography>
          <Button variant="contained" onClick={() => cancelAppointment(event.id)}>
            Cancel Appointment
          </Button>
        </Box>
      )}
    </Box>
  );
};
