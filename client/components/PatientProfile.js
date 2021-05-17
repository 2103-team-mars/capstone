import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSymptoms } from '../store/symptoms';
import { fetchPatient } from '../store/patient';
import { updatePatientThunk } from '../store/auth';
import { postSymptomThunk, deleteSymptomThunk } from '../store/symptoms';

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
    this.state = {
      // id: this.props.auth.id,
      firstName: '',
      lastName: '',
      dob: '',
      age: 0,
      location: '',
      symptom: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePost = this.handlePost.bind(this);
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

  componentDidMount() {
    if (this.props.auth.id) {
      this.setState({
        id: this.props.auth.id,
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
      <div>
        {this.props.auth.metaType === 'patient' ? (
          <div key={this.props.auth.id}>
            <img src={this.props.auth.profilePicture} />
            <p>
              Name: {this.props.auth.firstName} {this.props.auth.lastName}
            </p>
            <p>Date of Birth: {this.props.auth.dob}</p>
            <p>Age: {this.props.auth.age}</p>
            <p>Email: {this.props.auth.email}</p>
            <p>Location: {this.props.auth.location}</p>
            Symptoms:
            {symptoms.map((symptom) => {
              return (
                <div>
                  <p> {symptom.name}</p>
                  <button
                    onClick={() => this.props.deleteSymptomThunk(symptom)}
                  >
                    X
                  </button>
                </div>
              );
            })}
            <form onSubmit={handleSubmit}>
              <label htmlFor='firstName'>First Name:</label>
              <input
                name='firstName'
                onChange={handleChange}
                value={firstName}
              />
              <label htmlFor='lastName'>Last Name:</label>
              <input name='lastName' onChange={handleChange} value={lastName} />
              <label htmlFor='dob'>Date of Birth:</label>
              <input name='dob' onChange={handleChange} value={dob} />
              <label htmlFor='age'>Age:</label>
              <input name='age' onChange={handleChange} value={age} />
              <label htmlFor='location'>Location:</label>
              <input name='location' onChange={handleChange} value={location} />
              <button type='submit'>Submit</button>
            </form>
            <form onSubmit={handlePost}>
              <label htmlFor='symptom'>Symptoms:</label>
              <input name='symptom' onChange={handleChange} value={symptom} />
              <button type='submit'>Submit Change</button>
            </form>
          </div>
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
      </div>
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
