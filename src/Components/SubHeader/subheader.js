import React from 'react';
import { ROUTE_PATHS } from '../../utility/constants';
import { useLocation } from "react-router-dom";

const SubHeader = () => {
    const location = useLocation();
    const pathName = location.pathname;

    const getHeaderTitle = () => {
        if (ROUTE_PATHS.CAPTURE_EMOTIONS === pathName) {
          return <h1>Capture Your Emotion</h1>;
        } else if (ROUTE_PATHS.FAVOURITES === pathName) {
          return <h1>Favourites</h1>;
        } else if (ROUTE_PATHS.CURRENT_MATCH === pathName) {
          return <h1>Current Trends</h1>;
        } else if (ROUTE_PATHS.CONTACT === pathName) {
          return <h1>Contact Us</h1>;
        } else if (ROUTE_PATHS.ABOUT_US === pathName) {
          return <h1>About Us</h1>;
        } else if (ROUTE_PATHS.SPOTIFY === pathName) {
          return <h1>Spotify</h1>;
        } else {
          return <h1>Logout</h1>;
        }
      };
    
      const getHeaderCaptions = () => {
        if (ROUTE_PATHS.CAPTURE_EMOTIONS === pathName) {
          return "Upload your photo or use your webcam to let MeloMood capture your current emotion. Our sophisticated FER system will analyze your facial expression and curate a music playlist that aligns with your mood.";
        } else if (ROUTE_PATHS.FAVOURITES === pathName) {
          return "Curate your trend haven. Save, access, and share your favorites.";
        } else if (ROUTE_PATHS.CURRENT_MATCH === pathName) {
          return "Explore the latest buzz! Stay updated and inspired.";
        } else if (ROUTE_PATHS.CONTACT === pathName) {
          return "Reach Out to Our Friendly Team: We're Here to Help!";
        } else if (ROUTE_PATHS.ABOUT_US === pathName) {
          return "Tuning into Emotions with Technology and Music";
        } else if (ROUTE_PATHS.DOCUMENTATION === pathName) {
          return "Documentation";
        }
      };
      
    return (
        ROUTE_PATHS.HOME === pathName ? null : (
            <header id="page-header">
              <div className="fade_layer">
                <div className="container" style={{paddingTop: '50px'}}>
                  <div className="row">
                    <div className="col-md-6 m-auto text-center">
                      {getHeaderTitle()}
                      <p>
                      {getHeaderCaptions()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          )
    )
}

export default SubHeader;