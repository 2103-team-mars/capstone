import React, { Component } from "react";
import fetchDoctor from "../store/singleDoctor";
import { connect } from "react-redux";

export class PatientDocProfile extends Component {
  render() {
    return (
      <div>
        <p>This the Patient Doc Profile Component</p>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleDoc: state.singleDoctor,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchDoctor: (id) => dispatch(fetchDoctor(id)),
  };
};

export default connect(mapState, mapDispatch)(PatientDocProfile);
