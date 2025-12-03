import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/productCard";
import Navbar2 from "../../components/navbars/Navbar2";

export default function Women() {
  const { filteredProducts, selectedProduct, setSelectedProduct } =
    useProducts();
  const womenProducts = filteredProducts.filter(
    (item) => item.category === "women"
  );
  return (
    <>
      <div className="container mt-5">
        <div className="top-section ">
          <div className="left-title">
            <h3 className="mb-2 fs-2" id="top">
              Women's Products
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
          {womenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
