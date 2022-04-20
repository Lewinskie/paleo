import React, { useState, useContext, useEffect } from "react";
import { styled } from "@mui/system";
import { Helmet } from "react-helmet-async";
import { Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";

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
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({
        type: "USER_SIGNIN",
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate(redirect || "/");
    } catch (error) {
      toast.error(getError(error));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <BigContainer>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <form onSubmit={submitHandler}>
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </Wrapper>
          <Wrapper>
            <TextField
              required
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
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
      </form>
    </BigContainer>
  );
};

export default Signin;
