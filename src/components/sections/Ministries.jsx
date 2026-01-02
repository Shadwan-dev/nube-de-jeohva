import { Users, Music, BookOpen, Heart, Globe, Mic } from 'lucide-react';

const ministries = [
  {
    title: "Alabanza y Adoración",
    icon: <Music className="w-8 h-8" />,
    description: "Ministerio dedicado a guiar la congregación en adoración a través de la música.",
    leader: "Pastor David Rodríguez",
    schedule: "Viernes 7:00 PM",
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Escuela Dominical",
    icon: <BookOpen className="w-8 h-8" />,
    description: "Enseñanza bíblica para niños y jóvenes de todas las edades.",
    leader: "Hermana María González",
    schedule: "Domingos 11:00 AM",
    color: "from-emerald-500 to-green-400"
  },
  {
    title: "Grupos de Oración",
    icon: <Heart className="w-8 h-8" />,
    description: "Encuentros semanales para oración intercesora y comunión.",
    leader: "Hermano José Pérez",
    schedule: "Martes 8:00 PM",
    color: "from-rose-500 to-pink-400"
  },
  {
    title: "Misiones y Evangelismo",
    icon: <Globe className="w-8 h-8" />,
    description: "Llevando el evangelio a nuestra comunidad y más allá.",
    leader: "Pastor Samuel Martínez",
    schedule: "Sábados 9:00 AM",
    color: "from-amber-500 to-yellow-400"
  },
  {
    title: "Jóvenes en Fe",
    icon: <Users className="w-8 h-8" />,
    description: "Ministerio para jóvenes de 15 a 25 años.",
    leader: "Hermano Andrés López",
    schedule: "Viernes 8:00 PM",
    color: "from-purple-500 to-violet-400"
  },
  {
    title: "Enseñanza Bíblica",
    icon: <Mic className="w-8 h-8" />,
    description: "Estudios profundos de la palabra de Dios para adultos.",
    leader: "Pastora Ana Sánchez",
    schedule: "Miércoles 7:00 PM",
    color: "from-indigo-500 to-blue-400"
  }
];

const Ministries = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-celestial-800 mb-4">
            Nuestros Ministerios
          </h2>
          <p className="text-xl text-celestial-600 max-w-3xl mx-auto">
            Cada ministerio tiene un propósito único para edificar el cuerpo de Cristo y servir a la comunidad.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                border border-celestial-100 overflow-hidden transition-all 
                duration-500 hover:-translate-y-2"
            >
              {/* Header con gradiente */}
              <div className={`h-2 bg-gradient-to-r ${ministry.color}`}></div>
              
              <div className="p-8">
                {/* Icono */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${ministry.color} 
                  text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {ministry.icon}
                </div>
                
                {/* Título */}
                <h3 className="text-2xl font-bold text-celestial-800 mb-3">
                  {ministry.title}
                </h3>
                
                {/* Descripción */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {ministry.description}
                </p>
                
                {/* Información adicional */}
                <div className="space-y-3 pt-6 border-t border-celestial-100">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-celestial-500 rounded-full"></div>
                    <span className="text-celestial-700 font-medium">Líder:</span>
                    <span className="text-gray-700">{ministry.leader}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-celestial-500 rounded-full"></div>
                    <span className="text-celestial-700 font-medium">Horario:</span>
                    <span className="text-gray-700">{ministry.schedule}</span>
                  </div>
                </div>
                
                {/* Botón */}
                <button className="mt-8 w-full py-3 border-2 border-celestial-500 
                  text-celestial-700 rounded-xl font-medium hover:bg-celestial-50 
                  transition-all duration-300 group-hover:border-celestial-600 
                  group-hover:text-celestial-800">
                  Más Información
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA final */}
        <div className="text-center mt-16">
          <p className="text-xl text-celestial-700 mb-8">
            ¿Te interesa servir en algún ministerio?
          </p>
          <button className="btn-primary text-lg px-10 py-4">
            Contáctanos para Servir
          </button>
        </div>
      </div>
    </section>
  );
};

export default Ministries;