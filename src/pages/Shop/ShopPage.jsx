import Navbar2 from "../../components/navbars/Navbar2";

import "./ShopPage.css";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/productCard";
import SlideItem from "../../components/slideItems";
import { useRef, useState } from "react";
import Pagination from "../../components/pagination/pagination";

export default function ShopPage() {
  const [page, setPage] = useState(1);
  const { filteredProducts, selectedProduct, setSelectedProduct } =
    useProducts();

  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (page - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );
  const scrollToProduct = useRef(null);
  const goToTop = () => {
    scrollToProduct.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <SlideItem />

      <div className="container my-5 pb-5">
        <div ref={scrollToProduct} className="top-section ">
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
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        goTop={goToTop}
      />
    </>
  );
}
