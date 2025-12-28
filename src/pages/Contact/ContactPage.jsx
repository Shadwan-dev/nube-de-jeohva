import React, { lazy, Suspense } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const ContactForm = lazy(() => import('../../components/ContactForm/ContactForm'));

function ContactPage() {
  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-4xl font-bold text-center mb-2">Contacto</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          ¿Tienes preguntas? Contáctanos, estamos aquí para ayudarte
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">📞</div>
            <h3 className="text-xl font-bold mb-2">Teléfono</h3>
            <p className="text-gray-600 mb-2">+53 5999 4783</p>
            <p className="text-sm text-gray-500">Lun-Vie: 8:00-18:00</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">✉️</div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-gray-600 mb-2">pescaatlantico@gmail.com</p>
            <p className="text-sm text-gray-500">Respuesta en 48h</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">📍</div>
            <h3 className="text-xl font-bold mb-2">Oficina Central</h3>
            <p className="text-gray-600 mb-2">Puerto Pesquero, Bahia Baracoa</p>
            <p className="text-sm text-gray-500">Baracoa, Guantanamo</p>
          </div>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}

export default ContactPage;