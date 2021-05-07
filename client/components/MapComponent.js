import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import React, { Component } from 'react';

export default class MapComponent extends Component {
  render() {
    return (
      <div>
        <GoogleMap />
      </div>
    );
  }
}
