import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./page/LandingPage";
import LoginPage from "./page/LoginPage";
import CartPage from "./page/CartPage";
import HistoryPage from "./page/HistoryPage";
import PurchasedPage from "./page/PurchasedPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/history" element={<HistoryPage />} />
        {/* <Route path="/purchase" element={<PurchasedPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
