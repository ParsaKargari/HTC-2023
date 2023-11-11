import React, { useState } from "react";
import "./style.css";
import { Navigate } from "react-router-dom";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";

const Registration = () => {
  const [navigate, setNavigate] = useState(false);

  const handleNavigate = () => {
    setNavigate(true);
  };
  if (navigate) {
    return <Navigate to="/profile" />;
  } else {
    return (
      <div className="container">
        <div className="header">
          <div className="text">Sign up</div>
          <div className="underline"></div>
        </div>
        <div className="inputs"></div>
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" name="" id="" />
        </div>
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="phone number" name="" id="" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" name="" id="" />
        </div>
        {/* <button onClick={() => <Navigate to="/profile" state={null} />}> */}
        <button onClick={() => handleNavigate()}>Profile</button>
      </div>
    );
  }
};

export default Registration;
