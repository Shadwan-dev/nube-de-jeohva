import React, { lazy, Suspense } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const ProductsComponent = lazy(() => import('../../components/Products/Products'));

function ProductsPage() {
  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-4xl font-bold text-center mb-2">Nuestro Catálogo</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Descubre nuestra selección premium de pescados caribeños
        </p>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <ProductsComponent />
      </Suspense>
      
      {/* Información adicional para la página de productos */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">24-48h en la península</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl mb-4">🌊</div>
              <h3 className="text-xl font-bold mb-2">Fresco del Día</h3>
              <p className="text-gray-600">Capturado y enviado diariamente</p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-xl">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Calidad Garantizada</h3>
              <p className="text-gray-600">Certificados de origen y calidad</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductsPage;