import { Typography } from "@mui/material";
import React from "react";
import "./steps.css";

const CheckOutSteps = (props) => {
  return (
    <div className="wrapper">
      <div className={props.step1 ? "active" : ""}>
        <Typography>Sign In</Typography>
      </div>
      <div className={props.step2 ? "active" : ""}><Typography>Shipping</Typography></div>
      <div className={props.step3 ? "active" : ""}><Typography>Payment</Typography></div>
      <div className={props.step4 ? "active" : ""}><Typography>Place Order</Typography></div>
    </div>
  );
};

export default CheckOutSteps;
