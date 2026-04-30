import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Success from "./pages/Success.jsx"; // ✅ ADD THIS

import "./App.css";
import Navbar from "./pages/Navbar.jsx";


function Home() {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
  fetch("https://fakestoreapi.com/products?limit=3")
    .then(res => res.json())
    .then(data => setFeatured(data));
}, []);
  return (
    <div>

      {/* HERO SECTION */}
      <div className="hero">
        <h1>Welcome to React Mini Store 🛍️</h1>
        <p>Best products at affordable prices. Simple, fast and clean shopping experience.</p>

        <Link to="/products">
          <button className="btn">Shop Now</button>
        </Link>
      </div>

      {/* FEATURED SECTION */}
      <div className="featured">
  <h2>Featured Products</h2>

  <div className="featured-grid">
    {featured.map((item) => (
      <div key={item.id} className="featured-card">
        <img src={item.image} alt={item.title} />
        <p>{item.title.slice(0, 20)}...</p>
        <strong>${item.price}</strong>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}


function App() {
  // load cart from localStorage initially
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  const addToCart = (product) => {
  setCart((prev) => {
    const existing = prev.find(item => item.id === product.id);

    if (existing) {
      return prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    }

    return [...prev, { ...product, quantity: 1 }];
  });
};

const increaseQty = (id) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    )
  );
};

const decreaseQty = (id) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};
const removeFromCart = (id) => {
  setCart((prev) => prev.filter(item => item.id !== id));
};

  // save cart every time it changes
  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);



  return (
    <BrowserRouter>
    <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route 
  path="/cart" 
  element={
    <Cart 
      cart={cart} 
      removeFromCart={removeFromCart}
      increaseQty={increaseQty}
      decreaseQty={decreaseQty}
    />
  } 
/>
<Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
<Route path="/success" element={<Success />} />
        
      </Routes>
      <footer className="footer">
  <p>© 2026 React Mini Store. Built by Ali 🚀</p>
</footer>
    </BrowserRouter>
  );
}

export default App;