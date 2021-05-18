import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react';
import { Router, Link } from 'react-router-dom';
import React, { Component } from 'react';
import { fetchDoctors } from '../store/googleMap';
import { connect } from 'react-redux';
import history from '../history';
import ReactDOM from 'react-dom';

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
    this.onInfoWindowOpen = this.onInfoWindowOpen.bind(this);
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

  onInfoWindowOpen() {
    ReactDOM.render(
      <div>
        <Router history={history}>
          <Link to={`/doctor/${this.state.selectedDoctor.id}`}>
            <h1>{this.state.selectedDoctor.name}</h1>
          </Link>
        </Router>

        <h1>{this.state.selectedDoctor.location}</h1>
        <h1>{this.state.selectedDoctor.email}</h1>
      </div>,
      document.getElementById('mapInfoWindow')
    );
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
          initialCenter={{
            lat: auth.coordinates[0],
            lng: auth.coordinates[1],
          }}
        >
          {doctors.map((doctor) => {
            return (
              <Marker
                key={doctor.id}
                id={doctor.id}
                onClick={this.onMarkerClick}
                name={doctor.user.firstName + ' ' + doctor.user.lastName}
                email={doctor.user.email}
                location={doctor.user.location}
                position={{
                  lat: doctor.user.coordinates[0],
                  lng: doctor.user.coordinates[1],
                }}
              />
            );
          })}
          <InfoWindow
            marker={this.state.activeMarker}
            onClose={this.onInfoWindowClose}
            visible={this.state.showingInfoWindow}
            onOpen={() => {
              this.onInfoWindowOpen();
            }}
          >
            <div id="mapInfoWindow" />
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
