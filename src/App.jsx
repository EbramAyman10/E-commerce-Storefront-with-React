import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import NavbarComponent from "./components/Navbar";

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
