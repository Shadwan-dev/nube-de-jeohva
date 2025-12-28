import React from 'react';

function RetailPage() {
  const products = [
    { name: "Aguja Fresca", price: "25€/kg", unit: "Por pieza o fileteado" },
    { name: "Dorado (Mahi-mahi)", price: "28€/kg", unit: "Filetes o entero" },
    { name: "Peto (Wahoo)", price: "30€/kg", unit: "Rodajas o filetes" },
    { name: "Mero del Caribe", price: "35€/kg", unit: "Lomos o filetes" },
    { name: "Tiburón Caribeño", price: "18€/kg", unit: "Filetes o rodajas" },
    { name: "Emperador", price: "32€/kg", unit: "Filetes premium" },
  ];

  return (
    <div className="py-8">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tienda <span className="text-cyan-600">Minorista</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Pescado caribeño fresco directo a tu hogar. Calidad premium para particulares.
          </p>
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-2 rounded-full font-medium">
            🚚 Envío a domicilio en 24-48h
          </div>
        </div>

        {/* Productos destacados */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <p className="text-gray-500 text-sm">{product.unit}</p>
                    </div>
                    <div className="text-3xl">🐟</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                      <p className="text-sm text-gray-500">Precio por kilo</p>
                    </div>
                    <button className="btn btn-primary">
                      Añadir al carrito
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">✅</span>
                    Disponible para envío inmediato
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proceso de compra */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Cómo comprar</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-bold mb-2">Selecciona productos</h3>
              <p className="text-gray-600 text-sm">Elige entre nuestra variedad</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-bold mb-2">Añade al carrito</h3>
              <p className="text-gray-600 text-sm">Cantidades que necesites</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-bold mb-2">Completa pedido</h3>
              <p className="text-gray-600 text-sm">Datos de envío y pago</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">4</span>
              </div>
              <h3 className="font-bold mb-2">Recibe en casa</h3>
              <p className="text-gray-600 text-sm">Fresco y listo para cocinar</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">¿Tienes dudas?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestro equipo está disponible para ayudarte con tu pedido
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/5359994783" className="btn btn-accent">
              💬 WhatsApp
            </a>
            <a href="tel:+5359994783" className="btn btn-outline border-blue-600 text-blue-600">
              📞 Llamar
            </a>
            <a href="mailto:tienda@pescaatlantico.com" className="btn btn-outline border-cyan-600 text-cyan-600">
              ✉️ Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetailPage;