import React, { useState } from 'react';
import { createAppointment } from '../../store/appointments';
import { useDispatch } from 'react-redux';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';

import { Box, Button, Grid } from '@material-ui/core';

const NewAppointmentForm = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(createAppointment(dateTime));
    setDateTime(new Date());
  };

  return (
    <Box style={{ width: '50%', margin: '1rem auto 1rem' }}>
      <form onSubmit={handleSubmit}>
        <Grid container justify="center" alignItems="center" direction="columm">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              variant="inline"
              value={dateTime}
              onChange={(date) => setDateTime(date)}
              disablePast
              format="yyyy/MM/dd HH:mm"
            />
          </MuiPickersUtilsProvider>
          <Button type="submit" variant="contained" style={{ margin: '1rem auto 1rem' }}>
            Create Appointment
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default NewAppointmentForm;
