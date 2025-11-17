import "./collections.css";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import RenderStars from "../../components/stars";

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
            <h2 className="collection-title">{section.title}</h2>

            <div className="row g-4">
              {filtered.map((product) => (
                <div key={product.id} className="col-12 col-md-6 col-lg-3">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="card-img-top"
                    />

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.title}</h5>
                      <RenderStars rating={product.rating.rate} />

                      <p className="price mt-auto">${product.price}</p>

                      <Link to={`/cart/${product.id}`} className="btn">
                        Add to Cart{" "}
                        <i className="fa-solid fa-cart-arrow-down"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr />
          </div>
        );
      })}
    </div>
  );
}
