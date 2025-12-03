import { useDispatch, useSelector } from "react-redux";
import "./productCard.css";
import RenderStars from "./stars";
import { useNavigate } from "react-router-dom";
import { addToCartLocal } from "../store/slice/cartSlice";
import { useState } from "react";
import checkmark from "../assets/checkmark.png";
import Toast from "./Toast";
import { syncAddToCart } from "../store/slice/cartAPI";

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const go = useNavigate();

  function addedtoCart() {
    setAdded(added ? false : true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  const handleAddToCart = async (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    if (!isLoggedIn) {
      go("/login");
      alert("Please log in to add items to your cart.");
      return;
    }

    const existingItem = cartItems.find((i) => i._id === product._id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const newTotalQuantity = currentQuantity + 1;

    dispatch(addToCartLocal(product));

    if (newTotalQuantity > 0) {
      dispatch(syncAddToCart(product._id, newTotalQuantity));
    }
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    addedtoCart();
    setShowToast(true);
  };
  return (
    <>
      <div
        className="col-12 col-md-6 col-lg-3"
        onClick={() => go(`/productDetails/${product._id}`)}
        style={{ cursor: "pointer" }}
      >
        <div className="card h-100 shadow-sm">
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />

          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <RenderStars rating={product.rating.rate} />

            <p className="price mt-auto">${product.price}</p>
            <div className="added-to-cart" style={{ opacity: added ? 1 : 0 }}>
              <img src={checkmark} />
              Added
            </div>
            <button className="btn" onClick={(e) => handleAddToCart(e)}>
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
