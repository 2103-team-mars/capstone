import axios from 'axios';

const initialState = [];

const GET_SYMPTOMS = 'GET_SYMPTOMS';

export const getSymptoms = (symptoms) => {
  return {
    type: GET_SYMPTOMS,
    symptoms,
  };
};

export const fetchSymptoms = () => {
  return async (dispatch) => {
    try {
      const { data: symptoms } = await axios.get('/api/symptoms');
      dispatch(getSymptoms(symptoms));
    } catch (error) {
      throw error;
    }
  };
};

export default function symptomsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SYMPTOMS:
      return action.symptoms;
    default:
      return state;
  }
}
