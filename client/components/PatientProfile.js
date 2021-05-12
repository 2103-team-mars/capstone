import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSymptoms } from '../store/symptoms';
import { fetchPatient } from '../store/patient';

export class PatientProfile extends Component {
  componentDidMount() {
    this.props.auth.metaType === 'patient'
      ? this.props.fetchSymptoms(this.props.auth.metaId)
      : this.props.fetchPatient(this.props.match.params.patientId);
  }
  render() {
    const symptoms = this.props.symptoms || [];
    return (
      <div>
        {this.props.auth.metaType === 'patient' ? (
          <div>
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
              return <p> {symptom.name}</p>;
            })}
          </div>
        ) : (
          <div>
            {this.props.patient.id && (
              <div>
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
                {/* Patient Medications:
                {this.props.patient.medications.map((medicine) => {
                  return <p> {medicine.name}</p>;
                })} */}
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
  };
};
export default connect(mapState, mapDispatch)(PatientProfile);
