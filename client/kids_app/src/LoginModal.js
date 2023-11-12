// LoginModal.js
import React, { useState, useEffect } from "react";
import { jwtDecode as decode } from "jwt-decode";
import { useAuth } from "./AuthContext";
import "./Modal.css";

const LoginModal = ({ open, onClose, clientId }) => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const { signIn } = useAuth();

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
        <div id="googleSignInButton"></div>
      </div>
    </div>
  );
};

export default LoginModal;
