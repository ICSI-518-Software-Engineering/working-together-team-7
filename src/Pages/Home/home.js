import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../utility/constants";

// Home component containing a carousel with slides
const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 1;

  // Handles next slide action
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Handles previous slide action
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  // Renders a single carousel item with given index, heading, and content
  const renderCarouselItem = (index, heading, content) => {
    const isActive = activeIndex === index ? "active" : "";
    const carouselItemClass = `carousel-item carousel-image-${index + 1} ${isActive}`;

    return (
      <div className={carouselItemClass}>
        <div className="fade_layer">
          <div className="container">
            <div
              className="carousel-caption d-none d-sm-block mb-5"
              style={{ marginBottom: 150 }}
            >
              <h1 className="display-3">{heading}</h1>
              <p className="lead">{content}</p>
              <div
                className="container d-flex justify-content-center"
                style={{ paddingTop: 50, paddingRight: 200 }}
              >
                <Link
                  to={ROUTE_PATHS.CAPTURE_EMOTIONS}
                  className="btn custom_danger_color btn-lg"
                  style={{ marginRight: 10 }}
                >
                  Start Your Journey 
                </Link>
                {/* <Link
                  to={ROUTE_PATHS.CURRENT_MATCH}
                  className="btn custom_primary_color btn-lg"
                  style={{ marginLeft: 10 }}
                >
                   Upload a Photo
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}