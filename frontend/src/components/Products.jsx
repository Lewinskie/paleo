import React from "react";
import data from "../data";
import FeaturedProducts from "./FeaturedProducts";
import { styled } from "@mui/system";
import { Grid, Typography } from "@mui/material";

const Title = styled("div")({
  margin: "1rem",
});

const Products = () => {
  return (
    <>
      <Title>
        <Typography variant="h4">Featured Products</Typography>
      </Title>
      <Grid container>
        {data.products.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            style={{ display: "flex", justifyContent: "center" }}
            key={index}
          >
            <FeaturedProducts item={item} index={index} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Products;
