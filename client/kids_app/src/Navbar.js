// Navbar.js
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle"; // Icon for user profile
import LoginModal from "./LoginModal";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

const clientId =
  "970353632939-3d743a1i9uu5q2l0esequd3uluqgtt7p.apps.googleusercontent.com";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For the profile menu
  const { user, signOut } = useAuth();
  const {details, setDetails} = useState(null); // For bought items and donated items

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
    handleProfileMenuClose(); // Also close the profile menu
  };

  const isMenuOpen = Boolean(anchorEl);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleProfileMenuClose}
    >
      {user && ( // Check if the user object is not null before rendering the user details
        <>
          <MenuItem disabled>
            <AccountCircle sx={{ mr: 2}} />
            {user.name}
          </MenuItem>
          <MenuItem disabled>{user.email}</MenuItem>
          <MenuItem disabled>Can Buy: {user.buy_count}</MenuItem>
          <MenuItem disabled>Donated: {user.donate_count}</MenuItem>
        </>
      )}
    </Menu>
  );

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
            <Button component={Link} to="/landing" sx={{ color: "black" }}>
              Home
            </Button>
            <Button component={Link} to="/donate" sx={{ color: "black" }}>
              Donate
            </Button>
            <Button component={Link} to="/buynow" sx={{ color: "black" }}>
              Buy Now
            </Button>
            {!user ? (
              <Button color="inherit" onClick={() => setModalOpen(true)}>
                Login
              </Button>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="black"
                  marginRight="10px"
                >
                  <AccountCircle />
                </IconButton>
                <Button color="inherit" onClick={handleLogout} sx={{ml: 1.5}}>
                  Logout
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <LoginModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        clientId={clientId}
      />
    </>
  );
};

export default Navbar;
