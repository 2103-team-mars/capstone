import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDoctor } from '../store/singleDoctor';
import { updateSpecialties } from '../store/specialties';
import { updateDoctor } from '../store/auth';
import Select from 'react-select';

import { Box, Grid, Button, Typography, TextField } from '@material-ui/core';
import '../../public/styles/profiles.css';

const options = [
  { label: 'Anxiety', value: 'Anxiety' },
  { label: 'ADHD', value: 'ADHD' },
  { label: 'Bipolar disorder', value: 'Bipolar disorder' },
  { label: 'OCD', value: 'OCD' },
  { label: 'PTSD', value: 'PTSD' },
  { label: 'Psychosis', value: 'Psychosis' },
  { label: 'Schizophrenia', value: 'Schizophrenia' },
  { label: 'Despression', value: 'Despression' },
  { label: 'Eating disorder', value: 'Eating disorder' },
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
  }

  selectHandler(specialties) {
    this.setState({ specialties });
  }

  async handleSubmit() {
    event.preventDefault();

    const { id } = this.props.auth;
    const docId = this.props.singleDoc.id;

    const { firstName, lastName, location } = this.state;
    const { specialties } = this.state;

    await this.props.updateDoctor(id, { firstName, lastName, location });
    await this.props.updateSpecialties(id, specialties);

    this.setState(this.initialState);

    this.props.fetchDoctor(docId);
    this.forceUpdate();
    this.props.closeForm();
  }

  render() {
    const { firstName, lastName, location, specialties } = this.state;
    const { changeHandler } = this;

    return (
      <form onSubmit={this.handleSubmit} style={{ height: '100%' }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ height: '100%' }}
          className="child-spacing"
          wrap="nowrap"
        >
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={changeHandler}
            required
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={changeHandler}
            required
          />
          <TextField
            id="location"
            name="location"
            label="Address"
            variant="outlined"
            fullWidth
            value={location}
            onChange={changeHandler}
            required
          />
          <Box width="90%">
            <Typography>Specializations</Typography>
            <Select
              isMulti={true}
              onChange={this.selectHandler}
              options={options}
              style={{ width: '90%' }}
            />
          </Box>
          <Button type="submit" variant="outlined">
            Save Changes
          </Button>
        </Grid>
      </form>
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
    updateSpecialties: (id, specialties) => dispatch(updateSpecialties(id, specialties)),
    fetchDoctor: (docId) => dispatch(fetchDoctor(docId)),
  };
};

export default connect(mapState, mapDispatch)(EditDocProfile);
