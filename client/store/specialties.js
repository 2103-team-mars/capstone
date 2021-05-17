import axios from "axios";

//action type
const TOKEN = "token";
const SET_SPECIALTIES = "SET_SPECIALTIES";

export const setSpecialties = (id, specialties) => {
  return {
    type: SET_DOCTOR,
    id,
    specialties,
  };
};

//thunk creator
export const updateSpecialties = (id, specialPayload) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      const specialties = specialPayload.map((ele) => ele.value);

      const { data } = await axios.put(" /api/specialty", specialties, {
        headers: { authorization: token },
      });
      dispatch(setSpecialties(id, data));
    } catch (err) {
      console.log("There was a error in updating your specialties");
    }
  };
};

//initial state
const initialState = [];

export default function specialties(state = initialState, action) {
  switch (action.type) {
    case SET_SPECIALTIES:
      return action.specialties;

    default:
      return state;
  }
}
