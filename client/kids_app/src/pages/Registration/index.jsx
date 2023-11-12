import React, { useState } from "react";
import "./style.css";
import { Navigate } from "react-router-dom";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import logo from "../../assets/logo-noBackground.png";

const Registration = () => {
  const [navigate, setNavigate] = useState(false);
  const [name, setName] = useState('name');
  const [email, setEmail] = useState('email');
  const [password, setPassword] = useState('password');

  const handleNavigate = () => {
    setNavigate(true);
  };

  if (navigate) {
    return <Navigate to="/profile" />;
  } else {
    return (
      <div className="container">
        <img className="logo" src={logo} alt="TinyThreads Logo" />
        <h2 className="page-header">Login</h2>

        <div className="header">
          <div className="text">Sign up</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button onClick={() => handleNavigate()}>Profile</button>
      </div>
    );
  }
};

export default Registration;
