import axios from "axios";

//action type
const TOKEN = "token";
const GET_DOCTOR = "GET_DOCTOR";
const SET_SPECIALTIES = "SET_SPECIALTIES";

//action creator
export const getDoctor = (doctor) => {
  return {
    type: GET_DOCTOR,
    doctor,
  };
};

export const setDoctor = (id, docDetails) => {
  return {
    type: SET_DOCTOR,
    id,
    docDetails,
  };
};
export const setSpecialties = (id, specialties) => {
  return {
    type: SET_DOCTOR,
    id,
    specialties,
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

export const updateDoctor = (id, docDetails) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      ////////////////////////////////////////////
      console.log("UpdateDoctor: hit the thunk here!");
      ////////////////////////////////////////////

      const { data } = await axios.put(`/api/users/${id}`, docDetails, {
        headers: { authorization: token },
      });

      ////////////////////////////////////////////
      console.log("dispated the data", data);
      ////////////////////////////////////////////

      dispatch(setDoctor(id, data));
    } catch (err) {
      console.log("There was a error in updating your records");
    }
  };
};

export const updateSpecialties = (id, specialties) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      ////////////////////////////////////////////
      console.log("updateSpecialtiess: hit the thunk here!");
      ////////////////////////////////////////////

      const { data: specialties } = await axios.put(
        " /api/specialty",
        specialties,
        { headers: { authorization: token } }
      );
      dispatch(setSpecialties(id, specialties));
    } catch (err) {
      console.log("There was a error in updating your specialties");
    }
  };
};

//initial state
const initialState = {};

export default function singleDoctor(state = initialState, action) {
  switch (action.type) {
    case GET_DOCTOR:
      return action.doctor;
    case SET_DOCTOR:
      return action.docDetails;

    case SET_SPECIALTIES:
      return { ...state, specialties: action.specialties };

    default:
      return state;
  }
}
