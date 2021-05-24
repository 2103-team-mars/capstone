import axios from 'axios';

const initialState = [];

const GET_MEDICATIONS = 'GET_MEDICATIONS';

export const getMedications = (medications) => {
  return {
    type: GET_MEDICATIONS,
    medications,
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

    default:
      return state;
  }
}
