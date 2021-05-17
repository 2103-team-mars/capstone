import React, { Component } from "react";
import { fetchDoctor } from "../store/singleDoctor";
import { connect } from "react-redux";
import DocAppointments from "./DocAppointments";

export class DocDocProfile extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const docId = this.props.auth.metaId;
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
      const { profilePicture, firstName, lastName, location, email } =
        this.props.singleDoc.user;

      const { profession, specialties } = this.props.singleDoc;

      ////////////////////////////////////////////////////////////////////////////////////////////
      console.log("FROM RENDER this.props.auth ------>>>>>>", this.props.auth);
      console.log(
        "FROM RENDER this.props.singleDoc ------>>>>>>",
        this.props.singleDoc
      );
      console.log("specialties ------->>>>>", specialties);
      //////////////////////////////////////////////
      /////////////////////////////////////////

      return (
        <div>
          <div>
            <img src={profilePicture} />
            <h2>
              Dr. {firstName} {lastName}
            </h2>
            <h3>{profession.name}</h3>
            <div>
              <div>
                <strong>Contact Information:</strong>
                <div>Location: {location}</div>
                <div>Email: {email}</div>
              </div>
            </div>
            <div>
              <p>
                <strong>Specialization:</strong>
              </p>
              <div>
                {specialties.map((ele) => (
                  <p key={ele.id}>{ele.name}</p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <button>Edit Profile</button>
          </div>

          <hr />
          <div>
            <h2>My Appointment Schedule</h2>
            <DocAppointments
              doctorId={this.props.auth.metaId}
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
    auth: state.auth,
    singleDoc: state.singleDoctor,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchDoctor: (docId) => dispatch(fetchDoctor(docId)),
  };
};

export default connect(mapState, mapDispatch)(DocDocProfile);
