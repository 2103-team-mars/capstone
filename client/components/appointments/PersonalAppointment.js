import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAppointment, leaveAppointment } from '../../store/appointments';
import { Link } from 'react-router-dom';

import { Box, Typography, Button } from '@material-ui/core';

export const DoctorAppointment = ({ event, handleClose }) => {
  const dispatch = useDispatch();

  const removeAppointment = (id) => {
    dispatch(deleteAppointment(id));
    handleClose();
  };

  return (
    <Box>
      <Typography>
        <strong>Topic:</strong> {event.topic}
      </Typography>
      <Typography>
        <strong>Patient:</strong>{' '}
        <Link to={`/patients/${event.patient.id}`}>
          {event.patient.user.firstName + ' ' + event.patient.user.lastName}
        </Link>
      </Typography>
      <Typography>
        <strong>Email:</strong> {event.doctor.user.email}
      </Typography>
      <Button variant="contained" onClick={() => removeAppointment(event.id)}>
        Remove Appointment
      </Button>
    </Box>
  );
};

export const PatientAppointment = ({ event, handleClose }) => {
  const dispatch = useDispatch();

  const cancelAppointment = (id) => {
    dispatch(leaveAppointment(id, false));
    handleClose();
  };

  return (
    <Box>
      <Typography>
        <strong>Topic:</strong> {event.topic}
      </Typography>
      <Typography>
        <strong>Doctor:</strong>{' '}
        <Link to={`/doctor/${event.doctor.id}`}>
          {event.doctor.user.firstName + ' ' + event.doctor.user.lastName}
        </Link>
      </Typography>
      <Typography>
        <strong>Email:</strong> {event.doctor.user.email}
      </Typography>
      <Button variant="contained" onClick={() => cancelAppointment(event.id)}>
        Cancel Appointment
      </Button>
    </Box>
  );
};
