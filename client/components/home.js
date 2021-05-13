import React from "react";
import { connect } from "react-redux";
import DocDocProfile from "./DocDocProfile";

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
        <h1> TEST for DocDocProfile Component</h1>
        <DocDocProfile />
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
