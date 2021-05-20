import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppointments } from '../../store/appointments';
import {
  getDateString,
  momomentLocalizer,
  startAccessor,
  endAccessor,
} from '../../utils/dateUtils';
import AppointmentDialog from './Dialog';
import { DoctorAppointment, PatientAppointment } from './PersonalAppointment';

import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Box } from '@material-ui/core';

const titleAccessor = (event) => {
  return event.topic;
};

const AgendaEvent = ({ event, isDoctor }) => {
  if (isDoctor) {
    return <DoctorAppointment event={event} />;
  }
  return <PatientAppointment event={event} />;
};

const MyAppointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);
  const auth = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState(null);

  const handleClickOpen = (event) => {
    setEvent(event);
    setOpen(true);
  };
  const handleClose = () => {
    setEvent(null);
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchAppointments(auth.metaType === 'doctor', auth.metaId));
  }, [auth]);

  const filledAppointments = appointments.filter((appt) => {
    return (auth.metaType === 'doctor' && appt.patient) || appt.doctor;
  });

  if (!filledAppointments.length) {
    return <Box>You have no registered appointments</Box>;
  }

  return (
    <Box>
      <Box height="700px" p={2} style={{ backgroundColor: 'white' }}>
        <Calendar
          events={filledAppointments}
          localizer={momomentLocalizer}
          defaultView={Views.WEEK}
          titleAccessor={titleAccessor}
          startAccessor={startAccessor}
          endAccessor={endAccessor}
          onSelectEvent={handleClickOpen}
          components={{
            agenda: {
              event: (props) => <AgendaEvent {...props} isDoctor={auth.metaType === 'doctor'} />,
            },
          }}
        />
      </Box>
      {!!event && (
        <AppointmentDialog open={open} handleClose={handleClose} title={getDateString(event.date)}>
          {auth.metaType === 'doctor' ? (
            <DoctorAppointment event={event} handleClose={handleClose} />
          ) : (
            <PatientAppointment event={event} handleClose={handleClose} />
          )}
        </AppointmentDialog>
      )}
    </Box>
  );
};

export default MyAppointments;
