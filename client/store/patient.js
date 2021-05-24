import axios from 'axios';

const initialState = {};

const GET_PATIENT = 'GET_PATIENT';
const POST_MEDICATION = 'POST_MEDCIATION';

export const getPatient = (patient) => {
  return {
    type: GET_PATIENT,
    patient,
  };
};
export const postMedications = (medication) => {
  return {
    type: POST_MEDICATION,
    medication,
  };
};
export const postMedicationsThunk = (id, medication) => {
  return async (dispatch) => {
    try {
      const created = (
        await axios.post(`/api/medications/${id}`, medication, {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        })
      ).data;
      dispatch(postMedications(created));
    } catch (error) {
      throw error;
    }
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
    case POST_MEDICATION:
      return {
        ...state,
        medications: [...state.medications, action.medication],
      };
    default:
      return state;
  }
}
