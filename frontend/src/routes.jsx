import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<div>Home Page (Coming Soon)</div>} />
    </Routes>
  );
};

export default AppRoutes;
