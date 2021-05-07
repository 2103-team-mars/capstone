import axios from 'axios';

const initialState = [];

const GET_DOCTORS = 'GET_DOCTORS';

export const getDoctors = (doctors) => {
  return {
    type: GET_DOCTORS,
    doctors,
  };
};

export const fetchDoctors = () => {
  return async (dispatch) => {
    try {
      const { data: doctors } = await axios.get('/api/doctors');
      dispatch(getDoctors(doctors));
    } catch (error) {
      throw error;
    }
  };
};

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOCTORS:
      return action.doctors;
    default:
      return state;
  }
}
