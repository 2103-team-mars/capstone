import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react';

import React, { Component } from 'react';
import { fetchDoctors } from '../store/googleMap';
import { connect } from 'react-redux';

export class MapComponent extends Component {
  constructor() {
    super();
    this.state = {
      activeMarker: {},
      selectedDoctor: {},
      showingInfoWindow: false,
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick(props, marker) {
    this.setState({
      activeMarker: marker,
      selectedDoctor: props,
      showingInfoWindow: true,
    });
  }

  onInfoWindowClose() {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });
  }

  onMapClicked() {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      });
  }
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
                onClick={this.onMarkerClick}
                name={doctor.name}
                email={doctor.email}
                location={doctor.location}
                position={{
                  lat: doctor.coordinates[0],
                  lng: doctor.coordinates[1],
                }}
              />
            );
          })}
          <InfoWindow
            marker={this.state.activeMarker}
            onClose={this.onInfoWindowClose}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedDoctor.name}</h1>
              <h1>{this.state.selectedDoctor.location}</h1>
              <h1>{this.state.selectedDoctor.email}</h1>
              <h1>{this.state.selectedDoctor.id}</h1>
            </div>
          </InfoWindow>
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
