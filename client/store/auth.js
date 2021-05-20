import axios from 'axios';
import history from '../history';

const TOKEN = 'token';
/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
const UPDATE_PATIENT = 'UPDATE_PATIENT';
const SET_DOCTOR = 'SET_DOCTOR';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const updatePatient = (patient) => {
  return {
    type: UPDATE_PATIENT,
    patient,
  };
};

export const setDoctor = (id, docDetails) => {
  return {
    type: SET_DOCTOR,
    id,
    docDetails,
  };
};
/**
 * THUNK CREATORS
 */

export const updatePatientThunk = (patient) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/patients/${patient.id}`, patient, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });
      dispatch(updatePatient(updated));
    } catch (error) {
      throw error;
    }
  };
};

export const updateDoctor = (id, docDetails) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      ////////////////////////////////////////////
      console.log('UpdateDoctor: hit the thunk here!');
      ////////////////////////////////////////////

      const { data } = await axios.put(`/api/users/${id}`, docDetails, {
        headers: { authorization: token },
      });

      ////////////////////////////////////////////
      console.log('dispatched the data', data);
      ////////////////////////////////////////////

      dispatch(setDoctor(id, data));
    } catch (err) {
      console.log('There was a error in updating your records');
    }
  };
};

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth({ ...res.data, performedAuth: true }));
  }
  return dispatch(setAuth({ performedAuth: true }));
};

export const authenticate = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/login`, { email, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError, performedAuth: true }));
  }
};

export const signup = (userInfo, metaInfo, metaType) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/signup/${metaType}`, { userInfo, metaInfo });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError, performedAuth: true }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: { performedAuth: true },
  };
};

/**
 * REDUCER
 */
export default function (state = { performedAuth: false }, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case UPDATE_PATIENT:
      return action.patient;

    case SET_DOCTOR:
      return action.docDetails;

    default:
      return state;
  }
}
