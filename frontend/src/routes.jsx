import { Routes, Route, Navigate } from 'react-router-dom';
import AISizeAssistant from './pages/AISizeAssistant';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import { SizeProvider } from './context/SizeContext';
import { CartProvider } from './context/CartContext';
import ShoppingCart from './pages/ShoppingCart';

const AppRoutes = () => {
  return (
    <CartProvider>
      <SizeProvider>
        <Routes>
          <Route path="/" element={<AISizeAssistant />} />
          <Route path="/ai-size" element={<AISizeAssistant />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SizeProvider>
    </CartProvider>
  );
};

export default AppRoutes;
