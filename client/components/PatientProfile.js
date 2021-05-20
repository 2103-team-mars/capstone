import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSymptoms } from '../store/symptoms';
import { fetchPatient } from '../store/patient';
import { updatePatientThunk } from '../store/auth';
import { postSymptomThunk, deleteSymptomThunk } from '../store/symptoms';
import SickPatient from '../SVG/SickPatient';

import {
  Box,
  Button,
  Grid,
  Typography,
  Fab,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const defaultState = {
  firstName: '',
  lastName: '',
  dob: '',
  age: 0,
  location: '',
  symptom: '',
};

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    minHeight: 500,
    gridTemplateAreas: '"profile symptom" "profile extra"',
    gridGap: '1rem',
  },
  gridProfile: {
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 0 0.5rem 0 rgb(0 0 0 / 25%)',
    gridArea: 'profile',
  },
  gridSymptom: {
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 0 0.5rem 0 rgb(0 0 0 / 25%)',
    gridArea: 'symptom',
    position: 'relative',
  },
  gridExtra: {
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 0 0.5rem 0 rgb(0 0 0 / 25%)',
    gridArea: 'extra',
  },
  image: {
    width: '40%',
    height: 'auto',
    borderRadius: 9999,
  },
};

export class PatientProfile extends Component {
  constructor() {
    super();
    this.state = { ...defaultState, showEdit: false, openDialog: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updatePatientThunk({ ...this.state });
    this.setState({ showEdit: false });
  }
  handlePost() {
    this.props.postSymptomThunk({ name: this.state.symptom });
    this.handleClose();
  }

  toggleEdit() {
    this.setState((prevState) => ({
      showEdit: !prevState.showEdit,
    }));
  }

  componentDidMount() {
    if (this.props.auth.id) {
      this.setState({
        firstName: this.props.auth.firstName,
        lastName: this.props.auth.lastName,
        dob: this.props.auth.dob,
        age: this.props.auth.age,
        location: this.props.auth.location,
      });
    }
    this.props.fetchSymptoms(this.props.auth.metaId);
  }

  handleClickOpen() {
    this.setState({ openDialog: true });
  }
  handleClose() {
    this.setState({ openDialog: false, symptom: '' });
  }

  render() {
    const { firstName, lastName, dob, age, location, symptom, openDialog, showEdit } = this.state;
    const { handleSubmit, handleChange, handlePost } = this;
    const userInfo = this.props.auth;
    const symptoms = this.props.symptoms || [];

    return (
      <Box style={styles.gridContainer}>
        <Box style={styles.gridProfile}>
          {showEdit ? (
            <form onSubmit={handleSubmit} style={{ height: '100%' }}>
              <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
                style={{ height: '100%' }}
              >
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={firstName}
                  onChange={handleChange}
                  required
                />
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={lastName}
                  onChange={handleChange}
                  required
                />
                <TextField
                  id="dob"
                  name="dob"
                  label="Date of Birth"
                  variant="outlined"
                  type="date"
                  fullWidth
                  value={dob}
                  onChange={handleChange}
                  required
                />
                <TextField
                  id="age"
                  name="age"
                  label="Age"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={age}
                  onChange={handleChange}
                  required
                />
                <TextField
                  id="location"
                  name="location"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={location}
                  onChange={handleChange}
                  required
                />
                <Button type="submit" variant="outlined">
                  Save Changes
                </Button>
              </Grid>
            </form>
          ) : (
            <Grid
              container
              direction="column"
              justify="space-around"
              alignItems="center"
              style={{ height: '100%' }}
            >
              <img style={styles.image} src={userInfo.profilePicture} />
              <Typography variant="h6" align="center">
                {userInfo.firstName} {userInfo.lastName}
              </Typography>
              <Grid item container justify="center" spacing={2}>
                <Grid item>
                  <Typography align="center">
                    <strong>Date of Birth:</strong> {userInfo.dob}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align="center">
                    <strong>Age:</strong> {userInfo.age}
                  </Typography>
                </Grid>
              </Grid>
              <Typography align="center">
                <strong>Email:</strong> {userInfo.email}
              </Typography>
              <Typography align="center">
                <strong>Address:</strong> {userInfo.location}
              </Typography>
              <Fab
                color="secondary"
                aria-label="edit"
                style={{ alignSelf: 'flex-end' }}
                onClick={this.toggleEdit}
              >
                <EditIcon />
              </Fab>
            </Grid>
          )}
        </Box>
        <Box style={styles.gridSymptom}>
          <Typography variant="h6" align="center">
            Symptoms
          </Typography>
          {symptoms.map((symptom) => {
            return (
              <Box key={symptom.id}>
                <Typography>
                  <IconButton
                    aria-label="delete"
                    onClick={() => this.props.deleteSymptomThunk(symptom)}
                    color="secondary"
                  >
                    <RemoveIcon />
                  </IconButton>{' '}
                  {symptom.name}
                </Typography>
              </Box>
            );
          })}
          <Fab
            color="primary"
            aria-label="add"
            style={{ position: 'absolute', bottom: 10, right: 10 }}
            onClick={this.handleClickOpen}
          >
            <AddIcon />
          </Fab>
        </Box>
        <Dialog onClose={this.handleClose} open={openDialog}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Add Symptom
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              id="symptom"
              name="symptom"
              label="Symptom"
              variant="outlined"
              fullWidth
              value={symptom}
              onChange={handleChange}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handlePost} color="primary">
              Add Symptom
            </Button>
          </DialogActions>
        </Dialog>
        <Box style={styles.gridExtra}>
          <Box style={{ width: '50%', margin: '0 auto' }}>
            <SickPatient />
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    symptoms: state.symptoms,
    patient: state.patient,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSymptoms: (id) => dispatch(fetchSymptoms(id)),
    fetchPatient: (id) => dispatch(fetchPatient(id)),
    updatePatientThunk: (id) => dispatch(updatePatientThunk(id)),
    postSymptomThunk: (symptom) => dispatch(postSymptomThunk(symptom)),
    deleteSymptomThunk: (symptom) => dispatch(deleteSymptomThunk(symptom)),
  };
};
export default connect(mapState, mapDispatch)(PatientProfile);
