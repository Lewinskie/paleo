import { Button, IconButton, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import axios from "axios";

const Wrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  padding: "5px",
});
const Hr = styled("div")({
  border: "0.5px solid gray",
  marginBottom: "0.5srem",
});

const Cart = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/product/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry, Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkOutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div style={{ width: "100%" }}>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <Typography variant="h3">Shopping Cart</Typography>

      {cartItems.length === 0 ? (
        <div>
          <Typography>Cart is empty!</Typography>
          <Link to="/">Back to shopping</Link>
        </div>
      ) : (
        <Grid container gap={2}>
          <Grid container item xs={12} sm={12} md={8} lg={8} xl={8}>
            {cartItems.map((item) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                container
                key={item._id}
                style={{
                  border: "1px solid gray",
                  margin: "5px",
                  borderRadius: "5px",
                  height: "82px",
                }}
              >
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <Wrapper>
                    <img src={item.image} alt={item.name} width="100%" />
                  </Wrapper>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <Wrapper>
                    <Link
                      to={`/product/${item._id}`}
                      style={{ fontSize: "20px" }}
                    >
                      {item.name}
                    </Link>
                  </Wrapper>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Wrapper>
                    <IconButton
                      disabled={item.quantity === 1}
                      onClick={() => updateCartHandler(item, item.quantity - 1)}
                    >
                      <Remove />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      disabled={item.quantity === item.countInStock}
                      onClick={() => updateCartHandler(item, item.quantity + 1)}
                    >
                      <Add />
                    </IconButton>
                  </Wrapper>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <Wrapper>
                    <Typography>{item.price} kshs</Typography>
                  </Wrapper>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <Wrapper>
                    <IconButton onClick={() => removeItemHandler(item)}>
                      <Delete />
                    </IconButton>
                  </Wrapper>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            xl={3}
            container
            style={{
              border: "1px solid gray",
              margin: "5px ",
              borderRadius: "5px",
              height: "100%",
              padding: "5px",
            }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                }}
              >
                <Typography variant="h6">Items in Cart:</Typography>
                <Typography variant="h5">
                  {cartItems.reduce((acc, cur) => acc + cur.quantity, 0)}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                }}
              >
                <Typography variant="h6">Subtotal:</Typography>
                <Typography variant="h5">
                  {cartItems.reduce(
                    (acc, cur) => acc + cur.price * cur.quantity,
                    0
                  )}
                  Kshs
                </Typography>
              </div>
              <Hr />
              <div
                style={{
                  padding: "0.5rem 1rem",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button variant="contained" onClick={checkOutHandler}>
                  Proceed to checkout
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Cart;
