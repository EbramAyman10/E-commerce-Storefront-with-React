import "./ShopPage.css";
import { useEffect, useState } from "react";
import Navbar2 from "../components/Navbar2";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("latest");
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=20")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const apiGridProducts = products.slice(0, 6);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % apiGridProducts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [apiGridProducts.length]);

  // MANUAL CONTROL
  const prevSlide = () => {
    setSlideIndex((prev) =>
      prev === 0 ? apiGridProducts.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % apiGridProducts.length);
  };

  const filteredProducts = (() => {
    switch (selectedProduct) {
      case "latest":
        return [...products].slice(-8);
      case "suggested":
        return [...products]
          .sort((a, b) => b.rating.rate - a.rating.rate)
          .slice(0, 8);
      case "trending":
        return [...products]
          .sort((a, b) => b.price - a.price)
          .slice(0, 8);
      case "newarrival":
        return [...products].slice(0, 8);
      default:
        return products.slice(0, 8);
    }
  })();

  return (
    <>
      <div className="top-slider">
        <button className="arrow left" onClick={prevSlide}>❮</button>

        <div className="slide">
          <img src={apiGridProducts[slideIndex]?.image} alt="" />
          <h3>{apiGridProducts[slideIndex]?.title}</h3>
          <p className="price">${apiGridProducts[slideIndex]?.price}</p>
          <p className="offer">20% Offer</p>
          <button className="btn">
            Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
          </button>
        </div>

        <button className="arrow right" onClick={nextSlide}>❯</button>
      </div>

      <div className="container my-5">
        <div className="top-section">
          <div className="left-title">
            <h3 className="mb-2" id="top">Top Products</h3>
          </div>

          <div className="right-navbar">
            <Navbar2
              onselectProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
            />
          </div>
        </div>

        <div className="row g-4" id="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-12 col-md-6 col-lg-3">
              <div className="card shadow-sm top-product-card h-100">
                <img
                  src={product.image}
                  className="card-img-top top-product-img"
                  alt={product.title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="price mt-auto">${product.price}</p>
                  <button className="btn">
                    Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
