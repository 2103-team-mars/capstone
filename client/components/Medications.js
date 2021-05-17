import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMedications } from '../store/medications';
import { fetchPatient } from '../store/patient';
import { Link } from 'react-router-dom';

export class Medications extends Component {
  componentDidMount() {
    this.props.fetchMedications(this.props.auth.metaId);
    // this.props.fetchPatient(this.props.auth.metaId);
  }
  render() {
    const medications = this.props.medications;
    return (
      <div>
        {medications.map((medication) => {
          return (
            <div key={medication.id}>
              <p>Name: {medication.name}</p>
              <p>Strength: {medication.strength}</p>
              <p>Company: {medication.company}</p>
              <p>Instructions: {medication.instructions}</p>
              <p>Reason: {medication.reason}</p>
              <p>
                Perscribing Doctor:
                <Link to={`/doctor/${medication.doctorId}`}>
                  {medication.doctor.user.firstName}{' '}
                  {medication.doctor.user.lastName}
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    medications: state.medications,
    auth: state.auth,
    patient: state.patient,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchMedications: (id) => dispatch(fetchMedications(id)),
    // fetchPatient: (id) => dispatch(fetchPatient(id)),
  };
};

export default connect(mapState, mapDispatch)(Medications);
