import "./collections.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

export default function Collections() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const collections = [
    { title: "Men's Clothing", category: "men's clothing" },
    { title: "Women's Clothing", category: "women's clothing" },
    { title: "Jewelry", category: "jewelery" },
    { title: "Electronics", category: "electronics" }
  ];

  return (
    <div className="container collections-page">
      {collections.map((section) => {
        const filtered = products.filter(
          (p) => p.category === section.category
        );

        return (
          <div key={section.category} className="collection-block">
            <h2 className="collection-title">{section.title}</h2>

            <div className="row g-4">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="col-12 col-md-6 col-lg-3"
                >
                  <div className="card h-100 shadow-sm">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="card-img-top"
                    />

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.title}</h5>
                      {renderStars(product.rating.rate)}
                      <p className="price mt-auto">${product.price}</p>

                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-primary mt-auto"
                      >
                    Add to Cart
                    <i className="fa-solid fa-cart-arrow-down"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr />
          </div>
        );
      })}
    </div>
  );
}
