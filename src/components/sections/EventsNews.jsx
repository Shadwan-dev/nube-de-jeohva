import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const events = [
  {
    id: 1,
    title: "Retiro de Oración",
    date: "15 Mar 2024",
    time: "8:00 AM - 5:00 PM",
    location: "Campamento Monte de los Olivos",
    description: "Un día completo de comunión con Dios, alabanza y enseñanza.",
    category: "Retiro",
    image: "https://images.unsplash.com/photo-1549056572-75914d5d03fd?q=80&w=2070"
  },
  {
    id: 2,
    title: "Concierto de Alabanza",
    date: "22 Mar 2024",
    time: "7:00 PM - 9:00 PM",
    location: "Auditorio Principal",
    description: "Noche especial de adoración con bandas invitadas.",
    category: "Concierto",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070"
  },
  {
    id: 3,
    title: "Conferencia para Matrimonios",
    date: "29-30 Mar 2024",
    time: "Todo el día",
    location: "Salón de Convenciones",
    description: "Fortaleciendo los lazos matrimoniales con principios bíblicos.",
    category: "Conferencia",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
  },
  {
    id: 4,
    title: "Campaña de Evangelismo",
    date: "5 Abr 2024",
    time: "3:00 PM - 7:00 PM",
    location: "Parque Central",
    description: "Llevando el mensaje de esperanza a nuestra comunidad.",
    category: "Evangelismo",
    image: "https://images.unsplash.com/photo-1507835661088-ac1e84fe645f?q=80&w=2070"
  }
];

const EventsNews = () => {
  const [activeEvent, setActiveEvent] = useState(events[0]);

  return (
    <section className="section-padding bg-gradient-to-b from-white to-celestial-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-celestial-800 mb-4">
            Próximos Eventos
          </h2>
          <p className="text-xl text-celestial-600 max-w-3xl mx-auto">
            Mantente al día con nuestras actividades y eventos especiales
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de eventos */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <div 
                  key={event.id}
                  onClick={() => setActiveEvent(event)}
                  className={`bg-white rounded-2xl shadow-lg border overflow-hidden 
                    cursor-pointer transition-all duration-300 hover:shadow-xl
                    ${activeEvent.id === event.id ? 'border-celestial-500 ring-2 ring-celestial-100' : 'border-celestial-100'}
                  `}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-celestial-100 text-celestial-700 rounded-full text-sm font-medium">
                        {event.category}
                      </span>
                      <span className="text-sm text-celestial-600">{event.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-celestial-800 mb-3">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <button className="flex items-center gap-2 text-celestial-600 hover:text-celestial-800 font-medium">
                      Ver detalles
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Evento destacado */}
          <div className="bg-gradient-to-br from-celestial-600 to-celestial-800 
            rounded-2xl shadow-2xl text-white p-8">
            <div className="mb-6">
              <Calendar className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Evento Destacado</h3>
              <p className="text-celestial-200">No te pierdas esta bendición</p>
            </div>
            
            <div className="mb-8">
              <h4 className="text-3xl font-serif font-bold mb-4">{activeEvent.title}</h4>
              <p className="text-celestial-100 mb-6">{activeEvent.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-celestial-200">Fecha</p>
                    <p className="font-semibold">{activeEvent.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-celestial-200">Horario</p>
                    <p className="font-semibold">{activeEvent.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-celestial-200">Ubicación</p>
                    <p className="font-semibold">{activeEvent.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-white text-celestial-800 py-4 
              rounded-xl font-bold text-lg hover:bg-celestial-50 
              transition-all duration-300 flex items-center justify-center gap-2">
              Confirmar Asistencia
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-center text-celestial-200 text-sm">
                "Donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos."
                <br />
                <span className="font-medium">Mateo 18:20</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-r from-celestial-50 to-white 
          rounded-2xl border border-celestial-200 p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-celestial-800 mb-4">
              Recibe noticias y devocionales
            </h3>
            <p className="text-celestial-600 mb-6">
              Suscríbete a nuestro boletín semanal con reflexiones y anuncios
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="tu@email.com"
                className="flex-grow px-6 py-3 border border-celestial-300 
                  rounded-xl focus:outline-none focus:ring-2 
                  focus:ring-celestial-500 focus:border-transparent"
              />
              <button className="btn-primary px-8 py-3 whitespace-nowrap">
                Suscribirme
              </button>
            </div>
            
            <p className="text-sm text-celestial-500 mt-4">
              No spam. Solo bendiciones semanales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsNews;