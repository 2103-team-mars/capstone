import React from 'react';
import Navbar from './components/Navbar';
import Routes from './routes';

import { Container } from '@material-ui/core';

const App = () => {
  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
        <Routes />
      </Container>
    </div>
  );
};

export default App;
