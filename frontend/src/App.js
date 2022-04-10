import Header from "./components/Header";
import Products from "./components/Products";
import { Route, Routes } from "react-router-dom";
import Product from "./screens/Product";

function App() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route exact path="/" element={<Products />}></Route>
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
