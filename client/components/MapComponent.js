import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import { fetchDoctors } from '../store/googleMap';
import { useSelector, useDispatch } from 'react-redux';

const mapStyles = {
  height: '100vh',
  width: '90%',
  margin: '0 auto',
};

const MapComponent = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const doctors = useSelector((state) => state.mapDoctors);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    dispatch(fetchDoctors());
  }, []);

  const onSelect = (item) => {
    setSelected(item);
  };

  const center = {
    lat: auth.coordinates[0],
    lng: auth.coordinates[1],
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyA88BT_HAbFTCSu7jJOj8d5DvAw8m-as1Q">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={center}>
        {doctors.map((doctor) => {
          return (
            <Marker
              key={doctor.id}
              id={doctor.id}
              onClick={() => onSelect(doctor)}
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
        {selected.id && (
          <InfoWindow
            position={{
              lat: selected.user.coordinates[0],
              lng: selected.user.coordinates[1],
            }}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <div>
              <Link to={`/doctor/${selected.id}`}>
                <h1>{selected.user.firstName + ' ' + selected.user.lastName}</h1>
              </Link>
              <h1>{selected.user.location}</h1>
              <h1>{selected.user.email}</h1>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
