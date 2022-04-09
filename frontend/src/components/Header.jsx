import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import { styled } from "@mui/system";

const Header = () => {
  return (
    <AppBar position="static" sx={{ background: "#404040", padding: "1rem" }}>
      <Toolbar>
        <Typography variant="h3">
          <Link
            to="/"
            style={{
              color: "white",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            PALEO
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
