import { Routes, Route } from 'react-router-dom';
import Checkout from './pages/Checkout';
// import Home from './pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<div>Home Page (Coming Soon)</div>} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default AppRoutes;
