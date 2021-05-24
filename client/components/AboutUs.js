import React, { Component } from "react";
import { Box, Grid, Typography, Paper } from "@material-ui/core";
import About from "../SVG/AboutUs";

const styles = {
  gridContainer: {
    display: "grid",
    padding: "1rem",
    justify: "space-evenly",
    alignItems: "center",
    gridGap: "1rem",
  },
  gridAbout: {
    padding: "1rem",
    borderRadius: "1rem",
    boxShadow: "0 0 0.5rem 0 rgb(0 0 0 / 25%)",
    gridArea: "Our Mission",
    backgroundColor: "#f5f5f5",
    spacing: 3,
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
  img: {
    width: 256,
    height: "auto",
    margin: "0 auto",
    display: "block",
  },
};

export class AboutUs extends Component {
  render() {
    return (
      <Box>
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
            <Typography align="center" style={styles.text}>
              Making selecting and managing your mental health easy, seamless
              and at your fingertips.
            </Typography>
          </Grid>

          <Grid item xs={12} style={styles.gridAbout}>
            <Typography variant="h6" align="center" style={styles.title}>
              Our Providers
            </Typography>
            <Typography align="center" style={styles.text}>
              Hello Health offers access to licensed, trained, experienced, and
              accredited psychiatrist, psychologists, and board licensed
              professional counselors and therapists.
            </Typography>
          </Grid>

          <Grid item xs={12} style={styles.gridAbout}>
            <Typography variant="h6" align="center" style={styles.title}>
              Our Team
            </Typography>
            <Typography align="center" style={styles.text}>
              We are a passionate, professional team of developers who are
              driven by our mission and devoted to our craft. In developing this
              application we hope to build a resource for better mental health
              management. Check out our team!
            </Typography>
            <Grid container spacing={1} justify="center" alignItems="center">
              <Grid item xs>
                <img
                  style={styles.img}
                  alt="headshot"
                  src="https://ca.slack-edge.com/T024FPYBQ-U01JGF243E0-89e19e4353a9-512"
                />
                <p justify="center" align="center">
                  Chiara Wahsono
                </p>
              </Grid>
              <Grid item xs>
                <img
                  style={styles.img}
                  alt="headshot"
                  src="https://ca.slack-edge.com/T024FPYBQ-U01PXDH1PTK-65bf8620e716-512"
                />
                <p justify="center" align="center">
                  Christopher Gil Martins
                </p>
              </Grid>

              <Grid item xs>
                <img
                  style={styles.img}
                  alt="headshot"
                  src="https://ca.slack-edge.com/T024FPYBQ-U01HVGXDKL7-9f1006440219-512"
                />
                <p justify="center" align="center">
                  Mohammad Mussab
                </p>
              </Grid>

              <Grid item xs>
                <img
                  style={styles.img}
                  alt="headshot"
                  src="https://ca.slack-edge.com/T024FPYBQ-U01PFMW4F0V-366ee5aa3832-512"
                />
                <p justify="center" align="center">
                  Sarahjean Marhône
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default AboutUs;
