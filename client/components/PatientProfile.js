import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSymptoms } from '../store/symptoms';

export class PatientProfile extends Component {
  componentDidMount() {
    this.props.fetchSymptoms();
  }
  render() {
    const symptoms = this.props.symptoms || [];
    const realSymptoms = symptoms.symptoms || [];
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
            {realSymptoms.map((symptom) => {
              return <p> {symptom.name}</p>;
            })}
          </div>
        ) : (
          <div>
            <p>{this.props.auth.profilePicture}</p>
            <p>
              Name: {this.props.auth.firstName} {this.props.auth.lastName}
            </p>
            <p>Date of Birth: {this.props.auth.dob}</p>
            <p>Age: {this.props.auth.age}</p>
            <p>Email: {this.props.auth.email}</p>
            <p>Location: {this.props.auth.location}</p>
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSymptoms: () => dispatch(fetchSymptoms()),
  };
};
export default connect(mapState, mapDispatch)(PatientProfile);
