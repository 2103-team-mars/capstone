import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authenticate } from '../../store/auth';

import { Box, TextField, Grid, Button } from '@material-ui/core';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(authenticate(email, password));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ width: '100%' }}
      >
        <Box width="100%">
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            required
          />
        </Box>
        <Box width="100%" pt={2}>
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            required
            type="password"
          />
        </Box>
        <Box width="100%" pt={2}>
          <Button type="submit" variant="contained" fullWidth color="primary">
            Login
          </Button>
        </Box>
      </Grid>
    </form>
  );
};

export default LoginForm;
