import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/logo.png";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav>
      <div className="logo-container">
        <img src={Logo} style={{ width: 60 }} alt="Chill Vibes Logo" />
        <span className="app-name">Chill Vibes</span>
      </div>
      <div className="button-container">
        <ThemeToggle />
        <button onClick={() => setLibraryStatus(!libraryStatus)}>
          Library
          <FontAwesomeIcon icon={faMusic} style={{ marginLeft: 5 }} />
        </button>
        {currentUser ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginLeft: 5 }} />
          </button>
        ) : (
          <button onClick={() => history.push("/login")} className="login-btn">
            Login
            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginLeft: 5 }} />
          </button>
        )}
      </div>
    </nav>
  );
};

Nav.propTypes = {
  libraryStatus: PropTypes.bool.isRequired,
  setLibraryStatus: PropTypes.func.isRequired,
};

export default Nav;
