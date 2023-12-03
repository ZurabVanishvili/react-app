import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "../MainPage";
import CartPage from "../CartPage";
import "./app.css";
import Product from "../Product";

import CartContext from "../../contexts/cartContext";

const App = () => {
  const defaultCartState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : {};

  const [cartItems, setCartItems] = useState(defaultCartState);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <Router>
        <Routes>
          <Route path="/" exact element={<MainPage />} />
          <Route path="/cart" exact element={<CartPage />} />
          <Route path="/products/:id" exact element={<Product />} />
        </Routes>
      </Router>
    </CartContext.Provider>
  );
};

export default App;
