import React, { useEffect, useReducer } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import { styled } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import logger from "use-reducer-logger";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";

const Title = styled("div")({
  margin: "1rem",
});

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const Home = () => {
  // useReducer accepts two parameters.. that is the reducer function and the default state to return initially
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      //BEFORE RETURNING RESPONSE, DIPLAY LOADING
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const res = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
      console.log(products);
    };
    fetchData();
  }, []);

  return (
    <>
      <Title>
        <Helmet>
          <title>Paleo</title>
        </Helmet>
        <Typography variant="h4">Featured Products</Typography>
      </Title>

      <Grid container>
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          products.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={4}
              style={{ display: "flex", justifyContent: "center" }}
              key={item._id}
            >
              <FeaturedProducts item={item} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default Home;
