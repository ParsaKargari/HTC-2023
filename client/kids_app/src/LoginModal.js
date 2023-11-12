// LoginModal.js
import React, { useState, useEffect } from "react";
import { jwtDecode as decode } from "jwt-decode";
import { useAuth } from "./AuthContext";
import "./Modal.css";
import email_icon from "./assets/email.png"; //some import error
import password_icon from "./assets/password.png"; //some import error
import logo from "./assets/logo.png"; //some import error



const LoginModal = ({ open, onClose, clientId }) => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const { signIn } = useAuth();
  const [name, setName] = useState('name');
  const [email, setEmail] = useState('email');
  const [password, setPassword] = useState('password');
  const [user, setUser] = useState({});
  const [navigate, setNavigate] = useState(false);


  const handleNavigate = () => {
    setNavigate(true);
  };

  useEffect(() => {
    // Dynamically load the Google API script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setIsSdkLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isSdkLoaded && open) {
      // Initialize the Google Sign-In button after SDK is loaded and modal is open
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleLogin,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" }
      );
    }
  }, [isSdkLoaded, open, clientId]);

  const handleLogin = async (response) => {
    const userInfo = decode(response.credential);
    console.log(userInfo);

    signIn(userInfo, async () => {
      // Prepare form data
      const formData = new FormData();
      formData.append("email", userInfo.email);
      formData.append("picture", userInfo.picture);
      // Close the modal after successful login
      onClose();
      try {
        // Send the POST request with form data
        const res = await fetch("/login_user", {
          method: "POST",
          body: formData,
        });
        const result = await res.json();
        console.log(result);
      } catch (error) {
        console.error("Error during login_user API call:", error);
      }

      // Close the modal after successful login
      onClose();
    });
  };

  if (!open) return null;

  return (
    <div className="modal" style={{ display: open ? "block" : "none" }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        

        {/* start new edits */}

        <div className="container">
          <img className="logo" src={logo} alt="TinyThreads Logo" />
          <h2 className="page-header">Login</h2>

          <div className="header">
            <div className="text">Sign up</div>
            <div className="underline"></div>
          </div>

          <div id="googleSignInButton"></div> {/* Google Sign-In button from Parsa's gauth code */}


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

          <button onClick={() => handleNavigate()}>Start Swapping!</button>
        </div>

        {/* end new edits */}
      </div>
    </div>
  );
};

export default LoginModal;
