import "./search.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import RenderStars from "../../components/stars";

export default function SearchPage() {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
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
          {filteredProducts.map((product) => (
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
                  <RenderStars rating={product.rating.rate} />

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
