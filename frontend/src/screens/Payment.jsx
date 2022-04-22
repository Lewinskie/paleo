import React, { useState, useContext, useEffect } from "react";
import CheckOutSteps from "../components/CheckOutSteps";
import { styled } from "@mui/system";
import { Helmet } from "react-helmet-async";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

const Card = styled("div")({
  display: "flex",
  flexDirection: "column",
});
const CardContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  marginTop: "1rem",
});
const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "600px",
});
const Form = styled("div")({
  display: "flex",
  flexDirection: "column",
});
const Wrapper = styled("div")({});

const Payment = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <Card>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <CheckOutSteps step1 step2 step3 />
      <CardContent>
        <Container>
          <Typography variant="h4">Payment Method</Typography>
          <Form>
            <form onSubmit={handleSubmit}>
              <Wrapper>
                <FormControlLabel
                  control={
                    <Checkbox
                      type="radio"
                      value="PayPal"
                      checked={paymentMethodName === "PayPal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  }
                  label="PayPal"
                />
              </Wrapper>
              <Wrapper>
                <FormControlLabel
                  control={
                    <Checkbox
                      type="radio"
                      value="Stripe"
                      checked={paymentMethodName === "Stripe"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  }
                  label="Stripe"
                />
              </Wrapper>
              <Wrapper>
                <Button type="submit" variant="contained">
                  Continue
                </Button>
              </Wrapper>
            </form>
          </Form>
        </Container>
      </CardContent>
    </Card>
  );
};

export default Payment;
