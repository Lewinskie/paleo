import React from "react";
import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  background: "#404040",
  display: "flex",
  padding: "1rem",
  // position: "fixed",
  width: "100%",
});

const Header = () => {
  return (
    <Wrapper xs={12} sm={12} md={12} lg={12} xl={12}>
      <Container>
        <Typography variant="h3" style={{ marginLeft: "1rem" }}>
          <Link
            to="/"
            style={{
              color: "white",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            PALEO
          </Link>
        </Typography>
      </Container>
    </Wrapper>
  );
};

export default Header;
