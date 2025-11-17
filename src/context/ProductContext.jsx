import axios from "axios";
import {
  createContext,
  useState,
  useEffect,
  Children,
  useContext,
} from "react";

const ProductContext = createContext();

export function ProductProvider({children}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          "https://fakestoreapi.com/products?limit=20"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{products}}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
