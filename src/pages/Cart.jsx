import { useNavigate } from "react-router-dom";
function Cart({ cart, removeFromCart, increaseQty, decreaseQty }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => {
    return sum + Number(item.price) * (item.quantity || 1);
  }, 0);
  if (cart.length === 0) {
  return (
    <div className="container">
      <h2>Your cart is empty 🛒</h2>
    </div>
  );
}

  return (
    <div className="cart-container container">
      
      <div className="cart-items">
        
        {cart.map((item) => (
          <div key={item.id} className="card">
            <img
      src={item.image}
      alt={item.title}
      style={{
        height: "120px",
        objectFit: "contain",
        marginBottom: "10px"
      }}
    />
            <h3>{item.title}</h3>
            <p>Price: {item.price}</p>
            <div>
  <p>Qty: {item.quantity || 1}</p>

  <button className="btn" onClick={() => increaseQty(item.id)}>+</button>
  <button className="btn" onClick={() => decreaseQty(item.id)} style={{ marginLeft: "5px" }}>-</button>
</div>

            <button
              className="btn"
              onClick={() => removeFromCart(item.id)}
              style={{ marginTop: "10px" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Order Summary</h2>
        <h3>Total: ${total.toFixed(2)}</h3>

        <button onClick={() => navigate("/checkout")}>
        Go to Checkout
      </button>
      </div>
    </div>
  );
}

export default Cart;