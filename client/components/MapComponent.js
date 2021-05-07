import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react';

import React, { Component } from 'react';
import { fetchDoctors } from '../store/googleMap';
import { connect } from 'react-redux';

export class MapComponent extends Component {
  componentDidMount() {
    this.props.fetchDoctors();
  }
  render() {
    console.log(this.props);
    const { google } = this.props;
    return (
      <div>
        <Map google={google} />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    doctors: state.mapDoctors,
  };
};
const mapDispatch = (dispatch) => ({
  fetchDoctors: () => dispatch(fetchDoctors()),
});

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA88BT_HAbFTCSu7jJOj8d5DvAw8m-as1Q',
})(connect(mapState, mapDispatch)(MapComponent));
