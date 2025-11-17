import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/productCard";

export default function Women() {
  const { products } = useProducts();

  const womenProducts = products.filter(
    (item) => item.category === "women's clothing"
  );
  return (
    <>
      <div className="container mt-5">
        <div className="row g-4">
          {womenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
