import React, { useState } from 'react';
import { createAppointment } from '../store/appointments';
import { useDispatch } from 'react-redux';

import { KeyboardDateTimePicker } from '@material-ui/pickers';

const NewAppointmentForm = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(createAppointment(dateTime));
    setDateTime(new Date());
  };

  return (
    <div style={{ width: '50%', margin: '5rem auto 0' }}>
      <form onSubmit={handleSubmit}>
        <KeyboardDateTimePicker
          variant="inline"
          ampm={false}
          value={dateTime}
          onChange={setDateTime}
          disablePast
          format="yyyy/MM/dd HH:mm"
        />
        <button type="submit">Create Appointment</button>
      </form>
    </div>
  );
};

export default NewAppointmentForm;
