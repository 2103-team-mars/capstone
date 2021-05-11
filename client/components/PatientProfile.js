import React, { Component } from 'react';
import { connect } from 'react-redux';

export class PatientProfile extends Component {
  render() {
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
  };
};
export default connect(mapState)(PatientProfile);
