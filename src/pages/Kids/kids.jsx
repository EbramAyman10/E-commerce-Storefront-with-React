import "../Men/men.css";
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

  export default function Kids() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
          const filteredData = data.filter(
            item => item.category === "kid's clothing"
          );
          setProducts(filteredData);
        });
    }, []);
  
    return (
      <>
        <div className="container mt-5">
          <div className="row g-4">
            {products.map(product => (
              <div key={product.id} className="col-12 col-md-6 col-lg-3">
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                  />
  
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    {renderStars(product.rating.rate)}
                    <p className="price mt-auto">${product.price}</p>
                                       <Link to={`/cart/${product.id}`} className="btn">
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
  