import React from 'react';

function Products() {
  const fishSpecialties = ["Aguja", "Tiburón", "Emperador", "Dorado", "Peto", "Mero"];
  
  const products = [
    { name: "Aguja del Caribe", price: "€25/kg", color: "blue", icon: "🐟" },
    { name: "Tiburón Caribeño", price: "€18/kg", color: "gray", icon: "🦈" },
    { name: "Emperador", price: "€32/kg", color: "cyan", icon: "👑" },
    { name: "Dorado (Mahi-mahi)", price: "€28/kg", color: "amber", icon: "🐠" },
    { name: "Peto (Wahoo)", price: "€30/kg", color: "green", icon: "⚡" },
    { name: "Mero del Caribe", price: "€35/kg", color: "purple", icon: "🎣" },
  ];

  return (
    <>
      {/* Sección de especialidades */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50 to-cyan-50">
  <div className="container">
    <div className="text-center mb-10">
      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        <span className="text-blue-600">🎣</span> Nuestras Especialidades
      </h3>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Especies únicas del Caribe, capturadas con técnicas sostenibles
      </p>
    </div>
    
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {fishSpecialties.map((fish) => (
        <div
          key={fish}
          className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
        >
          {/* Fondo gradiente con animación */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Contenido */}
          <div className="relative p-4 text-center">
            {/* Icono del pez */}
            <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center group-hover:from-blue-200 group-hover:to-cyan-200 transition-all duration-300">
                <span className="text-3xl">🐟</span>
              </div>
            </div>
            
            {/* Nombre del pez */}
            <div className="mb-2">
              <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                {fish}
              </h4>
            </div>
            
            {/* Badge de disponibilidad */}
            <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors duration-300">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
              <span className="text-xs font-medium text-green-700">Disponible</span>
            </div>
          </div>
          
          {/* Efecto de borde superior al hover */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </div>
      ))}
    </div>
    
    {/* Información adicional debajo */}
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-2xl mb-2">🌊</div>
          <h4 className="font-bold text-gray-900 mb-2">Origen Caribeño</h4>
          <p className="text-gray-600 text-sm">Capturado en aguas del Caribe</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-2">✅</div>
          <h4 className="font-bold text-gray-900 mb-2">Frescura Garantizada</h4>
          <p className="text-gray-600 text-sm">Entrega en 24-48 horas</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-2">♻️</div>
          <h4 className="font-bold text-gray-900 mb-2">Pesca Sostenible</h4>
          <p className="text-gray-600 text-sm">Prácticas responsables</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Sección de productos detallados */}
      <section id="productos" className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">
            Productos Caribeños
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Especialistas en pescados caribeños medianos y grandes: Aguja,
            Tiburón, Emperador, Dorado, Peto y más.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="card overflow-hidden group">
                <div className={`h-48 bg-gradient-to-r from-${product.color}-500 to-${product.color}-600 flex items-center justify-center`}>
                  <span className="text-6xl">{product.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">
                    Fresco del Caribe, capturado sosteniblemente
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {product.price}
                    </span>
                    <button className="btn btn-primary btn-sm">
                      Cotizar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;