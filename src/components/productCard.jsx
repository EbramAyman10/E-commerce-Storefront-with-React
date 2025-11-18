import { useDispatch } from "react-redux";
import "./productCard.css";
import RenderStars from "./stars";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../store/slice/cartSlice";

export default function ProductCard({ product }) {
  const go = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      className="col-12 col-md-6 col-lg-3"
      onClick={() => go(`/productDetails/${product.id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="card h-100 shadow-sm">
        <img src={product.image} className="card-img-top" alt={product.title} />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
          <RenderStars rating={product.rating.rate} />

          <p className="price mt-auto">${product.price}</p>
          <button
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart(product));
            }}
          >
            Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
