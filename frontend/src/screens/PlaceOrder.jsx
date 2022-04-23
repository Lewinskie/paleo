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

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; //ie 123.3455 =>123.34

  //   ITEMS PRICE
  cart.itemsPrice = round2(
    cart.cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
  );

  //   SHIIPING PRICE
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);

  //   TAX PRICE
  cart.taxPrice = round2(0.25 * cart.itemsPrice);

  //   TOTAL PRICE
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {};
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ width: "100%" }}>
        <CheckOutSteps step1 step2 step3 step4 />
        <Helmet>
          <title>Preview Order</title>
        </Helmet>
        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Typography variant="h4">Preview Order</Typography>
        </div>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8} container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card variant="outlined">
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

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card variant="outlined">
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
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card variant="outlined">
              <CardHeader title="Items" />
              <CardContent>
                {cart.cartItems.map((item) => (
                  <Grid
                    container
                    spacing={1}
                    key={item._id}
                    style={{ borderBottom: "0.5px dotted gray" }}
                  >
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                      <ItemWrapper>
                        <div
                          style={{
                            width: "120px",
                            display: "flex",
                            height: "70px",
                            padding: "5px",
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ objectFit: "fit", width: "100%" }}
                          />
                        </div>
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

        {/* SMALL GRID FOR PAYMENT  */}
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card variant="outlined">
              <CardHeader title="Order Summary" />
              <CardContent>
                <Grid container gap={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Typography>Items</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Typography>{cart.itemsPrice}&nbsp;kshs</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Typography>Shipping</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Typography>{cart.shippingPrice}&nbsp;kshs</Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Typography>Tax</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Typography>{cart.taxPrice}&nbsp;kshs</Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    container
                    style={{
                      borderTop: "solid 1px gray",
                      borderBottom: "solid 1px gray",
                    }}
                  >
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Order Total
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {cart.totalPrice}&nbsp;kshs
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default PlaceOrder;
