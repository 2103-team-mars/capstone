import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import AboutUs from "./AboutUs";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>Hello Health</h1>
    {/* <img src={image} height={100} width={100} /> */}
    <nav>
      {isLoggedIn ? (
        <div>
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/meeting">Meeting</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/aboutus">About Us</Link>
        </div>
      ) : (
        <div>
          <Link to="/auth">Login</Link>
          <Link to="/home">Home</Link>
          <Link to="/aboutus">About Us</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
