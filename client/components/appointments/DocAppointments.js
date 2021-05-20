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
    dispatch(fetchAppointments(true, doctorId || auth.metaId));
  }, [auth, doctorId]);

  const titleAccessor = (event) => {
    if (isDoctor) {
      return event.topic || 'Unclaimed';
    } else if (event.patient) {
      return event.patient.id === auth.metaId ? event.topic : 'Taken';
    } else {
      return 'Unclaimed';
    }
  };

  const eventPropGetter = (event) => {
    let backgroundColor;
    if (isDoctor) {
      backgroundColor = event.patient ? '#ff715e' : '#a8ff96';
    } else if (event.patient) {
      backgroundColor = event.patient.id === auth.metaId ? '#87a7ff' : '#ff715e';
    } else {
      backgroundColor = '#a8ff96';
    }
    return { style: { backgroundColor, color: 'black' } };
  };

  const handleClickEvent = (event) => {
    if (isDoctor) {
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
      {isDoctor && <NewAppointmentForm />}
      <Box height="700px" p={2} style={{ backgroundColor: 'white' }}>
        <Calendar
          events={appointments}
          localizer={momomentLocalizer}
          defaultView={Views.WEEK}
          titleAccessor={titleAccessor}
          startAccessor={startAccessor}
          endAccessor={endAccessor}
          eventPropGetter={eventPropGetter}
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
          {isDoctor ? (
            <DoctorAppointment event={event} handleClose={handleClose} />
          ) : (
            <PatientAppointment
              event={event}
              doctorFirstName={doctorFirstName}
              doctorLastName={doctorLastName}
              handleClose={handleClose}
            />
          )}
        </AppointmentDialog>
      )}
    </div>
  );
};

export default DocAppointments;
