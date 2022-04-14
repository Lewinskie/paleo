import { useParams } from "react-router-dom";
import { Typography, Grid, Container, Button } from "@mui/material";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import logger from "use-reducer-logger";
import { styled } from "@mui/system";
import Ratings from "../components/Rating";
import { Helmet } from "react-helmet-async";

const Wrapper = styled("div")({
  height: "100%",
  width: "100%",
});

const ImgWrapper = styled("div")({
  padding: "1rem",
  display: "flex",
  height: "70vh",
  alignItems: "center",
});
const NameWrapper = styled("div")({});
const RatingWrapper = styled("div")({});
const PriceWrapper = styled("div")({});
const DescriptionWrapper = styled("div")({});
const Hr = styled("div")({
  borderTop: "1px solid grey",
  width: "100%",
  margin: "0.5rem 0rem",
});
const StatusWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
const OutOfStock = styled("div")({
  background: "red",
  padding: "1px 10px",
  color: "white",
});
const InStock = styled("div")({
  background: "green",
  padding: "1px 10px",
  color: "white",
});
const Price = styled("div")({
  display: "flex",
});
const ButtonWrapper = styled("div")({
  display: "flex",
  width: "100%",
});

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
  }
};

const Product = () => {
  const params = useParams();
  const { _id } = params;

  const [{ loading, error, product }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    product: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const res = await axios.get(`/api/product/${_id}`);
        console.log(res.data);
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, [_id]);

  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Grid container style={{ height: "100%", width: "100%" }}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Container>
              <ImgWrapper>
                <img src={product.image} alt={product.name} width="100%" />
              </ImgWrapper>
            </Container>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            style={{
              background: "orange",
              padding: "1rem",
              width: "100%",
            }}
            container
          >
            <Grid
              item
              xs={8}
              sm={8}
              md={8}
              lg={8}
              xl={8}
              style={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <NameWrapper>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <Typography variant="h3">{product.name}</Typography>
              </NameWrapper>
              <Hr />
              <RatingWrapper>
                <Ratings
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </RatingWrapper>
              <Hr />
              <PriceWrapper>
                <Typography>
                  <span>Price:</span>
                  <span>&nbsp;{product.price}</span>
                </Typography>
              </PriceWrapper>
              <Hr />
              <DescriptionWrapper>
                <Typography>Description</Typography>
                <Typography>{product.description}</Typography>
              </DescriptionWrapper>
            </Grid>
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              style={{ padding: "1rem 0rem" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "solid 1px grey",
                  padding: "1rem",
                  width: "100%",
                }}
              >
                <Price>
                  <Grid container>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Typography>Price:</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Typography>{product.price} kshs</Typography>
                    </Grid>
                  </Grid>
                </Price>
                <Hr />
                <StatusWrapper>
                  <Typography>status:</Typography>
                  {product.countInStock < 0 ? (
                    <OutOfStock>
                      <Typography>Not in stock</Typography>
                    </OutOfStock>
                  ) : (
                    <InStock>
                      <Typography>In stock</Typography>
                    </InStock>
                  )}
                </StatusWrapper>
                <Hr />
                {product.countInStock < 0 ? (
                  <ButtonWrapper>
                    <Button sx={{ width: "100%" }} variant="contained" disabled>
                      Add to cart
                    </Button>
                  </ButtonWrapper>
                ) : (
                  <ButtonWrapper>
                    <Button sx={{ width: "100%" }} variant="contained">
                      add to cart
                    </Button>
                  </ButtonWrapper>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Wrapper>
  );
};

export default Product;
