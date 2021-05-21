import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Grid, Typography, Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import About from "../SVG/AboutUs";

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    minHeight: 600,
    gridTemplateAreas: '"profile calendar" "profile calendar"',
    gridGap: "1rem",
  },
  gridProfile: {
    padding: "1rem",
    borderRadius: "1rem",
    boxShadow: "0 0 0.5rem 0 rgb(0 0 0 / 25%)",
    gridArea: "profile",
  },
  gridCalendar: {
    padding: "1rem",
    borderRadius: "1rem",
    boxShadow: "0 0 0.5rem 0 rgb(0 0 0 / 25%)",
    gridArea: "calendar",
  },
  image: {
    width: "40%",
    height: "auto",
    borderRadius: 9999,
  },
};

export class AboutUs extends Component {
  render() {
    return (
      <Box style={styles.gridContainer}>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Typography variant="h6" align="center">
            Our Mission
          </Typography>
          <Typography align="center">
            Making selecting and managing your mental health easier and more
            accessible. Because finding and prioritizing your mental health
            professional should be easy and convenient
          </Typography>
        </Grid>
      </Box>
    );
  }
}

export default AboutUs;

/* <div>
        <div>
          <h3>Our Mission</h3>
          <h4>
            Making selecting and managing your mental health easier and more
            accessible. Because finding and prioritizing your mental health
            professional should be easy and convenient
          </h4>
        </div>

        <div>
          <h3>Our Providers</h3>
          <p>
            Hello Health offers access to licensed, trained, experienced, and
            accredited psychiatrist, psychologists (PhD / PsyD), and board
            licensed professional counselors and therapists (LPC).
          </p>
        </div>

        <div>
          <h3>Our Team</h3>
          <p>
            We are passionate and compassionate professionals team of developers
            who are driven by our mission. In developing this application we
            hope to build a resource for mental health. Check out our team!
          </p>
          <img
            className='photo'
            height={300}
            width={300}
            src='https://ca.slack-edge.com/T024FPYBQ-U01HVGXDKL7-9f1006440219-512'
          />

          <img
            className='photo'
            height={300}
            width={300}
            src='https://ca.slack-edge.com/T024FPYBQ-U01JGF243E0-89e19e4353a9-512'
          />
          <img
            className='photo'
            height={300}
            width={300}
            src='https://ca.slack-edge.com/T024FPYBQ-U01PXDH1PTK-65bf8620e716-512'
          />
          <img
            className='photo'
            height={300}
            width={300}
            src='https://ca.slack-edge.com/T024FPYBQ-U01PFMW4F0V-366ee5aa3832-512'
          />
         <About />
        </div>
      </div> */
