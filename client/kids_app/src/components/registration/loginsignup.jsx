import React from "react";
import "./loginsignup.css";

export const loginsignup = () => {
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
    </div>
  );
};
