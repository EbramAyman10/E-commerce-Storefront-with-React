import "./ShopPage.css";
import { useEffect, useState } from "react";

export default function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=8") // 8 products total
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // First 6 products for the top grid
  const apiGridProducts = products.slice(0, 6);

  return (
    <>
      {/* API Products Grid - 6 items */}
      <div className="d-grid my-5">
        {apiGridProducts.map((product) => (
          <div key={product.id} className={`item item-${product.id}`}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>20% Offer</p>
            <button className="btn">
              Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
            </button>
          </div>
        ))}
      </div>

      {/* Top Products Section - 8 items */}
      <div className="container my-5">
        <h3 className="mb-4">Top Products</h3>
        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-12 col-md-6 col-lg-3">
              <div className="card shadow-sm top-product-card h-100">
                <img
                  src={product.image}
                  className="card-img-top top-product-img"
                  alt={product.title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="price mt-auto">${product.price}</p>
                  <button className="btn">
                    Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
