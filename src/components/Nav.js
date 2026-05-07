import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMusic,
  faMoon,
  faSearch,
  faSignOutAlt,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/logo.png";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

const Nav = ({ libraryStatus, onLibraryToggle, onBrowserOpen }) => {
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const menuId = "primary-nav-menu";

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleBrowse = () => {
    onBrowserOpen();
    closeMenu();
  };

  const handleLibraryToggle = () => {
    onLibraryToggle();
    closeMenu();
  };

  const handleThemeToggle = () => {
    toggleTheme();
    closeMenu();
  };

  const handleLogout = async () => {
    try {
      setLogoutError("");
      closeMenu();
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
      <div className="nav-actions" aria-label="Primary actions">
        <button
          type="button"
          className="nav-action"
          onClick={handleBrowse}
          aria-label="Browse songs"
        >
          <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
          <span>Browse</span>
        </button>
        <button
          type="button"
          className={`nav-action ${libraryStatus ? "active" : ""}`}
          onClick={handleLibraryToggle}
          aria-expanded={libraryStatus}
          aria-controls="library-panel"
          aria-label={libraryStatus ? "Close library" : "Open library"}
        >
          <FontAwesomeIcon icon={faMusic} aria-hidden="true" />
          <span>Library</span>
        </button>
        <button
          type="button"
          className="nav-action desktop-only"
          onClick={handleThemeToggle}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} aria-hidden="true" />
          <span>{darkMode ? "Light mode" : "Dark mode"}</span>
        </button>
        <button
          type="button"
          className="nav-action desktop-only danger"
          onClick={handleLogout}
          title={currentUser?.email || "Signed in"}
        >
          <FontAwesomeIcon icon={faSignOutAlt} aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>
      <div className="button-container" ref={menuRef}>
        <button
          type="button"
          className={`menu-trigger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen((status) => !status)}
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          aria-haspopup="true"
        >
          <span>Menu</span>
          <FontAwesomeIcon icon={faBars} aria-hidden="true" />
        </button>
        {isMenuOpen && (
          <div className="nav-menu" id={menuId} aria-label="Primary menu">
            <button
              type="button"
              className="nav-menu-item"
              onClick={handleThemeToggle}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} aria-hidden="true" />
              <span>{darkMode ? "Light mode" : "Dark mode"}</span>
            </button>
            <button
              type="button"
              className="nav-menu-item danger"
              onClick={handleLogout}
              title={currentUser?.email || "Signed in"}
            >
              <FontAwesomeIcon icon={faSignOutAlt} aria-hidden="true" />
              <span>Logout</span>
            </button>
          </div>
        )}
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
