import { Link } from "react-router-dom";
export default function SlideItem({ product }) {
  const discountedPrice = (product.price * 0.8).toFixed(2);
  return (
    <div className="slide">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">
        <span className="original-price">${product.price.toFixed(2)}</span>
        <span className="discounted-price">${discountedPrice}</span>
      </p>
      <p className="offer">20% OFF</p>
      <Link to={`/cart/${product.id}`} className="btn">
        Add to Cart <i className="fa-solid fa-cart-arrow-down"></i>
      </Link>
    </div>
  );
}
