import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Grid, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import About from "../SVG/AboutUs";

const styles = {
  gridContainer: {
    display: "grid",
    // gridTemplateColumns: "1fr",
    // minHeight: 300,
    // gridTemplateAreas: '"Our Mission" "Our Providers" "Our Team"',
    padding: "1rem",
    justify: "space-evenly",
    alignItems: "center",
    gridGap: "1rem",
  },
  gridAbout: {
    padding: "1rem",
    borderRadius: "1rem",
    boxShadow: "0 0 0.5rem 0 rgb(0 0 0 / 25%)",
    // gridTemplateRows: "1fr 3fr",
    gridArea: "Our Mission",
    backgroundColor: "#f5f5f5",
    spacing: 3,
    // height: "100%",
  },
  title: {
    fontSize: 28,
    color: "#f5f5f5",
    alignItems: "center",
    backgroundColor: "#6BAF5A",
    padding: "1px",
    borderRadius: "1rem",
  },
  text: {
    alignItems: "center",
    padding: "15px",
  },
  imageGrid: {
    margin: "auto",
  },
  img: {
    width: 128,
    height: 128,
  },
};

export class AboutUs extends Component {
  render() {
    return (
      <Box style={{ maxHeight: "100vh", overflow: "auto" }}>
        <Grid
          container
          container
          spacing={3}
          direction="column"
          style={styles.gridContainer}
        >
          <About />
          <Grid item xs={12} style={styles.gridAbout}>
            <Typography variant="h6" align="center" style={styles.title}>
              Our Mission
            </Typography>
            <Typography style={styles.text}>
              Making selecting and managing your mental health easier and more
              accessible. Because finding and prioritizing your mental health
              professional should be easy and convenient
            </Typography>
          </Grid>

          <Grid item xs={12} style={styles.gridAbout}>
            <Typography variant="h6" align="center" style={styles.title}>
              Our Providers
            </Typography>
            <Typography style={styles.text}>
              Hello Health offers access to licensed, trained, experienced, and
              accredited psychiatrist, psychologists (PhD / PsyD), and board
              licensed professional counselors and therapists (LPC).
            </Typography>
          </Grid>

          <Grid item xs={12} style={styles.gridAbout}>
            <Typography variant="h6" align="center" style={styles.title}>
              Our Team
            </Typography>
            <Typography style={styles.text}>
              We are passionate and compassionate professionals team of
              developers who are driven by our mission. In developing this
              application we hope to build a resource for mental health. Check
              out our team!
            </Typography>
            <Grid container spacing={1} style={styles.imageGrid}>
              <Grid item xs>
                <img
                  style={styles.img}
                  alt="headshot"
                  src="https://ca.slack-edge.com/T024FPYBQ-U01JGF243E0-89e19e4353a9-512"
                />
              </Grid>
              <Grid item xs>
                <img
                  style={styles.img}
                  alt="headshot"
                  src="https://ca.slack-edge.com/T024FPYBQ-U01PXDH1PTK-65bf8620e716-512"
                />
              </Grid>

              <Grid item xs>
                <img
                  style={styles.img}
                  alt="headshot"
                  src="https://ca.slack-edge.com/T024FPYBQ-U01HVGXDKL7-9f1006440219-512"
                />
              </Grid>

              <Grid item xs>
                <img
                  style={styles.img}
                  alt="headshot"
                  src="https://ca.slack-edge.com/T024FPYBQ-U01PFMW4F0V-366ee5aa3832-512"
                />
              </Grid>
            </Grid>
          </Grid>
          <br />
          <br />
          <br />
          <br />
        </Grid>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Box>
    );
  }
}

export default AboutUs;
