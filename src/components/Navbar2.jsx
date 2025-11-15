import { useState } from "react";
import "../pages/ShopPage.css";


export default function Navbar2({ onselectProduct, selectedProduct }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="mobile-toggle" onClick={() => setOpen(!open)}>
        Filters <i className="fa-solid fa-sliders"></i>
      </button>

      <nav className={`shop-page ${open ? "open" : ""}`}>
        <button
          className={selectedProduct === "latest" ? "active" : ""}
          onClick={() => onselectProduct("latest")}
        >
          Latest
        </button>

        <button
          className={selectedProduct === "suggested" ? "active" : ""}
          onClick={() => onselectProduct("suggested")}
        >
          Suggested
        </button>

        <button
          className={selectedProduct === "trending" ? "active" : ""}
          onClick={() => onselectProduct("trending")}
        >
          Trending
        </button>

        <button
          className={selectedProduct === "newarrival" ? "active" : ""}
          onClick={() => onselectProduct("newarrival")}
        >
          New Arrival
        </button>
      </nav>
    </>
  );
}
