import React from "react";
import { connect } from "react-redux";
import { me } from "../store/auth";
import { Link } from "react-router-dom";
import { fetchAppointments } from "../store/appointments";

/**
 * COMPONENT
 */
export class Home extends React.Component {
  componentDidMount() {
    // if (this.props.isLoggedIn) {
    //   this.props.fetchAppointments(
    //     this.props.auth.metaType === 'doctor',
    //     this.props.auth.metaId
    //   );
    // }
  }
  render() {
    // console.log(this.props);
    const { auth, isLoggedIn } = this.props;

    if (!isLoggedIn) {
      return (
        <div>
          <h3>Welcome</h3>

          <Link to="/auth">Get Started!</Link>
        </div>
      );
    } else {
      return (
        <div>
          {auth.metaType === "patient" ? (
            <div>
              <h3>
                Hi, {auth.firstName} {auth.lastName}, how can we help you today?
              </h3>
              {/* {this.props.appointments.length ? (
                <h3>
                  your upcoming appointment{' '}
                  {new Date(this.props.appointments[0].date).toLocaleString(
                    undefined,
                    {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour12: true,
                      hour: 'numeric',
                      minute: 'numeric',
                    }
                  )}
                </h3>
              ) : (
                <h3>You have no upcomming appointments</h3>
              )} */}

              <Link to={"/dashboard?index=2"}>
                Not feeling well? Update you symptoms
              </Link>
              <Link to={"/dashboard?index=0"}> Looking for a doctor?</Link>
              <Link to={"/dashboard?index=3"}> Check your medication</Link>
            </div>
          ) : (
            <div>
              <h3>
                Hi, {auth.firstName} {auth.lastName}, how can we help you today?
              </h3>
              {/* {this.props.appointments.length ? (
                <h3>
                  your upcoming appointment{' '}
                  {new Date(this.props.appointments[0].date).toLocaleString(
                    undefined,
                    {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour12: true,
                      hour: 'numeric',
                      minute: 'numeric',
                    }
                  )}
                </h3>
              ) : (
                <h3>You have no upcomming appointments</h3>
              )} */}

              <Link to={"/dashboard?index=2"}>
                Checkout your upcoming appointments
              </Link>
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
    loadInitialData: () => dispatch(me()),
    // fetchAppointments: (isDoctor, id) =>
    //   dispatch(fetchAppointments(isDoctor, id)),
  };
};

export default connect(mapState, mapDispatch)(Home);
