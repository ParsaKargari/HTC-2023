// Navbar.js

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="navbar-links">
        <div className="navbar-links_logo">
          
        </div>
        <div className="navbar-links_container">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Application
          </Typography>
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
