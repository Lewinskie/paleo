import Header from "./components/Header";
import Home from "./screens/Home";
import { Route, Routes } from "react-router-dom";
import Product from "./screens/Product";
import Footer from "./components/Footer";
import { Container } from "@mui/material";
import { styled } from "@mui/system";
import Cart from "./screens/Cart";
import Signin from "./screens/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShippingAddress from "./screens/ShippingAddress";
import Signup from "./screens/Signup";
import Payment from "./screens/Payment";

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
        <ToastContainer position="bottom-center" limit={1} />
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
              <Route path="/signup" element={<Signup />} />
              <Route path="/shipping" element={<ShippingAddress />} />
              <Route path="/payment" element={<Payment />} />
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
