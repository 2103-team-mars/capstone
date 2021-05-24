import React from 'react';

import { Box, TextField, MenuItem } from '@material-ui/core';

const professions = ['Psychiatrist', 'Psychologist', 'Therapist'];

const DoctorSignup = ({ professionRef }) => {
  return (
    <>
      <Box width="100%" pt={2}>
        <TextField
          inputRef={professionRef}
          id="profession"
          name="profession"
          label="Profession"
          variant="outlined"
          defaultValue="Psychiatrist"
          fullWidth
          required
          select
        >
          {professions.map((option, idx) => (
            <MenuItem key={idx} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </>
  );
};

export default DoctorSignup;
