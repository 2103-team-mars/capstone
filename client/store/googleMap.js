import axios from 'axios';

initialState = []

const GET_DOCTORS = 'GET_DOCTORS';

export const getDoctors = (doctor) => {
  return {
    type: GET_DOCTORS,
    doctor,
  };
};

export const fetchDoctors = () => {
  try {
    const {data: doctors} = await axios.get('/api/doctors')
    dispatch(getDoctors(doctors))
  } catch (error) {
    throw(error)
  }
}

export default function mapReducer (state = initialState, action) {
  switch(action.type) {
    case GET_DOCTORS:
      return action.doctor
  }
}
