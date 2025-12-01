import { useDispatch, useSelector } from "react-redux";
import "./productCard.css";
import RenderStars from "./stars";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../store/slice/cartSlice";
import { useState } from "react";
import checkmark from "../assets/checkmark.png";
import Toast from "./Toast";

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);
  function addedtoCart() {
    setAdded(added ? false : true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }
  const go = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="col-12 col-md-6 col-lg-3"
        onClick={() => go(`/productDetails/${product.id}`)}
        style={{ cursor: "pointer" }}
      >
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
            <div className="added-to-cart" style={{ opacity: added ? 1 : 0 }}>
              <img src={checkmark} />
              Added
            </div>
            <button
              className="btn"
              onClick={(e) => {
                e.stopPropagation();

                if (isLoggedIn) {
                  dispatch(addToCart(product));
                  addedtoCart();
                  setShowToast(true);
                } else {
                  go("/login");
                  alert("Please log in to add items to your cart.");
                }
              }}
            >
              Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
            </button>
          </div>
        </div>
      </div>
      <Toast
        message="Added To Cart ✓"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
