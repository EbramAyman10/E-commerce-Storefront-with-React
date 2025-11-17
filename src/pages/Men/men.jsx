
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/productCard";

export default function Men() {
  const { products } = useProducts();

  const menProducts = products.filter(
    (item) => item.category === "men's clothing"
  );
  return (
    <>
      <div className="container mt-5">
        <div className="row g-4">
          {menProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
