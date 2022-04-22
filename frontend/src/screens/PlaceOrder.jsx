import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CheckOutSteps from "../components/CheckOutSteps";
import { styled } from "@mui/system";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";

const Wrapper = styled("div")({
  display: "flex",
});
const ItemWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const placeOrderHandler = () => {
      
  };
  useEffect(() => {
      if(!cart.paymentMethod){
          navigate('/payment')
      }
  }, [cart,navigate]);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <CheckOutSteps step1 step2 step3 step4 />
        <Helmet>
          <title>Preview Order</title>
        </Helmet>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography variant="h4">Preview Order</Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <Card variant="outlined" style={{ marginTop: "2rem" }}>
          <CardHeader title="Shipping" />
          <CardContent>
            <Wrapper>
              <Typography sx={{ fontWeight: "bold", margin: "5px" }}>
                Name:
              </Typography>
              <Typography style={{ margin: "5px" }}>
                {cart.shippingAddress.fullName}
              </Typography>
            </Wrapper>
            <Wrapper>
              <Typography sx={{ fontWeight: "bold", margin: "5px" }}>
                Address:
              </Typography>
              <Typography style={{ margin: "5px" }}>
                {cart.shippingAddress.address},
              </Typography>

              <Typography style={{ margin: "5px" }}>
                {cart.shippingAddress.city},
              </Typography>

              <Typography style={{ margin: "5px" }}>
                {cart.shippingAddress.postalCode},
              </Typography>
              <Typography style={{ margin: "5px" }}>
                {cart.shippingAddress.country}
              </Typography>
            </Wrapper>
          </CardContent>
          <CardActions>
            <Link to="/shipping">
              <Typography style={{ margin: "5px" }}>Edit</Typography>
            </Link>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Card variant="outlined" style={{ margin: "2rem 0rem 2rem 0rem" }}>
          <CardHeader title="Order Summary" />
          <CardContent>
            <Wrapper>
              <Typography>Items</Typography>
              <Typography>{cart.itemsPrice}&nbsp;kshs</Typography>
            </Wrapper>

            <Wrapper>
              <Typography>Shipping</Typography>
              <Typography>{cart.shippingPrice}&nbsp;kshs</Typography>
            </Wrapper>

            <Wrapper>
              <Typography>Tax</Typography>
              <Typography>{cart.taxPrice}&nbsp;kshs</Typography>
            </Wrapper>
            <Wrapper>
              <Typography sx={{ fontWeight: "bold" }}>Order Total</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {cart.totalPrice}&nbsp;kshs
              </Typography>
            </Wrapper>
          </CardContent>
          <CardActions>
            <Wrapper>
              <Button
                variant="contained"
                onClick={placeOrderHandler}
                disabled={cart.cartItems.length === 0}
              >
                place order
              </Button>
            </Wrapper>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <Card variant="outlined" style={{ marginTop: "2rem" }}>
          <CardHeader title="Payment" />
          <CardContent>
            <Wrapper>
              <Typography sx={{ fontWeight: "bold", margin: "5px" }}>
                Method:
              </Typography>
              <Typography style={{ margin: "5px" }}>
                {cart.paymentMethod}
              </Typography>
            </Wrapper>
          </CardContent>
          <CardActions>
            <Link to="/payment">
              <Typography style={{ margin: "5px" }}>Edit</Typography>
            </Link>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <Card variant="outlined" style={{ margin: "2rem 0rem 2rem 0rem" }}>
          <CardHeader title="Items" />
          <CardContent>
            {cart.cartItems.map((item) => (
              <Grid container key={item._id}>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <ItemWrapper>
                    <img src={item.image} alt={item.name} width="100%" />
                  </ItemWrapper>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <ItemWrapper>
                    <Link to={`/product/${item._id}`}>
                      <Typography>{item.name}</Typography>
                    </Link>
                  </ItemWrapper>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <ItemWrapper>
                    <Typography>{item.quantity}</Typography>
                  </ItemWrapper>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <ItemWrapper>
                    <Typography>{item.price}&nbsp;kshs</Typography>
                  </ItemWrapper>
                </Grid>
              </Grid>
            ))}
          </CardContent>
          <CardActions>
            <Link to="/cart">
              <Typography style={{ margin: "5px" }}>Edit</Typography>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PlaceOrder;
