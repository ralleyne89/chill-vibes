import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faSearch,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/logo.png";
import ThemeToggle from "./ThemeToggle";

const Nav = ({ libraryStatus, setLibraryStatus, setBrowserStatus }) => {
  return (
    <nav>
      <div className="logo-container">
        <img src={Logo} style={{ width: 60 }} alt="Chill Vibes Logo" />
        <span className="app-name">Chill Vibes</span>
      </div>
      <div className="button-container">
        <ThemeToggle />
        <button onClick={() => setBrowserStatus(true)}>
          Browse
          <FontAwesomeIcon icon={faSearch} style={{ marginLeft: 5 }} />
        </button>
        <button onClick={() => setLibraryStatus(!libraryStatus)}>
          Library
          <FontAwesomeIcon icon={faMusic} style={{ marginLeft: 5 }} />
        </button>
        <button className="logout-btn">
          Logout
          <FontAwesomeIcon icon={faSignOutAlt} style={{ marginLeft: 5 }} />
        </button>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  libraryStatus: PropTypes.bool.isRequired,
  setLibraryStatus: PropTypes.func.isRequired,
  setBrowserStatus: PropTypes.func.isRequired,
};

export default Nav;
