import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./style.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";

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
              <button onClick={() => handleNavigate("/donate")}>
                DONATE NOW
              </button>
              <button onClick={() => handleNavigate("/buynow")}>BUY NOW</button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="about section__margin" id="about">
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
          <div className="social-icons-wrapper">
            <a
              href="https://www.facebook.com/lethbridgehsiGEM/"
              target="_blank"
              className="social-link facebook-link w-inline-block icon-link">
              <img
                src="https://static.igem.wiki/teams/4599/wiki/facebook-logo.png"
                width="288"
                sizes="(max-width: 479px) 20vw, (max-width: 767px) 19vw, (max-width: 991px) 20vw, 16vw"
                alt=""
              />
            </a>
            <div className="footer-divider"></div>
            <a
              href="https://twitter.com/lethhs_igem?lang=en"
              target="_blank"
              className="social-link twitter-link w-inline-block icon-link">
              <img
                src="https://static.igem.wiki/teams/4599/wiki/x-logo.png"
                width="288"
                sizes="(max-width: 479px) 20vw, (max-width: 767px) 19vw, (max-width: 991px) 20vw, 16vw"
                alt=""
              />
            </a>
            <div className="footer-divider"></div>
            <a
              href="https://www.instagram.com/lethbridgehsigem/"
              target="_blank"
              className="social-link instagram-link w-inline-block icon-link">
              <img
                src="https://static.igem.wiki/teams/4599/wiki/instagram-logo.png"
                width="288"
                sizes="(max-width: 479px) 20vw, (max-width: 767px) 19vw, (max-width: 991px) 20vw, 16vw"
                alt=""
              />
            </a>
            <div className="footer-divider"></div>
            <a
              href="https://www.tiktok.com/@lethbridgehsigem"
              target="_blank"
              className="social-link tik-tok-link w-inline-block icon-link">
              <img
                src="https://static.igem.wiki/teams/4599/wiki/tik-tok-logo.png"
                width="288"
                sizes="(max-width: 479px) 20vw, (max-width: 767px) 19vw, (max-width: 991px) 20vw, 16vw"
                alt=""
              />
            </a>
            <div className="footer-divider"></div>
            <a
              href="https://gitlab.igem.org/2023/lethbridgehs/-/tree/main/"
              target="_blank"
              className="social-link gitlab-link w-inline-block icon-link">
              <img
                src="https://static.igem.wiki/teams/4599/wiki/gitlab-logo.png"
                width="288"
                sizes="(max-width: 479px) 20vw, (max-width: 767px) 19vw, (max-width: 991px) 20vw, 16vw"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default Landing;