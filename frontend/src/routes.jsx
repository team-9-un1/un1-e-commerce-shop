import { Routes, Route, Navigate } from 'react-router-dom';
import AISizeAssistant from './pages/AISizeAssistant';
import Auth from './pages/Auth';
import { SizeProvider } from './context/SizeContext';

const AppRoutes = () => {
  return (
    <SizeProvider>
      <Routes>
        <Route path="/" element={<AISizeAssistant />} />
        <Route path="/ai-size" element={<AISizeAssistant />} />
        <Route path="/auth" element={<Auth />} />
        {/* Redirect unknown routes to /auth or / for now */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SizeProvider>
  );
};

export default AppRoutes;
