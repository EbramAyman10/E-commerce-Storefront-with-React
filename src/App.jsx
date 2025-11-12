import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/Navbar";
import background from "./assets/background.jpg";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
