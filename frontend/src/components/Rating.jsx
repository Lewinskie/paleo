import React from "react";
import { Rating } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
});

const Ratings = ({ numReviews, rating }) => {
  return (
    <Container>
      <span>
        <Rating value={rating} precision={0.5} readOnly />
      </span>
      &nbsp;
      <span style={{ color: "#ffc000" }}>{numReviews} Reviews</span>
    </Container>
  );
};

export default Ratings;
