import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/Navbar";
import ShopPage from "./pages/Shop/ShopPage";
import Men from "./pages/Men/men";
import Women from "./pages/Women/women";
import Kids from "./pages/Kids/kids";
import Collections from "./pages/Collections/collections";
import Login from "./pages/Login/login";
import SearchPage from "./pages/Search/search";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProductDetails from "./components/productDetails";
import Login2 from "./pages/Login/Login2";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
}

export default App;
