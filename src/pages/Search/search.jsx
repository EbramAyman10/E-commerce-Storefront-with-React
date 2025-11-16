import "./search.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const renderStars = (rating) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);

  return (
    <div className="stars">
      {[...Array(totalStars)].map((_, index) => (
        <i
          key={index}
          className={
            index < filledStars
              ? "fa-solid fa-star filled-star"
              : "fa-regular fa-star empty-star"
          }
        ></i>
      ))}
    </div>
  );
};

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-page">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="container mt-4">
        <div className="row g-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  {renderStars(product.rating.rate)}
                  <p className="price mt-auto">${product.price}</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-primary mt-auto"
                  >
                    Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
