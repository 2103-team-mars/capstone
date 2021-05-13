import axios from 'axios';

const initialState = {};

const GET_PATIENT = 'GET_PATIENT';

export const getPatient = (patient) => {
  return {
    type: GET_PATIENT,
    patient,
  };
};

export const fetchPatient = (id) => {
  return async (dispatch) => {
    try {
      const { data: patient } = await axios.get(`/api/patients/${id}`);
      dispatch(getPatient(patient));
    } catch (error) {
      throw error;
    }
  };
};

export default function patientReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT:
      return action.patient;
    default:
      return state;
  }
}
