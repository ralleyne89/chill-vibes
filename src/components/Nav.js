import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faSearch,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/logo.png";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../contexts/AuthContext";

const Nav = ({ libraryStatus, onLibraryToggle, onBrowserOpen }) => {
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const [logoutError, setLogoutError] = useState("");

  const handleLogout = async () => {
    try {
      setLogoutError("");
      await logout();
      history.push("/login");
    } catch {
      setLogoutError("Could not log out. Please try again.");
    }
  };

  return (
    <nav aria-label="Primary">
      <div className="logo-container">
        <img src={Logo} alt="Chill Vibes Logo" />
        <span className="app-name">Chill Vibes</span>
      </div>
      <div className="button-container">
        <ThemeToggle />
        <button
          type="button"
          className="nav-action"
          onClick={onBrowserOpen}
          aria-label="Browse songs"
        >
          <span>Browse</span>
          <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="nav-action"
          onClick={onLibraryToggle}
          aria-expanded={libraryStatus}
          aria-controls="library-panel"
          aria-label={libraryStatus ? "Close library" : "Open library"}
        >
          <span>Library</span>
          <FontAwesomeIcon icon={faMusic} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
          title={currentUser?.email || "Signed in"}
        >
          <span>Logout</span>
          <FontAwesomeIcon icon={faSignOutAlt} aria-hidden="true" />
        </button>
      </div>
      {logoutError && <p className="nav-error">{logoutError}</p>}
    </nav>
  );
};

Nav.propTypes = {
  libraryStatus: PropTypes.bool.isRequired,
  onLibraryToggle: PropTypes.func.isRequired,
  onBrowserOpen: PropTypes.func.isRequired,
};

export default Nav;
