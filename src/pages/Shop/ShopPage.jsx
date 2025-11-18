import Navbar2 from "../../components/Navbar2";
import "./ShopPage.css";
import { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/productCard";
import SlideItem from "../../components/slideItems";

export default function ShopPage() {
  const { products } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState("latest");

  const filteredProducts = (() => {
    switch (selectedProduct) {
      case "latest":
        return [...products].slice(-8);
      case "suggested":
        return [...products]
          .sort((a, b) => b.rating.rate - a.rating.rate)
          .slice(0, 8);
      case "trending":
        return [...products].sort((a, b) => b.price - a.price).slice(0, 8);
      case "newarrival":
        return [...products].slice(0, 8);
      default:
        return products.slice(0, 8);
    }
  })();

  return (
    <>
      <SlideItem />

      <div className="container my-5 pb-5">
        <div className="top-section ">
          <div className="left-title">
            <h3 className="mb-2 fs-2" id="top">
              Top Products
            </h3>
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
