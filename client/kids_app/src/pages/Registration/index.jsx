import React, { useState, useEffect } from "react";
import "./style.css";
import { Navigate } from "react-router-dom";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import logo from "../../assets/logo-noBackground.png";
import {jwtDecode as decode} from "jwt-decode";


const clientId = "970353632939-3d743a1i9uu5q2l0esequd3uluqgtt7p.apps.googleusercontent.com";


const Registration = () => {
  const [navigate, setNavigate] = useState(false);
  const [name, setName] = useState('name');
  const [email, setEmail] = useState('email');
  const [password, setPassword] = useState('password');
  const [user, setUser] = useState({});

  function handleCallBacklResponse(response) {
    // console.log("encoded jwt id token: " + response.credential.id_token);  original coded message
    var userInfo = decode(response.credential);
    console.log(userInfo);
    setUser(userInfo);
  }

  const handleNavigate = () => {
    setNavigate(true);
  };

  useEffect(() => {

    /*global google */
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCallBacklResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("SignInDiv"), 
      {theme: "outline", size:"large"}
    );
  },[] );

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


        <div id='SignInDiv'></div>
     {user &&
        <div>
          <h2>{user.email}</h2>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          
        </div>
     }

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
