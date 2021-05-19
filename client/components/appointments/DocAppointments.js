import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppointments } from '../../store/appointments';
import { useParams } from 'react-router-dom';
import NewAppointmentForm from '../NewAppointmentForm';
import {
  getDateString,
  momomentLocalizer,
  startAccessor,
  endAccessor,
} from '../../utils/dateUtils';
import AppointmentDialog from './Dialog';
import { DoctorAppointment, PatientAppointment } from './RegisterAppointment';

import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Box } from '@material-ui/core';

const AgendaEvent = ({ event, isDoctor }) => {
  if (isDoctor) {
    return <DoctorAppointment event={event} />;
  }
  return <PatientAppointment event={event} />;
};

const DocAppointments = ({ doctorFirstName, doctorLastName }) => {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState(null);

  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);
  const auth = useSelector((state) => state.auth);
  const { docId: doctorId } = useParams();

  const isDoctor = auth.metaType === 'doctor';

  useEffect(() => {
    dispatch(fetchAppointments(true, doctorId));
  }, [auth, doctorId]);

  const titleAccessor = (event) => {
    return event.topic;
  };

  const eventPropGetter = (event) => {
    return { style: { backgroundColor: event.topic === '' ? 'red' : 'blue' } };
  };

  const handleClickEvent = (event) => {
    if (auth.metaType === 'doctor') {
      setEvent(event);
      setOpen(true);
    } else {
      if (!event.patient || event.patient.id === auth.metaId) {
        setEvent(event);
        setOpen(true);
      }
    }
  };

  const handleClose = () => {
    setEvent(null);
    setOpen(false);
  };

  return (
    <div>
      {auth.metaType === 'doctor' && <NewAppointmentForm />}
      <Box height="700px" p={2} style={{ backgroundColor: 'white' }}>
        <Calendar
          events={appointments}
          localizer={momomentLocalizer}
          defaultView={Views.WEEK}
          titleAccessor={titleAccessor}
          startAccessor={startAccessor}
          endAccessor={endAccessor}
          // eventPropGetter={eventPropGetter}
          onSelectEvent={handleClickEvent}
          // components={{
          //   agenda: {
          //     event: (props) => <AgendaEvent {...props} isDoctor={auth.metaType === 'doctor'} />,
          //   },
          // }}
        />
      </Box>
      {!!event && (
        <AppointmentDialog open={open} handleClose={handleClose} title={getDateString(event.date)}>
          {auth.metaType === 'doctor' ? (
            <DoctorAppointment event={event} />
          ) : (
            <PatientAppointment
              event={event}
              doctorFirstName={doctorFirstName}
              doctorLastName={doctorLastName}
            />
          )}
        </AppointmentDialog>
      )}
    </div>
  );
};

export default DocAppointments;
