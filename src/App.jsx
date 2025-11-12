import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/Navbar";
import background from "./assets/background.jpg";
function App() {
  return (
    <>
      <img src={background} alt="Background" className="img-fluid"/>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
