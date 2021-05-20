import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import { fetchDoctors } from '../store/googleMap';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import { Box, Grid, Typography } from '@material-ui/core';

const specialtyOptions = [
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

const professionOptions = [
  { label: 'Therapist', value: 'Therapist' },
  { label: 'Psychologist', value: 'Psychologist' },
  { label: 'Psychiatrist', value: 'Psychiatrist' },
];

const mapStyles = {
  height: '600px',
  width: '90%',
  margin: '0 auto',
};

const MapComponent = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const doctors = useSelector((state) => state.mapDoctors);
  const [selected, setSelected] = useState({});

  const [professionFilter, setProfessionFilter] = useState([]);

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

  const filteredDoctors = doctors.filter((doc) => {
    if (professionFilter.length) {
      if (!professionFilter.some((profession) => profession.value === doc.profession.name))
        return false;
    }
    return true;
  });

  return (
    <Box>
      <Box my={2}>
        <Typography variant="h6" align="center">
          Apply Filters
        </Typography>
        <Grid container justify="center" spacing={2}>
          <Grid item md={3}>
            <Select
              isMulti={true}
              onChange={(professions) => setProfessionFilter(professions)}
              options={professionOptions}
              style={{ width: '80%' }}
              value={professionFilter}
              label="Professions"
            />
          </Grid>
        </Grid>
      </Box>

      <LoadScript googleMapsApiKey="AIzaSyA88BT_HAbFTCSu7jJOj8d5DvAw8m-as1Q">
        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={center}>
          {filteredDoctors.map((doctor) => {
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
                <h1>{selected.profession.name}</h1>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default MapComponent;
