import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const placeOrder = () => {
    // fake validation
    if (!form.userName || !form.phone || !form.address) {
      alert("Please fill all fields");
      return;
    }

    // simulate order
    console.log("ORDER DATA:", {
      user: form,
      items: cart,
      total,
    });

    // clear cart
    setCart([]);
    localStorage.removeItem("cart");

    // go success page
    navigate("/success");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Checkout</h2>

      {/* FORM */}
      <div style={styles.form}>
        <input
          name="userName"
          placeholder="Full Name"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          style={styles.input}
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          onChange={handleChange}
          style={styles.textarea}
        />
      </div>

      {/* ORDER SUMMARY */}
      <div style={styles.summary}>
        <h3>Order Summary</h3>

        {cart.map((item, i) => (
          <div key={i} style={styles.item}>
            <p>{item.title}</p>
            <p>${item.price} × {item.quantity || 1}</p>
          </div>
        ))}

        <hr />

        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      {/* BUTTON */}
      <button onClick={placeOrder} style={styles.button}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout;

const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    minHeight: "80px",
  },
  summary: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};