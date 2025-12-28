import React, { lazy, Suspense } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function WholesalePage() {
  return (
    <div className="py-8">
      <div className="container">
        {/* Header de la página */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Área <span className="text-blue-600">Mayorista</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones a medida para restaurantes, hoteles y distribuidores
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Ventajas para Mayoristas</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Precios Competitivos</h3>
                  <p className="text-gray-600">Descuentos por volumen y contratos anuales</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Entrega Programada</h3>
                  <p className="text-gray-600">Entregas regulares según tus necesidades</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Asesoramiento Personalizado</h3>
                  <p className="text-gray-600">Equipo especializado para tu negocio</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Solicita Presupuesto</h3>
            <p className="text-gray-600 mb-6">
              Completa el formulario y nuestro equipo se pondrá en contacto contigo
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nombre de la empresa"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email corporativo"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="Describe tus necesidades..."
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
              <button type="submit" className="btn btn-primary w-full py-3">
                Solicitar Presupuesto Mayorista
              </button>
            </form>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">¿Listo para trabajar juntos?</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Únete a nuestros más de 200 clientes mayoristas satisfechos
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+5359994783" className="btn btn-accent">
              📞 Llamar Ahora
            </a>
            <a href="mailto:mayorista@pescaatlantico.com" className="btn btn-outline border-white text-white">
              ✉️ Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WholesalePage;