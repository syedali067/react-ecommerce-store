import { Link } from "react-router-dom";

function Navbar({ cart }) {

  const totalItems = cart.reduce((sum, item) => {
    return sum + (item.quantity || 1);
  }, 0);

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 20px",
      background: "#222",
      color: "white"
    }}>
      <h2>React Mini Store</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/products" style={{ color: "white", textDecoration: "none" }}>
          Products
        </Link>

        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
          Cart ({totalItems})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;