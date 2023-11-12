import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LoginModal from "./LoginModal";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material"; // Import Tooltip
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./Navbar.css";

const clientId =
  "970353632939-3d743a1i9uu5q2l0esequd3uluqgtt7p.apps.googleusercontent.com";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, signOut } = useAuth();
  const [buyCount, setBuyCount] = useState(null);
  const [sellCount, setSellCount] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/get_listings_t1");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBuyCount(data[0].buy_count);
        setSellCount(data[0].sell_count);
      } catch (error) {
        console.error("Could not fetch user details:", error);
      }
    };

    if (user) {
      fetchUserDetails();
      const intervalId = setInterval(fetchUserDetails, 5000);

      return () => clearInterval(intervalId);
    }
  }, [user]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
    handleProfileMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);

  const menuId = "primary-search-account-menu";
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
      {user && (
        <>
          <MenuItem disabled>
            <AccountCircle sx={{ mr: 2 }} />
            {user.name}
          </MenuItem>
          <MenuItem disabled>{user.email}</MenuItem>
          <MenuItem disabled>Buy tokens: {buyCount}</MenuItem>
          <MenuItem disabled>Total Donation: {sellCount}</MenuItem>
          <MenuItem disabled>
            Free Item in: {2 - (sellCount % 2)} donation
            {2 - (sellCount % 2) === 1 ? "" : "s"}
          </MenuItem>
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
          <Tooltip title="Welcome to our community! When you donate, you start with 3 free tokens. Every 2 pieces you donate, you'll receive a free clothing item as a token of appreciation.">
            <IconButton
              edge="start"
              color="black"
              aria-label="tutorial"
              sx={{ ml: 1, mr: 3 }}
            >
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
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
              Grab
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
                <Button color="inherit" onClick={handleLogout} sx={{ ml: 1.5 }}>
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
