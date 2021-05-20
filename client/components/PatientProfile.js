import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSymptoms } from '../store/symptoms';
import { fetchPatient } from '../store/patient';
import { updatePatientThunk } from '../store/auth';
import { postSymptomThunk, deleteSymptomThunk } from '../store/symptoms';

import { Box, Grid, Typography } from '@material-ui/core';

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
    this.state = { ...defaultState, showEdit: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updatePatientThunk({ ...this.state });
  }
  handlePost(event) {
    event.preventDefault();
    this.props.postSymptomThunk({ name: this.state.symptom });
    this.setState(defaultState);
  }

  toggleEdit() {
    this.setState((prevState) => {
      showEdit: !prevState.edit;
    });
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
    this.props.auth.metaType === 'patient'
      ? this.props.fetchSymptoms(this.props.auth.metaId)
      : this.props.fetchPatient(this.props.match.params.patientId);
  }

  render() {
    const { firstName, lastName, dob, age, location, symptom } = this.state;
    const { handleSubmit, handleChange, handlePost } = this;
    const symptoms = this.props.symptoms || [];
    return (
      <Box>
        {this.props.auth.metaType === 'patient' ? (
          <Box style={styles.gridContainer}>
            <Box style={styles.gridProfile}>
              <Grid container direction="column" justify="center" alignItems="center">
                <img style={styles.image} src={this.props.auth.profilePicture} />
                <p>
                  Name: {this.props.auth.firstName} {this.props.auth.lastName}
                </p>
                <p>Date of Birth: {this.props.auth.dob}</p>
                <p>Age: {this.props.auth.age}</p>
                <p>Email: {this.props.auth.email}</p>
                <p>Location: {this.props.auth.location}</p>
              </Grid>
            </Box>
            <Box style={styles.gridSymptom}>
              Symptoms:
              {symptoms.map((symptom) => {
                return (
                  <div key={symptom.id}>
                    <p> {symptom.name}</p>
                    <button onClick={() => this.props.deleteSymptomThunk(symptom)}>X</button>
                  </div>
                );
              })}
            </Box>
            <Box style={styles.gridExtra} />
            {/* <form onSubmit={handleSubmit}>
              <label htmlFor="firstName">First Name:</label>
              <input name="firstName" onChange={handleChange} value={firstName} />
              <label htmlFor="lastName">Last Name:</label>
              <input name="lastName" onChange={handleChange} value={lastName} />
              <label htmlFor="dob">Date of Birth:</label>
              <input name="dob" onChange={handleChange} value={dob} />
              <label htmlFor="age">Age:</label>
              <input name="age" onChange={handleChange} value={age} />
              <label htmlFor="location">Location:</label>
              <input name="location" onChange={handleChange} value={location} />
              <button type="submit">Submit</button>
            </form>
            <form onSubmit={handlePost}>
              <label htmlFor="symptom">Symptoms:</label>
              <input name="symptom" onChange={handleChange} value={symptom} />
              <button type="submit">Submit Change</button>
            </form> */}
          </Box>
        ) : (
          <div>
            {this.props.patient.id && (
              <div key={this.props.patient.id}>
                <img src={this.props.patient.user.profilePicture} />
                <p>
                  Name: {this.props.patient.user.firstName}
                  {this.props.patient.user.lastName}
                </p>
                <p>Date of Birth: {this.props.patient.user.dob}</p>
                <p>Age: {this.props.patient.user.age}</p>
                <p>Email: {this.props.patient.user.email}</p>
                <p>Location: {this.props.patient.user.location}</p>
                Patient Symptoms:
                {this.props.patient.symptoms.map((symptom) => {
                  return <p> {symptom.name}</p>;
                })}
                Patient Medications:
                {this.props.patient.medications.map((medicine) => {
                  return <p> {medicine.name}</p>;
                })}
              </div>
            )}
          </div>
        )}
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
