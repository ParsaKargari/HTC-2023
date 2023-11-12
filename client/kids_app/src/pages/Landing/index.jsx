import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./style.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import infinity from "../../assets/infinity.png";
import eye_world from "../../assets/eye_world.png";
import no_bad from "../../assets/no_bad.png";

const Landing = () => {
  const [navigate, setNavigate] = useState(false);
  const [destination, setDestination] = useState("");

  const [text] = useTypewriter({
    words: [
      "Our mission",
      "Notre mission",
      "La nostra missione",
      "自分たちの使命",
      " رسالت ما",
      "Nuestra misión",
    ],
    loop: {},
    typingDelay: 30, // Adjust this value to control the typing speed (lower is faster)
  });

  const handleNavigate = (path) => {
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
              <h3>"Dressing the Future"</h3>
              <button onClick={() => handleNavigate("/donate")}>
                DONATE NOW
              </button>
              <button onClick={() => handleNavigate("/buynow")}>BUY NOW</button>
            </div>
          </div>
        </div>

        <div className="scroll-down"></div>

        {/* About Section */}
        <div className="about">
          <div className="about-heading">
            <h1>
              <span>{text}</span>
              <span>
                <Cursor />
              </span>
            </h1>
            <p>
              At TinyThreads, we're dedicated to minimizing consumer waste by
              connecting families through the simple act of recycling baby
              clothes. Instead of letting used items go to waste, we facilitate
              a marketplace where parents can buy and sell gently-used baby
              clothes. This not only reduces environmental impact but also
              allows families to contribute to a sustainable and circular
              economy. Choose TinyThreads for an eco-friendly approach to
              parenting that benefits both your wallet and the planet.
            </p>
            <div className="about-rows"></div>
          </div>
          <div className="about-container"></div>
        </div>
        {/* Footer Section */}
        <div id="footer" className="footer">
          <div className="sustainable-goals">
            <h3>Our Sustainable Objectives</h3>
          </div>
          <div className="social-icons-wrapper ">
            <a
              href="https://www.un.org/sustainabledevelopment/inequality/"
              target="_blank"
              className="social-link facebook-link w-inline-block icon-link"
            >
              <img src={no_bad} className="footer-image" alt="" />
            </a>
            <div className="footer-divider"></div>
            <a
              href="https://www.un.org/sustainabledevelopment/sustainable-consumption-production/"
              target="_blank"
              className="social-link facebook-link w-inline-block icon-link"
            >
              <img src={infinity} alt="logo" className="footer-image" />
            </a>
            <div className="footer-divider"></div>
            <a
              href="https://www.un.org/sustainabledevelopment/climate-change/"
              target="_blank"
              className="social-link facebook-link w-inline-block icon-link"
            >
              <img src={eye_world} className="footer-image" alt="" />
            </a>
            <div className="footer-divider"></div>
          </div>
        </div>
      </div>
    );
  }
};

export default Landing;
