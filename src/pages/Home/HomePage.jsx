import "./HomePage.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-page">
        <div className="hero-content">
          <h2>Unleash Your</h2>
          <h2>Unique Style</h2>

          <button className="btn" onClick={() => navigate("/shop")}>
            Shop Now
          </button>
        </div>
      </div>
      <div className="men-section my-5" onClick={() => navigate("/men")}>
        <div className="container text-center py-5 text-white d-flex flex-column justify-content-center align-items-center h-100">
          <h2 className="fw-bold">Men's Collection</h2>
          <h6 className="text-decoration-underline">Click here to see more</h6>
        </div>
      </div>
      <div className="women-section my-5" onClick={() => navigate("/women")}>
        <div className="container text-center py-5 text-white d-flex flex-column justify-content-center align-items-center h-100">
          <h2 className="fw-bold">Women's Collection</h2>
          <h6 className="text-decoration-underline">Click here to see more</h6>
        </div>
      </div>
      <div className="kids-section mt-5" onClick={() => navigate("/kids")}>
        <div className="container  text-center py-5 text-white d-flex flex-column justify-content-center align-items-center h-100">
          <h2 className="fw-bold kids-header">Kids' Collection</h2>
          <h6 className="text-decoration-underline">Click here to see more</h6>
        </div>
      </div>
    </div>
  );
}
