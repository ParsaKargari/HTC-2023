// Navbar.js

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box"; // Import Box
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginModal from "./LoginModal";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure you have the corresponding CSS file

const clientId =
  "970353632939-3d743a1i9uu5q2l0esequd3uluqgtt7p.apps.googleusercontent.com";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar className="navbar-links">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "black" }}
            >
              {user ? `Welcome, ${user.name}` : ""}
            </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            {/* Use Box to wrap the links and the auth button */}
            <Button component={Link} to="/landing" sx={{ color: "black" }}>
              Home
            </Button>
            <Button component={Link} to="/profile" sx={{ color: "black" }}>
              Profile
            </Button>
            <Button component={Link} to="/donate" sx={{ color: "black" }}>
              Donate
            </Button>
            <Button component={Link} to="/buynow" sx={{ color: "black" }}>
              Buy Now
            </Button>
            {/* Auth Button */}
            {!user && (
              <Button color="inherit" onClick={() => setModalOpen(true)}>
                Login
              </Button>
            )}
            {user && (
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <Button color="inherit" onClick={() => signOut()}>
                  Logout
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <LoginModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        clientId={clientId}
      />
    </>
  );
};

export default Navbar;
