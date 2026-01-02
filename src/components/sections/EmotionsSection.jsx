import { Heart, Shield, Cloud, Sun, Moon, Wind } from 'lucide-react';
import { useState } from 'react';

const emotionsData = {
  ansiedad: {
    title: "Ansiedad",
    icon: <Wind className="w-8 h-8" />,
    color: "from-amber-500 to-orange-400",
    verses: [
      {
        text: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.",
        reference: "Filipenses 4:6",
        promise: "Dios quiere que le lleves todas tus preocupaciones."
      },
      {
        text: "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.",
        reference: "1 Pedro 5:7",
        promise: "Dios se preocupa personalmente por ti."
      }
    ],
    prayer: "Padre, en medio de mi ansiedad, confío en ti. Toma mi preocupación y dame tu paz que sobrepasa todo entendimiento."
  },
  tristeza: {
    title: "Tristeza",
    icon: <Cloud className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-400",
    verses: [
      {
        text: "Jehová está cerca de los quebrantados de corazón; y salva a los contritos de espíritu.",
        reference: "Salmos 34:18",
        promise: "Dios está más cerca cuando más te duele el corazón."
      },
      {
        text: "Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor.",
        reference: "Apocalipsis 21:4",
        promise: "Un día no habrá más dolor."
      }
    ],
    prayer: "Señor, sana mi corazón quebrantado. Sé mi consuelo en esta tristeza y lléname de tu gozo eterno."
  },
  miedo: {
    title: "Miedo",
    icon: <Shield className="w-8 h-8" />,
    color: "from-purple-500 to-violet-400",
    verses: [
      {
        text: "Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.",
        reference: "2 Timoteo 1:7",
        promise: "Dios nos da poder, amor y autocontrol, no miedo."
      },
      {
        text: "Jehová es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?",
        reference: "Salmos 27:1",
        promise: "Con Dios como tu fortaleza, no hay nada que temer."
      }
    ],
    prayer: "Dios de poder, rompe las cadenas del miedo en mi vida. Declaro que tú eres mi luz y mi salvación."
  },
  esperanza: {
    title: "Esperanza",
    icon: <Sun className="w-8 h-8" />,
    color: "from-yellow-500 to-amber-400",
    verses: [
      {
        text: "El esperar en Jehová es fortaleza del corazón.",
        reference: "Proverbios 24:10",
        promise: "La esperanza en Dios fortalece tu corazón."
      },
      {
        text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.",
        reference: "Proverbios 3:5",
        promise: "Confiar en Dios trae dirección y propósito."
      }
    ],
    prayer: "Dios de esperanza, renueva mi fe. Ayúdame a confiar en tus planes perfectos para mi vida."
  },
  paz: {
    title: "Paz",
    icon: <Heart className="w-8 h-8" />,
    color: "from-emerald-500 to-green-400",
    verses: [
      {
        text: "La paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.",
        reference: "Filipenses 4:7",
        promise: "La paz de Dios protege tu corazón y mente."
      },
      {
        text: "En paz me acostaré, y asimismo dormiré; porque solo tú, Jehová, me haces vivir confiado.",
        reference: "Salmos 4:8",
        promise: "Dios te da paz para descansar."
      }
    ],
    prayer: "Príncipe de Paz, inunda mi corazón con tu tranquilidad. Guarda mi mente y emociones en ti."
  }
};

const EmotionsSection = () => {
  const [activeEmotion, setActiveEmotion] = useState('ansiedad');
  const currentData = emotionsData[activeEmotion];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-celestial-800 mb-4">
            Encuentra Consuelo en Su Palabra
          </h2>
          <p className="text-xl text-celestial-600 max-w-3xl mx-auto">
            Para cada emoción, Dios tiene una palabra de consuelo y esperanza
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selector de emociones */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-celestial-50 to-white rounded-2xl p-6 border border-celestial-100">
              <h3 className="text-2xl font-bold text-celestial-800 mb-6">
                ¿Cómo te sientes hoy?
              </h3>
              
              <div className="space-y-4">
                {Object.entries(emotionsData).map(([key, emotion]) => (
                  <button
                    key={key}
                    onClick={() => setActiveEmotion(key)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300
                      ${activeEmotion === key 
                        ? `bg-gradient-to-r ${emotion.color} text-white shadow-lg transform scale-105` 
                        : 'bg-white hover:bg-celestial-50 text-gray-700 border border-celestial-100'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${activeEmotion === key ? 'bg-white/20' : 'bg-celestial-100'}`}>
                        {emotion.icon}
                      </div>
                      <span className="text-lg font-medium">{emotion.title}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-celestial-200">
                <p className="text-center text-celestial-600">
                  "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar."
                  <br />
                  <span className="font-medium text-celestial-700">Mateo 11:28</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Contenido de la emoción seleccionada */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-celestial-50 rounded-2xl 
              shadow-xl border border-celestial-100 overflow-hidden">
              
              {/* Header */}
              <div className={`h-3 bg-gradient-to-r ${currentData.color}`}></div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${currentData.color} text-white`}>
                    {currentData.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-celestial-800">
                      {currentData.title}
                    </h3>
                    <p className="text-celestial-600">Versículos que traen consuelo</p>
                  </div>
                </div>
                
                {/* Versículos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {currentData.verses.map((verse, index) => (
                    <div 
                      key={index} 
                      className="bg-white border border-celestial-100 rounded-xl p-6 
                        hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="mb-4">
                        <div className="w-8 h-8 rounded-full bg-celestial-100 
                          flex items-center justify-center mb-3">
                          <span className="text-celestial-700 font-bold">{index + 1}</span>
                        </div>
                        <p className="text-lg text-gray-700 italic mb-4">
                          "{verse.text}"
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-celestial-700 font-bold mb-2">
                          {verse.reference}
                        </p>
                        <p className="text-gray-600 text-sm">
                          <span className="font-medium">Promesa:</span> {verse.promise}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Oración */}
                <div className="bg-gradient-to-r from-celestial-50 to-white 
                  rounded-xl border border-celestial-200 p-6">
                  <h4 className="text-xl font-bold text-celestial-800 mb-4">
                    Oración para este momento
                  </h4>
                  <div className="bg-white/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {currentData.prayer}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-celestial-600">
                        Tómate un momento para orar en silencio
                      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-celestial-500 
                        to-celestial-600 text-white rounded-lg font-medium 
                        hover:shadow-md transition-all duration-300">
                        Amén
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Recursos adicionales */}
                <div className="mt-8 pt-6 border-t border-celestial-200">
                  <h4 className="text-lg font-bold text-celestial-800 mb-4">
                    Más recursos para ti
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button className="p-4 bg-white border border-celestial-200 
                      rounded-xl hover:border-celestial-400 transition-all duration-300">
                      <span className="text-celestial-700 font-medium">Cánticos de Consuelo</span>
                    </button>
                    <button className="p-4 bg-white border border-celestial-200 
                      rounded-xl hover:border-celestial-400 transition-all duration-300">
                      <span className="text-celestial-700 font-medium">Pedir Oración</span>
                    </button>
                    <button className="p-4 bg-white border border-celestial-200 
                      rounded-xl hover:border-celestial-400 transition-all duration-300">
                      <span className="text-celestial-700 font-medium">Hablar con un Pastor</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmotionsSection;