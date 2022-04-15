import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { Store } from "../Store";

const Header = () => {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <Grid
      container
      style={{
        background: "#404040",
        display: "flex",
        padding: "1rem",
        position: "fixed",
        width: "100",
        zIndex: 2,
      }}
    >
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
        <Typography variant="h3" style={{ marginLeft: "6rem" }}>
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
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
        <Link to="/cart" style={{ color: "white" }}>
          <div style={{ position: "relative" }}>
            <ShoppingCart />
            {cart.cartItems.length > 0 && (
              <div
                style={{
                  background: "#1976D2",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  left: "20px",
                  top: "-10px",
                }}
              >
                {cart.cartItems.reduce(
                  (accumulator, current) => accumulator + current.quantity,
                  0
                )}
              </div>
            )}
          </div>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Header;
