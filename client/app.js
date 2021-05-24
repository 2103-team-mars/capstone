import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Routes from './routes';

import { Container } from '@material-ui/core';

const App = () => {
  return (
    <>
      <div className="content">
        <Navbar />
        <Container maxWidth="xl">
          <Routes />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default App;
