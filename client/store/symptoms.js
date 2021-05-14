import axios from 'axios';

const initialState = [];

const GET_SYMPTOMS = 'GET_SYMPTOMS';
const POST_SYMPTOM = 'POST_SYMPTOM';

export const getSymptoms = (symptoms) => {
  return {
    type: GET_SYMPTOMS,
    symptoms,
  };
};
export const postSymptom = (symptom) => {
  return {
    type: POST_SYMPTOM,
    symptom,
  };
};

export const fetchSymptoms = (id) => {
  return async (dispatch) => {
    try {
      const { data: symptoms } = await axios.get(
        `/api/symptoms/patients/${id}`
      );
      dispatch(getSymptoms(symptoms));
    } catch (error) {
      throw error;
    }
  };
};
export const postSymptomThunk = (symptom) => {
  return async (dispatch) => {
    try {
      const created = (
        await axios.post('/api/symptoms', symptom, {
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

export default function symptomsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SYMPTOMS:
      return action.symptoms;
    case POST_SYMPTOM:
      return [...state, action.symptom];
    default:
      return state;
  }
}
