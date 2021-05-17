import React from "react";
import { connect } from "react-redux";
import { me } from "../store/auth";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export class Home extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    console.log(this.props);
    const { auth, isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn && auth.metaType === "patient" ? (
          <div>
            <h3>
              Hi, {auth.firstName} {auth.lastName}, how can we help you today?
              <Link to={"/dashboard?index=2"}>
                Not feeling well? Update you symptoms
              </Link>
              <Link to={"/dashboard?index=0"}> Looking for a doctor?</Link>
              <Link to={"/dashboard?index=3"}> Check your medication</Link>
            </h3>
          </div>
        ) : (
          <div>
            <h3>Welcome</h3>
          </div>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Home);
