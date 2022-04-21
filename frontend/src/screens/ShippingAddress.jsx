import { Button, TextField, Typography, Grid } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckOutSteps from "../components/CheckOutSteps";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "1rem",
});
const Form = styled("div")({
  maxWidth: "400px",
});
const Wrapper = styled("div")({
  width: "100%",
  marginBottom: "1rem",
});

const ShippingAddress = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  // THSI IS TO GET THE SHIPPING ADDRESS FROM STATE TO SET AS THE DEFAULT DATA FOR THE FORM
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckOutSteps step1 step2 />
      <Container>
        <Form>
          <form onSubmit={submitHandler}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Wrapper>
                  <Typography variant="h4">Shipping Address</Typography>
                </Wrapper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Wrapper>
                  <TextField
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    label="Full Name"
                    fullWidth
                  />
                </Wrapper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Wrapper>
                  <TextField
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    label="Address"
                    fullWidth
                  />
                </Wrapper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Wrapper>
                  <TextField
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    label="City"
                    fullWidth
                  />
                </Wrapper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Wrapper>
                  <TextField
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    label="Postal Code"
                    fullWidth
                  />
                </Wrapper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Wrapper>
                  <TextField
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    label="Country"
                    fullWidth
                  />
                </Wrapper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Wrapper>
                  <Button variant="contained" type="submit">
                    Continue
                  </Button>
                </Wrapper>
              </Grid>
            </Grid>
          </form>
        </Form>
      </Container>
    </div>
  );
};

export default ShippingAddress;
