import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section className="section-padding pt-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-celestial-800 mb-4">
            Contáctanos
          </h1>
          <p className="text-xl text-celestial-600 max-w-3xl mx-auto">
            Estamos aquí para servirte y caminar contigo en fe
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información de contacto */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-celestial-50 to-white rounded-2xl p-8 border border-celestial-100">
              <h3 className="text-2xl font-bold text-celestial-800 mb-6">
                Información
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-celestial-100 rounded-xl">
                    <MapPin className="w-6 h-6 text-celestial-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-celestial-700 mb-1">Dirección</h4>
                    <p className="text-gray-700">Calle de la Fe #123</p>
                    <p className="text-gray-700">Ciudad de la Esperanza</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-celestial-100 rounded-xl">
                    <Phone className="w-6 h-6 text-celestial-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-celestial-700 mb-1">Teléfono</h4>
                    <p className="text-gray-700">(555) 123-4567</p>
                    <p className="text-gray-700">Emergencias: (555) 987-6543</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-celestial-100 rounded-xl">
                    <Mail className="w-6 h-6 text-celestial-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-celestial-700 mb-1">Email</h4>
                    <p className="text-gray-700">info@lanubedejehova.org</p>
                    <p className="text-gray-700">oracion@lanubedejehova.org</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-celestial-100 rounded-xl">
                    <Clock className="w-6 h-6 text-celestial-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-celestial-700 mb-1">Horarios</h4>
                    <p className="text-gray-700">Domingos: 9:00 AM - 12:00 PM</p>
                    <p className="text-gray-700">Miércoles: 7:00 PM - 9:00 PM</p>
                    <p className="text-gray-700">Oficina: L-V 9AM-5PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mapa */}
            <div className="bg-gradient-to-br from-celestial-50 to-white rounded-2xl p-8 border border-celestial-100">
              <h3 className="text-2xl font-bold text-celestial-800 mb-6">
                Ubicación
              </h3>
              <div className="h-64 bg-celestial-100 rounded-xl flex items-center justify-center">
                <p className="text-celestial-600">Mapa de ubicación aquí</p>
              </div>
            </div>
          </div>
          
          {/* Formulario */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-celestial-100 p-8">
              <h3 className="text-2xl font-bold text-celestial-800 mb-6">
                Envíanos un mensaje
              </h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-celestial-700 font-medium mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-celestial-300 rounded-xl 
                        focus:outline-none focus:ring-2 focus:ring-celestial-500 
                        focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-celestial-700 font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-celestial-300 rounded-xl 
                        focus:outline-none focus:ring-2 focus:ring-celestial-500 
                        focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-celestial-700 font-medium mb-2">
                    Asunto
                  </label>
                  <select className="w-full px-4 py-3 border border-celestial-300 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-celestial-500 
                    focus:border-transparent">
                    <option>Información general</option>
                    <option>Pedido de oración</option>
                    <option>Consulta pastoral</option>
                    <option>Información sobre ministerios</option>
                    <option>Eventos y actividades</option>
                    <option>Otro</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-celestial-700 font-medium mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    rows="6"
                    required
                    className="w-full px-4 py-3 border border-celestial-300 rounded-xl 
                      focus:outline-none focus:ring-2 focus:ring-celestial-500 
                      focus:border-transparent resize-none"
                  ></textarea>
                </div>
                
                <div className="flex items-center gap-4">
                  <input type="checkbox" id="newsletter" className="w-5 h-5" />
                  <label htmlFor="newsletter" className="text-gray-700">
                    Suscribirme al boletín semanal con reflexiones bíblicas
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Enviar mensaje
                </button>
                
                <p className="text-center text-celestial-600 text-sm">
                  Te responderemos en un plazo máximo de 48 horas.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;