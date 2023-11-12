import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./style.css";

const Landing = () => {
  const [navigate, setNavigate] = useState(false);
  const [destination, setDestination] = useState("");

  const handleNavigate = (path) => {
    // Your authentication logic goes here
    // For now, let's assume it always passes
    if (true) {
      setDestination(path);
      setNavigate(true);
    }
  };

  if (navigate) {
    return <Navigate to={destination} />;
  } else {
    return (
      <div>
        {/* Hero Section */}
        <div className="hero">
          <div className="section__padding" id="home">
            <div className="hero-content">
              <h1>TinyThreads</h1>
              <button onClick={() => handleNavigate("/donate")}>
                DONATE NOW
              </button>
              <button onClick={() => handleNavigate("/buynow")}>BUY NOW</button>
            </div>
          </div>
        </div>

        {/* About Section */}
        {/* ... (the rest of your component) */}
      </div>
    );
  }
};

export default Landing;
