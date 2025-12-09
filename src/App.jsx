import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/navbars/Navbar";
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
import CartPage from "./pages/Cart/Cart";
import AboutPage from "./pages/contact/AboutPage";
import Footer from "./components/footer/footer";
import ScrollToTop from "./components/scrollToTop";
import OrderPage from "./pages/order/Order";
import MainLayout from "./MainLayout";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          {/* <Route path="/collections" element={<Collections />} /> */}
          <Route path="/login" element={<Login2 />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
