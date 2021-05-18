import axios from "axios";

//action type
const TOKEN = "token";
const GET_DOCTOR = "GET_DOCTOR";

//action creator
export const getDoctor = (doctor) => {
  return {
    type: GET_DOCTOR,
    doctor,
  };
};

//thunk creator
export const fetchDoctor = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/doctors/${id}`);
      dispatch(getDoctor(data));
    } catch (err) {
      console.log("There was a error in fetching your data");
    }
  };
};

//initial state
const initialState = {};

export default function singleDoctor(state = initialState, action) {
  switch (action.type) {
    case GET_DOCTOR:
      return action.doctor;

    default:
      return state;
  }
}
