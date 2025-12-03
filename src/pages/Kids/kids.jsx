import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/productCard";
import Navbar2 from "../../components/navbars/Navbar2";

export default function Kids() {
  const { filteredProducts, selectedProduct, setSelectedProduct } =
    useProducts();
  const kidsProducts = filteredProducts.filter(
    (item) => item.category === "kids"
  );
  return (
    <>
      <div className="container mt-5">
        <div className="top-section ">
          <div className="left-title">
            <h3 className="mb-2 fs-2" id="top">
              Kids' Products
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
          {kidsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
