import axios from 'axios';

const initialState = [];

const GET_APPOINTMENTS = 'GET_APPOINTMENTS';
const NEW_APPOINTMENT = 'NEW_APPOINTMENT';
const REMOVE_APPOINTMENT = 'REMOVE_APPOINTMENT';

export const getAppointments = (appointments) => {
  return {
    type: GET_APPOINTMENTS,
    appointments,
  };
};

export const newAppointment = (appointment) => {
  return {
    type: NEW_APPOINTMENT,
    appointment,
  };
};

export const removeAppointment = (id) => {
  return {
    type: REMOVE_APPOINTMENT,
    id,
  };
};

export const fetchAppointments = (isDoctor, id) => {
  return async (dispatch) => {
    try {
      const { data: appointments } = await axios.get(
        `/api/appointments/${isDoctor ? 'doctors' : 'users'}/${id}`,
        {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        }
      );
      dispatch(getAppointments(appointments));
    } catch (error) {
      throw error;
    }
  };
};

export const createAppointment = (dateTime) => {
  return async (dispatch) => {
    try {
      const { data: appointment } = await axios.post(
        '/api/appointments',
        { dateTime },
        {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        }
      );
      dispatch(newAppointment(appointment));
    } catch (error) {
      throw error;
    }
  };
};

export const registerAppointment = (topic, id) => {
  return async (dispatch) => {
    try {
      const { data: appointment } = await axios.put(
        `/api/appointments/${id}`,
        { topic, join: true },
        {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        }
      );
      dispatch(newAppointment(appointment));
    } catch (error) {
      throw error;
    }
  };
};

export const deleteAppointment = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/appointments/${id}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });
      dispatch(removeAppointment(id));
    } catch (error) {
      throw error;
    }
  };
};

export const leaveAppointment = (id) => {
  return async (dispatch) => {
    try {
      await axios.put(
        `/api/appointments/${id}`,
        { join: false },
        {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        }
      );
      dispatch(removeAppointment(id));
    } catch (error) {
      throw error;
    }
  };
};

export default function appointmentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return action.appointments;
    case NEW_APPOINTMENT:
      return [...state, action.newAppointment];
    case REMOVE_APPOINTMENT:
      return state.filter((appointment) => appointment.id !== action.id);
    default:
      return state;
  }
}
