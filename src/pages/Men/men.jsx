import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/productCard";
import Navbar2 from "../../components/navbars/Navbar2";
import { useRef, useState } from "react";
import Pagination from "../../components/pagination/pagination";

export default function Men() {
  const [page, setPage] = useState(1);

  const { filteredProducts, selectedProduct, setSelectedProduct } =
    useProducts();
  const menProducts = filteredProducts.filter(
    (item) => item.category === "men"
  );
  const productsPerPage = 8;
  const totalPages = Math.ceil(menProducts.length / productsPerPage);

  const startIndex = (page - 1) * productsPerPage;
  const currentProducts = menProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );
  const scrollToProduct = useRef(null);
  const goToTop = () => {
    scrollToProduct.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div ref={scrollToProduct} className="container mt-5">
        <div  className="top-section ">
          <div className="left-title">
            <h3 className="mb-2 fs-2" id="top">
              Men's Products
            </h3>
          </div>

          <div className="right-navbar">
            <Navbar2
              onselectProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
            />
          </div>
        </div>
        <div className="row g-4">
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
