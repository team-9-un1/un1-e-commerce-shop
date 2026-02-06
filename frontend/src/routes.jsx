import { Routes, Route } from 'react-router-dom';
import AISizeAssistant from './pages/AISizeAssistant';
import { SizeProvider } from './context/SizeContext';

const AppRoutes = () => {
  return (
    <SizeProvider>
      <Routes>
        <Route path="/" element={<AISizeAssistant />} />
        <Route path="/ai-size" element={<AISizeAssistant />} />
      </Routes>
    </SizeProvider>
  );
};

export default AppRoutes;
