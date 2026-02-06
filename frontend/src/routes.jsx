import { Routes, Route, Navigate } from 'react-router-dom';
import AISizeAssistant from './pages/AISizeAssistant';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import { SizeProvider } from './context/SizeContext';

const AppRoutes = () => {
  return (
    <SizeProvider>
      <Routes>
        <Route path="/" element={<AISizeAssistant />} />
        <Route path="/ai-size" element={<AISizeAssistant />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Redirect unknown routes to / for now */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SizeProvider>
  );
};

export default AppRoutes;
