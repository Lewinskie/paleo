import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "./Rating";
import axios from "axios";
import { Store } from "../Store";

const Card = styled("div")({
  border: "1px #404040 solid",
  margin: "1rem",
  maxWidth: "400px",
});
const Container = styled("div")({
  margin: "1rem",
});
const ImgWrapper = styled("div")({
  maxWidth: "400px",
  margin: "1rem",
});
const BtnWrapper = styled("div")({
  display: "flex",
  margin: "1rem",
});

const FeaturedProducts = ({ item }) => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async (item) => {
    // CHECK IF ITEM ALREADY EXISTS IN CART. IF IN CART, INCREASE ONLY QUANTITY
    const existItem = cart.cartItems.find((x) => x._id === item._id);

    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/product/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry, Product not in stock");
    }

    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    // navigate("/cart");
  };
  return (
    <Card>
      <Link to={`/product/${item._id}`}>
        <ImgWrapper>
          <img src={item.image} alt={item.name} style={{ maxWidth: "100%" }} />
        </ImgWrapper>
      </Link>

      <Container>
        <Link to={`/product/${item._id}`}>
          <Typography>{item.name}</Typography>
        </Link>
        <Ratings rating={item.rating} numReviews={item.numReviews} />

        <Typography>{item.price}&nbsp;ksh</Typography>
      </Container>
      <BtnWrapper>
        {item.countInStock ===0 ? (
          <Button variant="outlined" disabled>
            Out of stock
          </Button>
        ) : (
          <Button variant="contained" onClick={() => addToCartHandler(item)}>
            Add to cart
          </Button>
        )}
      </BtnWrapper>
    </Card>
  );
};

export default FeaturedProducts;
