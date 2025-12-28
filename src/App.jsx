import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import './styles/globals.css';

// Lazy load de todas las páginas
const Home = lazy(() => import('./pages/Home/Home'));
const ProductsPage = lazy(() => import('./pages/Products/ProductsPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const WholesalePage = lazy(() => import('./pages/Wholesale/WholesalePage'));
const RetailPage = lazy(() => import('./pages/Retail/RetailPage'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/mayorista" element={<WholesalePage />} />
            <Route path="/minorista" element={<RetailPage />} />
            
            <Route path="*" element={
              <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
                <a href="/" className="btn btn-primary px-6 py-3">
                  Volver al inicio
                </a>
              </div>
            } />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;