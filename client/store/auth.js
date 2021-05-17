import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
const UPDATE_PATIENT = 'UPDATE_PATIENT';

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

/**
 * THUNK CREATORS
 */

export const updatePatientThunk = (patient) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(
        `/api/patients/${patient.id}`,
        patient,
        {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        }
      );
      dispatch(updatePatient(updated));
    } catch (error) {
      throw error;
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
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (email, password, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, { email, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case UPDATE_PATIENT:
      return action.patient;
    default:
      return state;
  }
}
