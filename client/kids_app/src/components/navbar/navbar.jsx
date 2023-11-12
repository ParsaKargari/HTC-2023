// Navbar.js

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-noBackground.png";
import "./style.css";

const Navbar = () => {
  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="navbar-container">
        <div className="navbar-header">
          <img className="logo-nav" src={logo} alt="TinyThreads Logo" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TinyThreads
          </Typography>
        </div>
        <div className="navbar-links_container">
          <Button color="inherit" component={Link} to="/landing">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/registration">
            Registration
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
          <Button color="inherit" component={Link} to="/donate">
            Donate
          </Button>
          <Button color="inherit" component={Link} to="/buynow">
            Buy Now
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
