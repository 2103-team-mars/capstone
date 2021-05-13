import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAppointments,
  deleteAppointment,
  leaveAppointment,
} from "../store/appointments";
import { Link } from "react-router-dom";

const MyAppointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAppointments(auth.metaType === "doctor", auth.metaId));
  }, [auth]);

  const cancelAppointment = (id) => {
    dispatch(leaveAppointment(id, false));
  };

  const removeAppointment = (id) => {
    dispatch(deleteAppointment(id));
  };

  const filledAppointments = appointments.filter((appt) => {
    return (auth.metaType === "doctor" && appt.patient) || appt.doctor;
  });

  return (
    <div>
      {filledAppointments.map((appt) => (
        <div key={appt.id}>
          {auth.metaType === "doctor" ? (
            <div>
              <p>
                <Link to={`/patients/${appt.patient.id}`}>
                  {appt.patient.user.firstName +
                    " " +
                    appt.patient.user.lastName}
                </Link>
              </p>
              <p>
                {new Date(appt.date).toLocaleString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour12: true,
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
              <p>{appt.topic}</p>
              <button onClick={() => removeAppointment(appt.id)}>Remove</button>
            </div>
          ) : (
            <div>
              <p>
                <Link to={`/doctor/${appt.doctor.id}`}>
                  {appt.doctor.user.firstName + " " + appt.doctor.user.lastName}
                </Link>
              </p>
              <p>
                {new Date(appt.date).toLocaleString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour12: true,
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
              <p>{appt.doctor.user.location}</p>
              <button onClick={() => cancelAppointment(appt.id)}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;
