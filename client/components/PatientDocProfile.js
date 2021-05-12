import React, { Component } from "react";
import fetchDoctor from "../store/singleDoctor";
import { connect } from "react-redux";

export class PatientDocProfile extends Component {
  componentDidMount() {
    const { docId } = Number(this.props.match.params);
    this.props.fetchDoctor(docId);
  }
  render() {
    console.log("this.props from RENDER ---->>>>", this.props);
    const {singleDoc} = this.props

    return (
      <div>
        <p>This the Patient Doc Profile Component</p>
        <div>
          <
        </div>
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
    fetchDoctor: (docId) => dispatch(fetchDoctor(docId)),
  };
};

export default connect(mapState, mapDispatch)(PatientDocProfile);
