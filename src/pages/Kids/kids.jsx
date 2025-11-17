import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/productCard";

export default function Kids() {
  const { products } = useProducts();

  const kidsProducts = products.filter(
    (item) => item.category === "men's clothing"
  );
  return (
    <>
      <div className="container mt-5">
        <div className="row g-4">
          {kidsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
