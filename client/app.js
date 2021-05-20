import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Routes from "./routes";

import { Container } from "@material-ui/core";

const App = () => {
  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
        <Routes />
      </Container>
      <Footer />
    </div>
  );
};

export default App;
