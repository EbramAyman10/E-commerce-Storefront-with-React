import "./collections.css";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/productCard";

export default function Collections() {
  const { products } = useProducts();
  const collections = [
    { title: "Men's Clothing", category: "men's clothing" },
    { title: "Women's Clothing", category: "women's clothing" },
    { title: "Jewelry", category: "jewelery" },
    { title: "Electronics", category: "electronics" },
  ];

  return (
    <div className="container collections-page">
      {collections.map((section) => {
        const filtered = products.filter(
          (p) => p.category === section.category
        );

        return (
          <div key={section.category} className="collection-block">
            <h2 className="collection-title">{section.name}</h2>

            <div className="row g-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <hr />
          </div>
        );
      })}
    </div>
  );
}
