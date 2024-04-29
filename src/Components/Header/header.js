import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../utility/constants";
import { useLocation } from "react-router-dom";
import { window } from "globalthis/implementation";

const Header = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('authenticated');
    localStorage.removeItem('spotify_token');
    window.location.reload();
    // Or if you want to clear all local storage data
    // localStorage.clear();
    
    // Redirect to login page or home page after logout
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor: '#fff'}}>
        <div className="container-fluid">
          <Link to={ROUTE_PATHS.HOME} className="navbar-brand router_links project_name">
            MeloMood
          </Link>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto custom_header">
              <li
                className={`nav-item router_links ${
                  ROUTE_PATHS.HOME === pathName ? "active" : ""
                }`}
              >
                <Link to={ROUTE_PATHS.HOME} className={`nav-link text-dark ${
                  ROUTE_PATHS.HOME === pathName ? "active" : ""
                }`}>
                  Home
                </Link>
              </li>
              {/* <li
                className={`nav-item router_links ${
                  ROUTE_PATHS.CURRENT_MATCH === pathName ? "active" : ""
                }`}
              >
                <Link to={ROUTE_PATHS.CURRENT_MATCH} className={`nav-link text-dark ${
                  ROUTE_PATHS.CURRENT_MATCH === pathName ? "active" : ""
                }`}>
                  Current Trends
                </Link>
              </li> */}
              <li
                className={`nav-item router_links ${
                  ROUTE_PATHS.CAPTURE_EMOTIONS === pathName ? "active" : ""
                }`}
              >
                <Link to={ROUTE_PATHS.CAPTURE_EMOTIONS} className={`nav-link text-dark ${
                  ROUTE_PATHS.CAPTURE_EMOTIONS === pathName ? "active" : ""
                }`}>
                  Capture Your Emotion
                </Link>
              </li>
              <li
                className={`nav-item router_links ${
                  ROUTE_PATHS.SPOTIFY === pathName ? "active" : ""
                }`}
              >
                <Link to={ROUTE_PATHS.SPOTIFY} className={`nav-link text-dark ${
                  ROUTE_PATHS.SPOTIFY === pathName ? "active" : ""
                }`}>
                  Spotify
                </Link>
              </li>
              <li
                className={`nav-item router_links ${
                  ROUTE_PATHS.ABOUT_US === pathName ? "active" : ""
                }`}
              >
                <Link to={ROUTE_PATHS.ABOUT_US} className={`nav-link text-dark ${
                  ROUTE_PATHS.ABOUT_US === pathName ? "active" : ""
                }`}>
                  About Us
                </Link>
              </li>
              <li
                className={`nav-item router_links ${
                  ROUTE_PATHS.CONTACT === pathName ? "active" : ""
                }`}
              >
                <Link to={ROUTE_PATHS.CONTACT} className={`nav-link text-dark  ${
                  ROUTE_PATHS.CONTACT === pathName ? "active" : ""
                }`}>
                  Contact
                </Link>
              </li>
              <li className="nav-item router_links">
              <Link to={ROUTE_PATHS.LOGOUT} className="nav-link text-dark" onClick={handleLogout}>
                Logout
              </Link>
            </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
