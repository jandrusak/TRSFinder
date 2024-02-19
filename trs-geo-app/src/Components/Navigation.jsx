import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import cookie from "cookie";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const MenuAppBar = () => {
  const linkStyle = {
    textDecoration: "none",
    color: "white",
    //  "#35845c",
    // Keeping the green color you like
    flexGrow: 1,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "10px 15px", // Added padding for better touch area and aesthetics
    borderRadius: "5px", // Softened edges for a modern look
    "&:hover": {
      backgroundColor: "#f5f5f5",
      // Subtle hover effect
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#2db7b1",
          color: "#2db7b1",
          boxShadow: "none",
          top: 0
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 8px",
          }}
        >
          <Box sx={{ display: "flex", gap: "20px" }}>
            {" "}
            {/* Increased gap for better spacing */}
            <Link to="/" style={linkStyle}>
              Home
            </Link>
            <Link to="/products" style={linkStyle}>
              Employers
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuAppBar;
