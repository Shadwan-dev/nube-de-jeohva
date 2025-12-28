// src/components/Layout/Layout.jsx
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      <Header />
      <main className="pt-20"> {/* Ajuste para header fijo */}
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;