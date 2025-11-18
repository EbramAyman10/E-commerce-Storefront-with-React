import "./productCard.css";
import RenderStars from "./stars";
import { Link } from "react-router-dom";
export default function ProductCard({ product }) {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="card h-100 shadow-sm">
        <img src={product.image} className="card-img-top" alt={product.title} />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
          <RenderStars rating={product.rating.rate} />

          <p className="price mt-auto">${product.price}</p>
          <Link to={`/productDetails/${product.id}`} className="btn">
            Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
