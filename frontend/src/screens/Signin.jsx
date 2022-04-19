import React from "react";
import { Box, styled } from "@mui/system";
import { Helmet } from "react-helmet-async";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const BigContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});
const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "600px",
  marginTop: "1rem",
});
const Wrapper = styled("div")({
  paddingTop: "1rem",
  width: "100%",
});
const Bottom = styled("div")({
  display: "flex",
  alignItems: "center",
});
const Signin = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  return (
    <BigContainer>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Box component="form">
        <Container>
          <Wrapper>
            <Typography variant="h3">Sign In</Typography>
          </Wrapper>
          <Wrapper>
            <TextField
              required
              label="Email"
              autoComplete="email"
              type="email"
              fullWidth
            />
          </Wrapper>
          <Wrapper>
            <TextField required label="Password" type="password" fullWidth />
          </Wrapper>
          <Wrapper>
            <Button type="submit" variant="contained">
              Sign in
            </Button>
          </Wrapper>
          <Wrapper>
            <Bottom>
              <Typography style={{ marginRight: "10px" }}>
                New customer?
              </Typography>
              <Link to={`/signup?redirect=${redirect}`}>
                Create your account
              </Link>
            </Bottom>
          </Wrapper>
        </Container>
      </Box>
    </BigContainer>
  );
};

export default Signin;
