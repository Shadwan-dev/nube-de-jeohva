import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white py-12">
      <div className="container">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">PescaAtlantico</h3>
          <p className="text-cyan-100 mb-6 max-w-2xl mx-auto">
            Líderes en comercio pesquero oriental de Cuba desde 2020. Mayorista y
            minorista con entrega en 48h.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="btn btn-accent">📞 +53 5999 4783</button>
            <button className="btn btn-outline border-white/30 text-white">
              📧 pescaatlantico@gmail.com
            </button>
          </div>
          <p className="mt-8 text-sm text-cyan-200">
            © {currentYear} PescaAtlantico. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;