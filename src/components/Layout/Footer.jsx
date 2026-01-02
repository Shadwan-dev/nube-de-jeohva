import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-celestial-900 text-white py-8 mt-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-script mb-2">La Nube de Jehová</h3>
            <p className="text-celestial-200">
              Un lugar de refugio y esperanza
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="flex items-center justify-center md:justify-end gap-2 text-celestial-200">
              Hecho con <Heart className="w-4 h-4 fill-red-500 text-red-500" /> para la gloria de Dios
            </p>
            <p className="mt-2 text-sm text-celestial-300">
              © {new Date().getFullYear()} - Todos los derechos reservados
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-celestial-700 text-center text-celestial-400 text-sm">
          <p>"Y les digo que pedirán en mi nombre, y no les diré que yo rogaré al Padre por ustedes" - Juan 16:26</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;