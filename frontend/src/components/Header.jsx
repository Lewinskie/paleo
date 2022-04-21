import React, { useContext, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { Store } from "../Store";
import Down from "@mui/icons-material/ArrowDropDown";
import { styled } from "@mui/system";

const DropDown = styled("div")({
  position: "relative",
  width: "100%",
});
const Wrapper = styled("div")({
  width: "100%",
  // padding: "10px 5px",
  color: "white",
  // background: "#404040",
});
const Hr = styled("div")({
  width: "100%",
  borderTop: "1px solid white",
});

const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const [show, setShow] = useState(false);

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
  };

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
      <Grid
        item
        xs={1}
        sm={1}
        md={1}
        lg={1}
        xl={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/cart" style={{ color: "white" }}>
          <div style={{ position: "relative" }}>
            <ShoppingCart />
            {cart.cartItems.length > 0 && (
              <div
                style={{
                  background: "#1976D2",
                  width: "25px",
                  height: "25px",
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
      <Grid
        item
        xs={1}
        sm={1}
        md={1}
        lg={1}
        xl={1}
        style={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "center",
          width: "100%",
        }}
      >
        {userInfo ? (
          <>
            <DropDown>
              <Button onClick={() => setShow(!show, console.log(show))}>
                {userInfo.name}
                <Down />
              </Button>
              {show === true ? (
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    background: "#8f8f8f",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "5px",
                    transition: "all 0.5s ease",
                    border: "1px solid white",
                  }}
                >
                  <Wrapper>
                    <Link
                      to="/profile"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <Typography>Profile</Typography>
                    </Link>
                  </Wrapper>
                  <Hr />
                  <Wrapper>
                    <Link
                      to="/orderhistory"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <Typography>Order History</Typography>
                    </Link>
                  </Wrapper>
                  <Hr />
                  <Wrapper>
                    <Link
                      to="#signout"
                      style={{ color: "black", textDecoration: "none" }}
                      onClick={signoutHandler}
                    >
                      <Typography>Sign Out</Typography>
                    </Link>
                  </Wrapper>
                </div>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    display: "none",
                  }}
                />
              )}
            </DropDown>
          </>
        ) : (
          <Link to="/signin" style={{ color: "white", textDecoration: "none" }}>
            <Typography>Sign In</Typography>
          </Link>
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
