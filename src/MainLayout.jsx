import { Outlet } from "react-router-dom";
import Navbar from "./components/navbars/Navbar";
import ScrollToTop from "./components/scrollToTop";
import Footer from "./components/footer/footer";

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
