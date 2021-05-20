import React, { Component } from 'react';
import { fetchDoctor } from '../store/singleDoctor';
import { connect } from 'react-redux';
import DocAppointments from './appointments/DocAppointments';
import EditDocProfile from './EditDocProfile';

export class DocDocProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  componentDidMount() {
    const docId = this.props.auth.metaId;
    this.props.fetchDoctor(docId);
    this.setState({
      showComponent: false,
    });
  }

  onButtonClick() {
    this.setState({
      showComponent: !this.state.showComponent,
    });
  }

  render() {
    const {
      profilePicture,
      firstName,
      lastName,
      location,
      email,
      meta: { profession },
    } = this.props.auth;

    const specialties = this.props.singleDoc.specialties || [];

    return (
      <div>
        <div>
          <img src={profilePicture} />
          <h2>{`${firstName} ${lastName}`}</h2>
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
          <button onClick={this.onButtonClick}>Edit Profile</button>
          {this.state.showComponent ? <EditDocProfile closeForm={this.onButtonClick} /> : null}
        </div>

        <hr />
        <div>
          <h2>My Appointment Schedule</h2>
          <DocAppointments />
        </div>
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
    fetchDoctor: (docId) => dispatch(fetchDoctor(docId)),
  };
};

export default connect(mapState, mapDispatch)(DocDocProfile);
