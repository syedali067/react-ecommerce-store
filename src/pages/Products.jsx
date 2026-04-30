import { useEffect, useState } from "react";

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [clickedId, setClickedId] = useState(null);

  useEffect(() => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);

  const filteredProducts = products.filter((product) => {
  const matchesSearch = product.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    category === "all" || product.category === category;

  return matchesSearch && matchesCategory;
});

if (loading) {
  return (
    <div className="container">
      <h2>Loading products...</h2>
    </div>
  );
}
  return (
    <div className="container">
      <h1>Products Page</h1>
      <input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: "8px",
    width: "100%",
    marginBottom: "20px"
  }}
/>
<div style={{ marginBottom: "20px" }}>
  <button className="btn" onClick={() => setCategory("all")}>All</button>
  <button className="btn" onClick={() => setCategory("men's clothing")} style={{ marginLeft: "5px" }}>Men</button>
  <button className="btn" onClick={() => setCategory("women's clothing")} style={{ marginLeft: "5px" }}>Women</button>
  <button className="btn" onClick={() => setCategory("electronics")} style={{ marginLeft: "5px" }}>Electronics</button>
  <button className="btn" onClick={() => setCategory("jewelery")} style={{ marginLeft: "5px" }}>Jewelry</button>
</div>

{filteredProducts.length === 0 && (
  <p>No products found 😕</p>
)}

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.title} />

            <h3>{product.title}</h3>
            <p>${product.price}</p>

            <button
              className="btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
              
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;