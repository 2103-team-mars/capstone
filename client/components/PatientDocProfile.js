import React, { Component } from "react";
import { fetchDoctor } from "../store/singleDoctor";
import { connect } from "react-redux";
import DocAppointments from "./DocAppointments";

export class PatientDocProfile extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const docId = Number(this.props.match.params.docId);
    this.props.fetchDoctor(docId);
  }
  render() {
    if (!this.props.singleDoc.user) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      console.log("this.props from RENDER ---->>>>", this.props);

      const { profilePicture, firstName, lastName, location } =
        this.props.singleDoc.user;

      const { profession, specialties } = this.props.singleDoc;

      return (
        <div>
          <div>
            <img src={profilePicture} />
            <h2>
              Dr. {firstName} {lastName}
            </h2>
            <h3>{profession.name}</h3>
            <h3>{specialties.name}</h3>
            <p>{location}</p>
          </div>
          <hr />
          <div>
            <h2>View Appointment Availabilites</h2>
            <DocAppointments
              doctorId={this.props.match.params.docId}
              doctorFirstName={firstName}
              doctorLastName={lastName}
            />
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    singleDoc: state.singleDoctor,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchDoctor: (docId) => dispatch(fetchDoctor(docId)),
  };
};

export default connect(mapState, mapDispatch)(PatientDocProfile);
