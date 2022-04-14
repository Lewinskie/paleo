import React from "react";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import Ratings from "./Rating";

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
  console.log(item.brand);
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
        <Button variant="contained">Add to cart</Button>
      </BtnWrapper>
    </Card>
  );
};

export default FeaturedProducts;
