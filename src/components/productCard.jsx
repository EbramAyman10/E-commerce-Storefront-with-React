import { useDispatch } from "react-redux";
import "./productCard.css";
import RenderStars from "./stars";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../store/slice/cartSlice";
import { useState } from "react";
import checkmark from "../assets/checkmark.png";

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  function addedtoCart() {
    setAdded(added ? false : true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }
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
          <div className="added-to-cart" style={{ opacity: added ? 1 : 0 }}>
            <img src={checkmark} />
            Added
          </div>
          <button
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart(product));
              addedtoCart();
            }}
          >
            Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
