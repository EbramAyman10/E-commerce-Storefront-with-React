import "./slideItems.css";
import "../pages/Shop/ShopPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCartLocal } from "../store/slice/cartSlice";
import Toast from "./Toast";
import { syncAddToCart } from "../store/slice/cartAPI";

export default function SlideItem() {
  const [showToast, setShowToast] = useState(false);

  const go = useNavigate();
  const dispatch = useDispatch();
  const { products } = useProducts();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const [slideIndex, setSlideIndex] = useState(0);

  const apiGridProducts = products.slice(0, 6);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % apiGridProducts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [apiGridProducts.length]);

  const prevSlide = () => {
    setSlideIndex((prev) =>
      prev === 0 ? apiGridProducts.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % apiGridProducts.length);
  };
  const currentProduct = apiGridProducts[slideIndex];

  const discountedPrice = currentProduct
    ? (currentProduct.price * 0.8).toFixed(2)
    : "0.00";
  const handleAddToCart = async (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    if (!isLoggedIn) {
      go("/login");
      alert("Please log in to add items to your cart.");
      return;
    }

    const existingItem = cartItems.find((i) => i._id === currentProduct._id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const newTotalQuantity = currentQuantity + 1;

    dispatch(addToCartLocal(currentProduct));

    if (newTotalQuantity > 0) {
      dispatch(syncAddToCart(currentProduct._id, newTotalQuantity));
    }
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    setShowToast(true);
  };
  return (
    <>
      <div className="top-slider">
        <button className="arrow left" onClick={prevSlide}>
          ❮
        </button>
        {apiGridProducts[slideIndex] && (
          <div
            className="slide"
            onClick={() =>
              go(`/productDetails/${apiGridProducts[slideIndex]._id}`)
            }
            style={{ cursor: "pointer" }}
          >
            <img
              src={apiGridProducts[slideIndex].image}
              alt={apiGridProducts[slideIndex].name}
            />
            <h3>{apiGridProducts[slideIndex].name}</h3>
            <p className="price">
              <span className="original-price">
                ${apiGridProducts[slideIndex].price.toFixed(2)}
              </span>
              <span className="discounted-price">${discountedPrice}</span>
            </p>
            <p className="offer">20% OFF</p>
            <button onClick={(e) => handleAddToCart(e)} className="btn">
              Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
            </button>
          </div>
        )}
        <button className="arrow right" onClick={nextSlide}>
          ❯
        </button>
      </div>
      <Toast
        message="Added To Cart ✓"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
