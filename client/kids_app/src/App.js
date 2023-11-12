import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Donate from "./pages/Donate";
import Buynow from "./pages/Buynow";
import Navbar from "./Navbar"; // Import the Navbar component
import { AuthProvider } from "./AuthContext";
import { Navigate } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar /> {/* Include the Navbar here */}
          <Routes>
            <Route path="/" element={<Navigate to="/landing" replace />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/buynow" element={<Buynow />} />
            {/* Add other routes here */}
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;

