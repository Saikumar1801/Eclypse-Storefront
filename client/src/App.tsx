// client/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage'; // We will create this
import NotFoundPage from './pages/NotFoundPage'; // Optional: for 404 routes

function App() {
  return (
    <Router>
      <MainLayout> {/* MainLayout provides Header and Footer for all pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          {/* Add other routes here later, e.g., /cart, /checkout, /category/:categoryName */}
          <Route path="*" element={<NotFoundPage />} /> {/* Catch-all 404 route */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;