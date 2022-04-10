import React from "react";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

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
});
const BtnWrapper = styled("div")({
  display: "flex",
});

const FeaturedProducts = ({ item, index }) => {
  return (
    <Card>
      <Link to={`/product/${index}`}>
        <ImgWrapper>
          <img src={item.image} alt={item.name} style={{ maxWidth: "100%" }} />
        </ImgWrapper>
      </Link>

      <Container>
        <Link to={`/product/${index}`}>
          <Typography>{item.name}</Typography>
        </Link>

        <Typography>{item.price}&nbsp;ksh</Typography>
      </Container>
      <BtnWrapper>
        <Button>Add to cart</Button>
      </BtnWrapper>
    </Card>
  );
};

export default FeaturedProducts;
