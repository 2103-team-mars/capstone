import React from "react";
import { connect } from "react-redux";
import PatientDocProfile from "./PatientDocProfile";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { auth } = props;
  return (
    <div>
      <h3>
        Welcome, {auth.firstName} {auth.lastName},
      </h3>
      <div>
        <PatientDocProfile />
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState)(Home);
