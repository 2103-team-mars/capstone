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
import '../../public/styles/profiles.css';

const defaultState = {
  firstName: '',
  lastName: '',
  dob: '',
  age: 0,
  location: '',
  symptom: '',
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
    const { handleSubmit, handleChange } = this;
    const userInfo = this.props.auth;
    const symptoms = this.props.symptoms || [];

    return (
      <Box className="patient-container">
        <Box className="grid-profile grid-item">
          {showEdit ? (
            <form onSubmit={handleSubmit} style={{ height: '100%' }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                style={{ height: '100%' }}
                className="child-spacing"
                wrap="nowrap"
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
              style={{ height: '100%', position: 'relative' }}
              className="child-spacing"
              wrap="nowrap"
            >
              <img className="profile-image" src={userInfo.profilePicture} />
              <Typography variant="h6" style={{ alignSelf: 'center' }}>
                {userInfo.firstName} {userInfo.lastName}
              </Typography>
              <Grid item container spacing={2}>
                <Grid item>
                  <Typography>
                    <strong>Date of Birth:</strong> {userInfo.dob}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <strong>Age:</strong> {userInfo.age}
                  </Typography>
                </Grid>
              </Grid>
              <Typography>
                <strong>Email:</strong> {userInfo.email}
              </Typography>
              <Typography>
                <strong>Address:</strong> {userInfo.location}
              </Typography>
              <Fab
                color="secondary"
                aria-label="edit"
                style={{ position: 'absolute', bottom: 10, right: 10 }}
                onClick={this.toggleEdit}
              >
                <EditIcon />
              </Fab>
            </Grid>
          )}
        </Box>
        <Box className="grid-symptom grid-item">
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
        <Box className="grid-extra">
          <Box style={{ width: '75%', margin: '0 auto' }}>
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
