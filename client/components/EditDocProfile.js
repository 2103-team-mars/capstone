import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateDoctor,
  updateSpecialties,
  fetchDoctor,
} from "../store/singleDoctor";
import Select from "react-select";

const options = [
  { label: "Anxiety", value: "Anxiety" },
  { label: "ADHD", value: "ADHD" },
  { label: "Bipolar disorder", value: "Bipolar disorder" },
  { label: "OCD", value: "OCD" },
  { label: "PTSD", value: "PTSD" },
  { label: "Psychosis", value: "Psychosis" },
  { label: "Schizophrenia", value: "Schizophrenia" },
  { label: "Despression", value: "Despression" },
  { label: "Eating disorder", value: "Eating disorder" },
];

export class EditDocProfile extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      firstName: this.props.auth.firstName,
      lastName: this.props.auth.lastName,
      location: this.props.auth.location,
      specialties: this.props.singleDoc.specialties,
    };
    this.state = this.initialState;
    this.changeHandler = this.changeHandler.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeHandler() {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  }

  selectHandler(specialties) {
    this.setState({ specialties });
    console.log(`specialties:`, specialties);
  }

  handleSubmit() {
    event.preventDefault();

    const { id } = this.props.auth;
    const { docId } = this.props.auth.meta.id;
    const { firstName, lastName, location } = this.state;
    const { specialties } = this.state;

    ///////////////////////////////
    console.log("this was submitted", { firstName, lastName, location });
    console.log("this was submitted----specialties", specialties);
    //////////////////////////////////////////

    this.props.updateDoctor(id, { firstName, lastName, location });
    //this.props.updateSpecialties(id, { specialties });

    this.setState(this.initialState);
    console.log("this was this.state----this.state", this.state);
    this.props.fetchDoctor(docId), this.forceUpdate();
  }

  render() {
    ////////////////////////////////////////////////
    console.log(
      "this.props from edit componenet =============>>>>>>>>",
      this.props
    );

    console.log(
      "this.state from edit componenet =============>>>>>>>>",
      this.state
    );

    ////////////////////////////////////////////////

    return (
      <div>
        <div>
          <h2>Edit Your Provider Profile Details</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h4>Profile Details</h4>

            <label htmlFor="firstName">
              <small>First Name: </small>
            </label>
            <input
              onChange={this.changeHandler}
              name="firstName"
              type="text"
              placeholder={this.state.firstName}
            />

            <label htmlFor="lastName">
              <small>Last Name: </small>
            </label>
            <input
              onChange={this.changeHandler}
              name="lastName"
              type="text"
              placeholder={this.state.lastName}
            />

            <label htmlFor="location">
              <small>Location: </small>
            </label>
            <input
              onChange={this.changeHandler}
              name="location"
              type="text"
              width="100px"
              placeholder={this.state.location}
            />
          </div>

          <h4>Specialization Details:</h4>
          <div>
            <p>Select all specializations</p>
            <Select
              isMulti={true}
              onChange={this.selectHandler}
              options={options}
            />
            <div>
              <button type="submit">Submit Updates</button>
            </div>
          </div>
        </form>
      </div>
    );
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
    updateDoctor: (id, docDetails) => dispatch(updateDoctor(id, docDetails)),
    updateSpecialties: (id, specialties) =>
      dispatch(updateSpecialties(id, specialties)),
    fetchDoctor: (docId) => dispatch(fetchDoctor(docId)),
  };
};

export default connect(mapState, mapDispatch)(EditDocProfile);
