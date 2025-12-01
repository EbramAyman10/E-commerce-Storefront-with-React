import { useState } from "react";
import "../../pages/Shop/ShopPage.css";

export default function Navbar2({ onselectProduct, selectedProduct }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="mobile-toggle" onClick={() => setOpen(!open)}>
        Filters <i className="fa-solid fa-sliders"></i>
      </button>

      <nav className={`shop-page ${open ? "open" : ""}`}>
        <button
          className={selectedProduct === "newarrival" ? "active" : ""}
          onClick={() => onselectProduct("newarrival")}
        >
          New Arrival
        </button>

        <button
          className={selectedProduct === "toprated" ? "active" : ""}
          onClick={() => onselectProduct("toprated")}
        >
          Top Rated
        </button>

        <button
          className={selectedProduct === "price" ? "active" : ""}
          onClick={() => onselectProduct("price")}
        >
          Price
        </button>
      </nav>
    </>
  );
}
