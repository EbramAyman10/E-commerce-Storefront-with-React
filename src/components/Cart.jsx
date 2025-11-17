import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Cart.css";

export default function Cart() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDown, setSelectedDown] = useState("Description");

  const sizes = ["39", "40", "41", "42", "43", "44", "45", "46", "47"];
  const colors = [0, 1, 2, 3]; 

useEffect(() => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => setProduct(data));

  fetch(`https://fakestoreapi.com/products`)
    .then((res) => res.json())
    .then((data) => {
      const filtered = data.filter(
        (item) => item.category === product?.category && item.id !== Number(id)
      );
      setRelatedProducts(filtered);
    });
}, [id, product?.category]);

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
  

  if (!product) return <h2>Loading...</h2>;

  return (
    <>
      <div className="cart-container row">
        <div className="cart-images col-6">
         <div className="image-container"> <img className="main-image" src={product.image} alt={product.title} /></div>
          <div className="image-row">
            {colors.map((_, index) => (
              <div
                key={index}
                className={`thumb1 ${selectedColor === index ? "active-color" : ""}`}
                onClick={() => setSelectedColor(index)}
              >
                <img src={product.image} alt={`thumb-${index}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="cart-info col-6">
          <p className="company">{product.category}</p>
          <h1>{product.title}</h1>
          <h1 className="stars">{renderStars(product.rating.rate)}</h1>
          <p className="price">${product.price.toFixed(2)}</p>

          <h3>Select Color:</h3>
          <div className="image-row">
            {colors.map((_, index) => (
              <div
                key={index}
                className={`thumb ${selectedColor === index ? "active-color" : ""}`}
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
                className={`size-square ${selectedSize === size ? "selected-size" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>

          <div className="cart-actions">
            <button className="btn">Add to Cart</button>
            <button className="heart">
              <i className="fa-regular fa-heart"></i>
            </button>
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
            <h3 className="mb-2" id="top">Related Products</h3>
          </div>
        </div>
        <div className="row g-4">
          {relatedProducts.map((prod) => (
            <div key={prod.id} className="col-12 col-md-6 col-lg-3">
              <div className="card shadow-sm top-product-card h-100">
                <img
                  src={prod.image}
                  className="card-img-top top-product-img"
                  alt={prod.title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{prod.title}</h5>
                  {renderStars(prod.rating.rate)}
                  <p className="price mt-auto">${prod.price.toFixed(2)}</p>
                  <Link to={`/cart/${prod.id}`} className="btn">
                    Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
