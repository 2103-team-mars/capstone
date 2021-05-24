import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ImmediateHelp from "./ImmediateHelp";

const Footer = () => (
  <div>
    <footer className="footerStyle">
      <hr />
      <strong>
        <p>
          If you are in a crisis or any other person may be in danger - don't
          use this application. <Link to="/help">These resources</Link> can
          provide you with immediate help.
        </p>
      </strong>
    </footer>
  </div>
);

export default Footer;
