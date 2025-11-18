import "./slideItems.css";
import "../pages/Shop/ShopPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slice/cartSlice";

export default function SlideItem() {
  const go = useNavigate();
  const dispatch = useDispatch();
  const { products } = useProducts();

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
  return (
    <div className="top-slider">
      <button className="arrow left" onClick={prevSlide}>
        ❮
      </button>
      {apiGridProducts[slideIndex] && (
        <div
          className="slide"
          onClick={() =>
            go(`/productDetails/${apiGridProducts[slideIndex].id}`)
          }
          style={{ cursor: "pointer" }}
        >
          <img
            src={apiGridProducts[slideIndex].image}
            alt={apiGridProducts[slideIndex].title}
          />
          <h3>{apiGridProducts[slideIndex].title}</h3>
          <p className="price">
            <span className="original-price">
              ${apiGridProducts[slideIndex].price.toFixed(2)}
            </span>
            <span className="discounted-price">${discountedPrice}</span>
          </p>
          <p className="offer">20% OFF</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart(apiGridProducts[slideIndex]));
            }}
            className="btn"
          >
            Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
          </button>
        </div>
      )}
      <button className="arrow right" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
}
