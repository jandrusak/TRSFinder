import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import cookie from 'cookie'
import { Link } from "react-router-dom";

export function MenuAppBar({ userLoggedIn, setUserLoggedIn }) {
  const linkStyle = {
    textDecoration: "none", 
    color: "inherit", 
    flexGrow: 1, 
    cursor: "pointer", 
    fontWeight: 'bold', 
    fontSize: '1rem'
  };

  const handleLogout = () => {
    document.cookie = cookie.serialize('loggedIn', null, {maxAge:0})
    document.cookie = cookie.serialize("token", null)
    setUserLoggedIn(false) 
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar style={{ display: "flex", minHeight: '56px', padding: '0 8px', justifyContent: "space-between" }}>
        {/* <Toolbar sx={{ }}> */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ ...linkStyle}}
              >
                Home
              </Typography>
            </Link>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ ...linkStyle}}
              >
                Products
              </Typography>
            </Link>
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ ...linkStyle }}
              >
                Cart
              </Typography>
            </Link>
          </div>
          <div>
            {userLoggedIn ? (
              <Link to= '/' onClick={handleLogout} style={{ textDecoration: "none", color: "inherit" }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ ...linkStyle }}
                >
                  Logout
                </Typography>
              </Link>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, cursor: "pointer" }}
                >
                  Login
                </Typography>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  ); 
}

export default MenuAppBar;