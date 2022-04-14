import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Footer = () => {
  return (
    <Container>
      <Typography>All Rights Reserved</Typography>
    </Container>
  );
};

export default Footer;
