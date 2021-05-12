import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAppointments,
  deleteAppointment,
  leaveAppointment,
  registerAppointment,
} from '../store/appointments';
import { Link, useParams } from 'react-router-dom';
import NewAppointmentForm from './NewAppointmentForm';

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const DocAppointments = ({ doctorName = 'Doctor' }) => {
  const [open, setOpen] = React.useState(false);
  const [topic, setTopic] = React.useState('');
  const [selectedAppt, setSelectedAppt] = React.useState(null);
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);
  const auth = useSelector((state) => state.auth);
  const { docId: doctorId } = useParams();

  useEffect(() => {
    dispatch(fetchAppointments(true, doctorId));
  }, [auth, doctorId]);

  const claimAppointment = (id) => {
    setSelectedAppt(null);
    setTopic('');
    setOpen(false);
    dispatch(registerAppointment(topic, id));
  };

  const cancelAppointment = (id) => {
    console.log('cancel');
    dispatch(leaveAppointment(id, true));
  };

  const removeAppointment = (id) => {
    dispatch(deleteAppointment(id));
  };

  const handleClickOpen = (idx) => {
    setSelectedAppt(idx);
    setOpen(true);
    console.log(idx, selectedAppt);
  };

  const handleClose = () => {
    setSelectedAppt(null);
    setTopic('');
    setOpen(false);
  };

  return (
    <div>
      {auth.metaType === 'doctor' && <NewAppointmentForm />}
      {appointments.map((appt, idx) => (
        <div key={appt.id}>
          {auth.metaType === 'doctor' ? (
            <div>
              <p>
                {new Date(appt.date).toLocaleString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour12: true,
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </p>
              <p>
                {appt.patient ? (
                  <span>
                    Reserved by:{' '}
                    <Link to={`/patients/${appt.patient.id}`}>
                      {appt.patient.user.firstName + ' ' + appt.patient.user.lastName}
                    </Link>{' '}
                  </span>
                ) : (
                  'Not Taken'
                )}
              </p>
              <button onClick={() => removeAppointment(appt.id)}>Remove</button>
            </div>
          ) : (
            <div>
              <p>
                {new Date(appt.date).toLocaleString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour12: true,
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </p>
              <p>
                {!appt.patient
                  ? 'Available'
                  : appt.patient.id === auth.metaId
                  ? 'Claimed'
                  : 'Taken'}
              </p>
              {!appt.patient ? (
                <button onClick={() => handleClickOpen(idx)}>Claim</button>
              ) : appt.patient.id === auth.metaId ? (
                <button onClick={() => cancelAppointment(appt.id)}>Cancel</button>
              ) : null}
            </div>
          )}
        </div>
      ))}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a topic for the appointment with {doctorName} at{' '}
            {selectedAppt !== null &&
              new Date(appointments[selectedAppt].date).toLocaleString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
              })}
          </DialogContentText>
          <TextField autoFocus margin="dense" id="topic" label="Topic" fullWidth />
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} color="primary">
            Cancel
          </button>
          {selectedAppt !== null && (
            <button onClick={() => claimAppointment(appointments[selectedAppt].id)} color="primary">
              Claim
            </button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DocAppointments;
