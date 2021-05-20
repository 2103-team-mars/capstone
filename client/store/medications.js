import axios from 'axios';

const initialState = [];

const GET_MEDICATIONS = 'GET_MEDICATIONS';
const POST_MEDICATION = 'POST_MEDCIATION';

export const getMedications = (medications) => {
  return {
    type: GET_MEDICATIONS,
    medications,
  };
};
export const postMedications = (medication) => {
  return {
    type: POST_MEDICATION,
    medication,
  };
};
export const postMedicationsThunk = (medication) => {
  return async (dispatch) => {
    try {
      const created = (
        await axios.post('/api/medications', medication, {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        })
      ).data;
      dispatch(postSymptom(created));
    } catch (error) {
      throw error;
    }
  };
};

export const fetchMedications = (id) => {
  return async (dispatch) => {
    try {
      const { data: medications } = await axios.get(
        `/api/medications/patients/${id}`
      );
      dispatch(getMedications(medications));
    } catch (error) {
      throw error;
    }
  };
};

export default function medicationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MEDICATIONS:
      return action.medications;
    case POST_MEDICATION:
      return [...state, action.medication];
    default:
      return state;
  }
}
