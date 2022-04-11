import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import "./loading.css";

const Container = styled("div")({
  height: "69vh",
  width: "100%",
  //   background: "#2E2E2E",
  textAlign: "center",
});

const L = styled("span")({
  animation: "drop 2.2s ease-in-out infinite",
  animationDelay: "1.2s",
  color: "black",
});
const O = styled("span")({
  animation: "drop 2.2s ease-in-out infinite",
  animationDelay: "1.3s",
});
const A = styled("span")({
  animation: "drop 2.2s ease-in-out infinite",
  animationDelay: "1.4s",
});
const D = styled("span")({
  animation: "drop 2.2s ease-in-out infinite",
  animationDelay: "1.5s",
});
const I = styled("span")({
  animation: "drop 2.2s ease-in-out infinite",
  animationDelay: "1.6s",
});
const N = styled("span")({
  animation: "drop 2.2s ease-in-out infinite",
  animationDelay: "1.7s",
});
const G = styled("span")({
  animation: "drop 2.2s ease-in-out infinite",
  animationDelay: "1.8s",
});
const Dot1 = styled("span")({
  animation: "drop 2.2s ease-in-out infinite",
  animationDelay: "1.9s",
});
const Dot2 = styled("span")({
  animation: "drop 2.2s ease-in-out infinite",
  animationDelay: "2s",
});
const Dot3 = styled("span")({
  animation: "drop 2.2s ease-in-out infinite",
  animationDelay: "2.1s",
});

const Loading = () => {
  return (
    <Container>
      <Typography sx={{ color: "red" }} variant="h2">
        <L className="span">l</L>
        <O className="span">o</O>
        <A className="span">a</A>
        <D className="span">d</D>
        <I className="span">i</I>
        <N className="span">n</N>
        <G className="span">g</G>
        <Dot1 className="span">.</Dot1>
        <Dot2 className="span">.</Dot2>
        <Dot3 className="span">.</Dot3>
      </Typography>
    </Container>
  );
};

export default Loading;
