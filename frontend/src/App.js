import Header from "./components/Header";
import Home from "./screens/Home";
import { Route, Routes } from "react-router-dom";
import Product from "./screens/Product";
import Footer from "./components/Footer";
import { Container } from "@mui/material";
import { styled } from "@mui/system";
import Cart from "./screens/Cart";
import Signin from "./screens/Signin";

const SiteContainer = styled("div")({
  // minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

function App() {
  return (
    <>
      <SiteContainer>
        <header style={{ height: "13vh" }}>
          <Header />
        </header>
        <main style={{ minHeight: "80vh" }}>
          <Container style={{ marginTop: "3rem" }}>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/product/:_id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signin" element={<Signin />} />
            </Routes>
          </Container>
        </main>
        <footer style={{ minHeight: "7vh" }}>
          <Footer />
        </footer>
      </SiteContainer>
    </>
  );
}

export default App;
