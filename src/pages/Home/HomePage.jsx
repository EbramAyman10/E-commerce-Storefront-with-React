import "./HomePage.css";
import { NavLink } from "react-router-dom";
export default function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-content">
        <h2>Unleash Your</h2>
        <h2>Unique Style</h2>
    <NavLink to="/shop" className="btn">
  Shop Now
</NavLink>

        
      </div>
    </div>
  );
}
