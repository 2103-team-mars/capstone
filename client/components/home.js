import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAppointments } from "../store/appointments";
import { getDateString } from "../utils/dateUtils";
import Doctor from "../SVG/doctor";
import SingleDoctor from "../SVG/singleDoctor";
import Meeting from "../SVG/Meeting";
import Icon from "../SVG/PatientWelcome";

/**
 * COMPONENT
 */
export class Home extends React.Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.fetchAppointments(
        this.props.auth.metaType === "doctor",
        this.props.auth.metaId
      );
    }
  }
  render() {
    const { auth, isLoggedIn } = this.props;

    if (!isLoggedIn) {
      return (
        <div>
          <h3>Welcome</h3>

          <Link to="/auth">Get Started!</Link>
          <Meeting />
        </div>
      );
    } else {
      return (
        <div className="home">
          {auth.metaType === "patient" ? (
            <div>
              <h3>
                Hi, {auth.firstName} {auth.lastName}, how can we help you today?
              </h3>
              {this.props.appointments.length ? (
                <h3>
                  your upcoming appointment{" "}
                  {getDateString(this.props.appointments[0].date)}
                </h3>
              ) : (
                <h3>You have no upcomming appointments</h3>
              )}

              <Link to={"/dashboard?index=1"}>
                Not feeling well? Update you symptoms
              </Link>
              <Link to={"/dashboard?index=0"}> Looking for a doctor?</Link>
              <Link to={"/dashboard?index=2"}> Check your medication</Link>
              <Icon />
            </div>
          ) : (
            <div>
              <h3>
                Hi, {auth.firstName} {auth.lastName}, how can we help you today?
              </h3>
              {this.props.appointments.length ? (
                <h3>
                  your upcoming appointment{" "}
                  {getDateString(this.props.appointments[0].date)}
                </h3>
              ) : (
                <h3>You have no upcomming appointments</h3>
              )}

              <Link to={"/dashboard?index=1"}>
                Checkout your upcoming appointments
              </Link>
              <SingleDoctor />
            </div>
          )}
        </div>
      );
    }
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
    appointments: state.appointments,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAppointments: (isDoctor, id) =>
      dispatch(fetchAppointments(isDoctor, id)),
  };
};

export default connect(mapState, mapDispatch)(Home);
