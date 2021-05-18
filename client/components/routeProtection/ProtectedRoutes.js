import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PatientRoute = (props) => {
  const auth = useSelector((state) => state.auth);

  if (auth.metaType !== 'patient') {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

export const DoctorRoute = (props) => {
  const auth = useSelector((state) => state.auth);

  if (auth.metaType !== 'doctor') {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};
