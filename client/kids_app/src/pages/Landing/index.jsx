import React from "react";
import "./style.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Landing = () => {
  const [text] = useTypewriter({
    words: [
      "Hi, I'm Debo!",
      "Bonjour, Je m'appelle Debo!",
      "Hola, Me llamo Debo!",
      "Ciao, Mi chiamo Debo!",
    ],
    loop: {},
    typingDelay: 30, // Adjust this value to control the typing speed (lower is faster)
  });

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="section__padding" id="home">
          <div className="hero-content">
            <h1>TinyThreads</h1>
            <p>DONATE NOW | BUY NOW</p>
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
            I'm currently a second-year engineering student at the Schulich
            School of Engineering, pursuing a major in Software Engineering and
            a minor in Entrepreneurship and Enterprise Development. Some of my
            many interests include bionics/biotechnology, full-stack
            development, UI/UX design and business management. Through the next
            chapter in my life, I hope to further my contributions to the tech
            industry. Learn more about my contributions below!
          </p>
          <div className="about-rows">
            <p className="about-link">resume</p>
            <p className="about-link">linkedin</p>
            <p className="about-link">github</p>
          </div>
        </div>
        <div className="about-container"></div>
      </div>
    </div>
  );
};

export default Landing;
