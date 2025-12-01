import Navbar2 from "../../components/navbars/Navbar2";

import "./ShopPage.css";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/productCard";
import SlideItem from "../../components/slideItems";

export default function ShopPage() {
  const { filteredProducts, selectedProduct, setSelectedProduct } =
    useProducts();

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
