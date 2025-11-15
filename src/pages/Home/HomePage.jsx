import "./HomePage.css";
import { NavLink } from "react-router-dom";
export default function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-content">
        <h2>Unleash Your</h2>
        <h2>Unique Style</h2>
        <button className="btn "> 
        <NavLink to="/shop" className="nav-link">Shop Now</NavLink></button>
                     
      </div>
    </div>
  );
}
