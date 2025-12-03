import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./productDetails.css";
import { useProducts } from "../context/ProductContext";
import RenderStars from "./stars";
import ProductCard from "./productCard";
import { addProductToCart } from "../store/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./Toast";
export default function ProductDetails() {
  const [showToast, setShowToast] = useState(false);
  const [heart, setHeart] = useState(false);
  const dispatch = useDispatch();
  const go = useNavigate();

  const { id } = useParams();
  const { products } = useProducts();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDown, setSelectedDown] = useState("Description");
  const { isLoggedIn } = useSelector((state) => state.user);

  const sizes = ["39", "40", "41", "42", "43", "44", "45", "46", "47"];
  const colors = [0, 1, 2, 3];

  const product = products.find((p) => p._id === id);
  useEffect(() => {
    if (product) {
      const filtered = products.filter(
        (item) => item.category === product.category && item.id !== product._id
      );
      setRelatedProducts(filtered.slice(0, 8));
    }
  }, [product, products]);
  if (!product) return <h2>Loading...</h2>;

  return (
    <>
      <div className="cart-container row" id="product-top">
        <div className="cart-images col-6">
          <div className="image-container">
            {" "}
            <img
              className="main-image"
              src={product.image}
              alt={product.title}
            />
          </div>
          <div className="image-row">
            {colors.map((_, index) => (
              <div
                key={index}
                className={`thumb1 ${
                  selectedColor === index ? "active-color" : ""
                }`}
                onClick={() => setSelectedColor(index)}
              >
                <img src={product.image} alt={`thumb-${index}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="cart-info col-6">
          <p className="company">{product.category}</p>
          <h1 className="fs-3">{product.title}</h1>
          <h1 className="stars">
            <RenderStars rating={product.rating.rate} />
          </h1>
          <p className="price">${product.price.toFixed(2)}</p>

          <h3>Select Color:</h3>
          <div className="image-row">
            {colors.map((_, index) => (
              <div
                key={index}
                className={`thumb ${
                  selectedColor === index ? "active-color" : ""
                }`}
                onClick={() => setSelectedColor(index)}
              >
                <img src={product.image} alt={`thumb-${index}`} />
              </div>
            ))}
          </div>

          <h3>Size - EU Men</h3>
          <div className="sizes-grid">
            {sizes.map((size) => (
              <div
                key={size}
                className={`size-square ${
                  selectedSize === size ? "selected-size" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>

          <div className="cart-actions">
            <button
              className="btn"
              onClick={() => {
                if (isLoggedIn) {
                  dispatch(addProductToCart(product._id, 1));
                  setShowToast(true);
                } else {
                  go("/login");
                  alert("Please log in to add items to your cart.");
                }
              }}
            >
              Add to Cart
            </button>
            <span className="heart" onClick={() => setHeart(!heart)}>
              {heart ? (
                <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
              ) : (
                <i className="fa-regular fa-heart"></i>
              )}
            </span>
          </div>

          <div className="delivery">
            <i className="fa-solid fa-truck"></i>
            <span>Free delivery on order over $30</span>
          </div>
        </div>
      </div>

      <div className="down-section">
        <div className="tab-buttons">
          <button
            className={selectedDown === "Description" ? "active" : ""}
            onClick={() => setSelectedDown("Description")}
          >
            Description
          </button>
          <h1>/</h1>
          <button
            className={selectedDown === "Review" ? "active" : ""}
            onClick={() => setSelectedDown("Review")}
          >
            Review
          </button>
        </div>

        <div className="tab-content">
          {selectedDown === "Description" && (
            <>
              <h3>Description</h3>
              <p>{product.description}</p>
            </>
          )}

          {selectedDown === "Review" && (
            <>
              <h3>Review</h3>
              <p>{product.rating?.rate} ⭐</p>
              <p>{product.description}</p>
            </>
          )}
        </div>
      </div>

      <div className="container my-5">
        <div className="top-section">
          <div className="left-title">
            <h3 className="mb-2" id="top">
              Related Products
            </h3>
          </div>
        </div>
        <div className="row g-4">
          {relatedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
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
