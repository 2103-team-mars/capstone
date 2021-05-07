import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react';

import React, { Component } from 'react';
import { fetchDoctors } from '../store/googleMap';
import { connect } from 'react-redux';

export class MapComponent extends Component {
  componentDidMount() {
    this.props.fetchDoctors();
  }
  render() {
    const { google, auth, doctors } = this.props;
    return (
      <div>
        <Map
          google={google}
          initialCenter={{ lat: 37.4221, lng: -122.0841 }}
          center={
            auth.id
              ? {
                  lat: auth.coordinates[0],
                  lng: auth.coordinates[1],
                }
              : { lat: 37.4221, lng: -122.0841 }
          }
        >
          {doctors.map((doctor) => {
            return (
              <Marker
                name={doctor.name}
                position={{
                  lat: doctor.coordinates[0],
                  lng: doctor.coordinates[1],
                }}
              />
            );
          })}
        </Map>
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
