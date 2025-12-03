import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState("newarrival");

  const filteredProducts = (() => {
    switch (selectedProduct) {
      case "newarrival":
        return [...products];
      case "toprated":
        return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
      case "price":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  })();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/products");
        setProducts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducts();
  }, []);
  const value = {
    products,
    filteredProducts,
    selectedProduct,
    setSelectedProduct,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
