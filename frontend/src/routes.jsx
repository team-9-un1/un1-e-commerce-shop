import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:category" element={<Products />} />
      <Route path="/product/:category/:id" element={<ProductDetail />} />
    </Routes>
  );
};

export default AppRoutes;
