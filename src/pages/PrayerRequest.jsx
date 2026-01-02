import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { prayerService } from '../services/firebaseService';
import { Send, Heart, Users, CheckCircle, Shield } from 'lucide-react';

const PrayerRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requestType: 'personal',
    message: '',
    isAnonymous: false,
    allowSharing: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const requestTypes = [
    {
      value: 'personal',
      label: 'Personal',
      icon: '🙏',
      description: 'Necesidad personal o familiar',
    },
    {
      value: 'health',
      label: 'Salud',
      icon: '❤️',
      description: 'Enfermedad, recuperación o bienestar',
    },
    {
      value: 'family',
      label: 'Familiar',
      icon: '👨‍👩‍👧‍👦',
      description: 'Situaciones familiares',
    },
    {
      value: 'financial',
      label: 'Financiero',
      icon: '💰',
      description: 'Necesidades económicas',
    },
    {
      value: 'spiritual',
      label: 'Espiritual',
      icon: '✝️',
      description: 'Crecimiento y lucha espiritual',
    },
    {
      value: 'work',
      label: 'Laboral',
      icon: '💼',
      description: 'Trabajo, empleo o estudios',
    },
    {
      value: 'guidance',
      label: 'Dirección',
      icon: '🧭',
      description: 'Decisiones importantes',
    },
    {
      value: 'other',
      label: 'Otro',
      icon: '💬',
      description: 'Otra necesidad específica',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.message.trim()) {
      setError('Por favor escribe tu pedido de oración');
      return;
    }

    if (!formData.isAnonymous && !formData.name.trim()) {
      setError('Por favor ingresa tu nombre');
      return;
    }

    setLoading(true);

    try {
      // Preparar datos para enviar
      const requestData = {
        ...formData,
        // Si es anónimo, limpiar información personal
        name: formData.isAnonymous ? 'Anónimo' : formData.name.trim(),
        email: formData.isAnonymous ? '' : formData.email.trim(),
        phone: formData.isAnonymous ? '' : formData.phone.trim(),
        // Estado inicial
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // Enviar a Firebase
      await prayerService.createRequest(requestData);

      setSubmitted(true);

      // Opcional: Limpiar formulario
      if (!formData.isAnonymous) {
        setFormData((prev) => ({
          ...prev,
          message: '',
          requestType: 'personal',
        }));
      }
    } catch (error) {
      console.error('Error enviando solicitud:', error);
      setError(
        'Hubo un error al enviar tu solicitud. Por favor intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTypeSelect = (type) => {
    setFormData((prev) => ({
      ...prev,
      requestType: type,
    }));
  };

  if (submitted) {
    return (
      <section className="section-padding min-h-[70vh] flex items-center justify-center">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center">
            <div
              className="inline-flex items-center justify-center w-24 h-24 
              bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl font-serif text-celestial-800 dark:text-celestial-200 mb-4">
              ¡Solicitud Enviada con Éxito!
            </h1>

            <p className="text-xl text-celestial-600 dark:text-celestial-400 mb-8">
              Tu pedido de oración ha sido recibido. Nuestro equipo de
              intercesión estará orando por ti.
            </p>

            <div
              className="bg-gradient-to-br from-celestial-50 to-white 
              dark:from-celestial-900/30 dark:to-dark-surface 
              rounded-2xl p-8 mb-8 border border-celestial-100 dark:border-celestial-800"
            >
              <h3 className="text-lg font-bold text-celestial-700 dark:text-celestial-300 mb-4">
                ¿Qué sucede ahora?
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl flex-shrink-0">
                    <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-celestial-800 dark:text-celestial-200 mb-1">
                      Oración Personalizada
                    </h4>
                    <p className="text-celestial-600 dark:text-celestial-400 text-sm">
                      Nuestro equipo de intercesión orará específicamente por tu
                      necesidad durante nuestra reunión de oración.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-celestial-800 dark:text-celestial-200 mb-1">
                      Apoyo Comunitario
                    </h4>
                    <p className="text-celestial-600 dark:text-celestial-400 text-sm">
                      {formData.allowSharing
                        ? 'Tu solicitud será compartida (sin datos personales) con nuestro grupo de oración para ampliar el apoyo.'
                        : 'Tu solicitud será mantenida en privado con nuestro equipo central de intercesión.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex-shrink-0">
                    <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-celestial-800 dark:text-celestial-200 mb-1">
                      Confidencialidad Total
                    </h4>
                    <p className="text-celestial-600 dark:text-celestial-400 text-sm">
                      {formData.isAnonymous
                        ? 'Tu identidad ha sido protegida y solo Dios conoce quién eres.'
                        : 'Tu información personal está segura y será tratada con absoluta confidencialidad.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-celestial-200 dark:border-celestial-700">
                <p className="text-center text-celestial-700 dark:text-celestial-300 italic">
                  "Confía en Jehová de todo corazón, y no te apoyes en tu propia
                  prudencia. Reconócelo en todos tus caminos, y él enderezará
                  tus veredas."
                </p>
                <p className="text-center text-sm text-celestial-600 dark:text-celestial-400 mt-2">
                  Proverbios 3:5-6
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    requestType: 'personal',
                    message: '',
                    isAnonymous: false,
                    allowSharing: false,
                  });
                }}
                className="px-8 py-4 border-2 border-celestial-500 
                  text-celestial-700 dark:text-celestial-300 rounded-xl 
                  hover:bg-celestial-50 dark:hover:bg-celestial-900/50 
                  transition-colors font-medium"
              >
                Enviar otra solicitud
              </button>

              <button
                onClick={() => navigate('/')}
                className="btn-primary px-8 py-4 font-medium"
              >
                Volver al inicio
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-celestial-500 dark:text-celestial-500">
                ¿Necesitas hablar con un pastor urgentemente?{' '}
                <button
                  onClick={() => navigate('/contacto')}
                  className="underline hover:text-celestial-700 dark:hover:text-celestial-300"
                >
                  Contáctanos aquí
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-20 h-20 
            bg-gradient-to-br from-celestial-500 to-celestial-600 rounded-2xl mb-6"
          >
            <Heart className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-celestial-800 dark:text-celestial-200 mb-4">
            Pedido de Oración
          </h1>

          <p className="text-xl text-celestial-600 dark:text-celestial-400 max-w-3xl mx-auto">
            "Orad sin cesar" - 1 Tesalonicenses 5:17. Comparte tu necesidad y
            nuestro equipo intercederá por ti.
          </p>
        </div>

        {error && (
          <div
            className="mb-8 p-6 bg-red-50 dark:bg-red-900/30 border border-red-200 
            dark:border-red-800 rounded-2xl text-center"
          >
            <p className="text-red-600 dark:text-red-400 font-medium">
              {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información y guía */}
          <div className="lg:col-span-1 space-y-6">
            <div
              className="bg-gradient-to-br from-celestial-50 to-white 
              dark:from-celestial-900/30 dark:to-dark-surface 
              rounded-2xl p-8 border border-celestial-100 dark:border-celestial-800"
            >
              <h3 className="text-2xl font-bold text-celestial-800 dark:text-celestial-200 mb-6">
                ¿Cómo funciona?
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className="w-8 h-8 bg-celestial-600 text-white rounded-full 
                      flex items-center justify-center font-bold"
                    >
                      1
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-celestial-700 dark:text-celestial-300 mb-1">
                      Escribe tu necesidad
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Describe con detalle tu situación. Cuanto más específico
                      seas, mejor podremos orar.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className="w-8 h-8 bg-celestial-600 text-white rounded-full 
                      flex items-center justify-center font-bold"
                    >
                      2
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-celestial-700 dark:text-celestial-300 mb-1">
                      Nuestro equipo ora
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Cada miércoles, nuestro equipo de intercesión se reúne
                      para orar por todas las necesidades recibidas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className="w-8 h-8 bg-celestial-600 text-white rounded-full 
                      flex items-center justify-center font-bold"
                    >
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-celestial-700 dark:text-celestial-300 mb-1">
                      Seguimiento continuo
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Continuamos orando por ti durante la semana y seguimos tu
                      caso si nos autorizas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-gradient-to-br from-celestial-50 to-white 
              dark:from-celestial-900/30 dark:to-dark-surface 
              rounded-2xl p-8 border border-celestial-100 dark:border-celestial-800"
            >
              <h3 className="text-xl font-bold text-celestial-800 dark:text-celestial-200 mb-4">
                Promesas de Dios para ti
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-dark-surface rounded-xl border border-celestial-100 dark:border-celestial-800">
                  <p className="text-celestial-700 dark:text-celestial-300 italic text-sm">
                    "Echa sobre Jehová tu carga, y él te sustentará; no dejará
                    caído jamás al justo."
                  </p>
                  <p className="text-xs text-celestial-500 dark:text-celestial-500 mt-2">
                    Salmos 55:22
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-dark-surface rounded-xl border border-celestial-100 dark:border-celestial-800">
                  <p className="text-celestial-700 dark:text-celestial-300 italic text-sm">
                    "Clama a mí, y yo te responderé, y te enseñaré cosas grandes
                    y ocultas que tú no conoces."
                  </p>
                  <p className="text-xs text-celestial-500 dark:text-celestial-500 mt-2">
                    Jeremías 33:3
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-dark-surface rounded-xl border border-celestial-100 dark:border-celestial-800">
                  <p className="text-celestial-700 dark:text-celestial-300 italic text-sm">
                    "Y todo lo que pidiereis en oración, creyendo, lo
                    recibiréis."
                  </p>
                  <p className="text-xs text-celestial-500 dark:text-celestial-500 mt-2">
                    Mateo 21:22
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-celestial-200 dark:border-celestial-700">
                <p className="text-center text-sm text-celestial-600 dark:text-celestial-400">
                  Recuerda: Dios está contigo en todo momento
                </p>
              </div>
            </div>
          </div>

          {/* Formulario principal */}
          <div className="lg:col-span-2">
            <div
              className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl 
              border border-celestial-100 dark:border-celestial-800 overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-celestial-800 dark:text-celestial-200 mb-2">
                  Comparte tu necesidad
                </h2>
                <p className="text-celestial-600 dark:text-celestial-400 mb-8">
                  Todos los campos son confidenciales
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Información personal (condicional) */}
                  <div
                    className={`space-y-6 ${
                      formData.isAnonymous ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-celestial-700 dark:text-celestial-300 font-medium mb-2">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={formData.isAnonymous}
                          required={!formData.isAnonymous}
                          className="w-full px-4 py-3 border border-celestial-300 
                            dark:border-celestial-700 rounded-xl 
                            focus:outline-none focus:ring-2 focus:ring-celestial-500 
                            focus:border-transparent disabled:bg-celestial-50 
                            disabled:text-gray-500 dark:bg-dark-surface dark:text-white"
                          placeholder="Tu nombre"
                        />
                      </div>

                      <div>
                        <label className="block text-celestial-700 dark:text-celestial-300 font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={formData.isAnonymous}
                          className="w-full px-4 py-3 border border-celestial-300 
                            dark:border-celestial-700 rounded-xl 
                            focus:outline-none focus:ring-2 focus:ring-celestial-500 
                            focus:border-transparent disabled:bg-celestial-50 
                            disabled:text-gray-500 dark:bg-dark-surface dark:text-white"
                          placeholder="tu@email.com"
                        />
                        <p className="text-xs text-celestial-500 dark:text-celestial-500 mt-1">
                          Para confirmación y seguimiento
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-celestial-700 dark:text-celestial-300 font-medium mb-2">
                        Teléfono (opcional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={formData.isAnonymous}
                        className="w-full px-4 py-3 border border-celestial-300 
                          dark:border-celestial-700 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-celestial-500 
                          focus:border-transparent disabled:bg-celestial-50 
                          disabled:text-gray-500 dark:bg-dark-surface dark:text-white"
                        placeholder="+52 123 456 7890"
                      />
                      <p className="text-xs text-celestial-500 dark:text-celestial-500 mt-1">
                        Solo si deseas contacto personal
                      </p>
                    </div>
                  </div>

                  {/* Opción anónima */}
                  <div className="p-6 bg-celestial-50 dark:bg-celestial-900/30 rounded-xl">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isAnonymous"
                        checked={formData.isAnonymous}
                        onChange={handleChange}
                        className="w-5 h-5 mt-1 text-celestial-600 rounded"
                      />
                      <div>
                        <span className="font-medium text-celestial-800 dark:text-celestial-200">
                          Enviar anónimamente
                        </span>
                        <p className="text-sm text-celestial-600 dark:text-celestial-400 mt-1">
                          Tu identidad será completamente protegida. Solo Dios
                          sabrá quién eres.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Tipo de solicitud */}
                  <div>
                    <label className="block text-celestial-700 dark:text-celestial-300 font-medium mb-4">
                      Tipo de necesidad *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {requestTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleTypeSelect(type.value)}
                          className={`flex flex-col items-center justify-center p-4 
                            border rounded-xl cursor-pointer transition-all duration-300
                            ${
                              formData.requestType === type.value
                                ? 'border-celestial-500 bg-celestial-50 dark:bg-celestial-900/50 shadow-md'
                                : 'border-celestial-200 dark:border-celestial-700 hover:border-celestial-300 dark:hover:border-celestial-600'
                            }`}
                        >
                          <span className="text-2xl mb-2">{type.icon}</span>
                          <span className="font-medium text-celestial-800 dark:text-celestial-200 text-sm">
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div
                      className="mt-4 p-4 bg-gradient-to-r from-celestial-50 to-transparent 
                      dark:from-celestial-900/30 rounded-xl"
                    >
                      <p className="text-sm text-celestial-700 dark:text-celestial-300">
                        <span className="font-medium">Seleccionado: </span>
                        {
                          requestTypes.find(
                            (t) => t.value === formData.requestType
                          )?.description
                        }
                      </p>
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-celestial-700 dark:text-celestial-300 font-medium mb-2">
                      Tu pedido de oración *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="8"
                      placeholder="Describe tu necesidad de oración aquí... Sé tan específico como desees. Puedes incluir detalles importantes, nombres de personas involucradas, fechas relevantes, o cualquier información que ayude a nuestro equipo a orar con precisión."
                      className="w-full px-4 py-3 border border-celestial-300 
                        dark:border-celestial-700 rounded-xl 
                        focus:outline-none focus:ring-2 focus:ring-celestial-500 
                        focus:border-transparent dark:bg-dark-surface dark:text-white 
                        resize-none leading-relaxed"
                    ></textarea>

                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-celestial-500 dark:text-celestial-500">
                        Tu mensaje es completamente privado
                      </p>
                      <p className="text-sm text-celestial-500 dark:text-celestial-500">
                        {formData.message.length}/2000 caracteres
                      </p>
                    </div>
                  </div>

                  {/* Opciones adicionales */}
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="allowSharing"
                        checked={formData.allowSharing}
                        onChange={handleChange}
                        className="w-5 h-5 mt-1 text-celestial-600 rounded"
                      />
                      <div>
                        <span className="font-medium text-celestial-800 dark:text-celestial-200">
                          Permitir compartir en grupo de oración
                        </span>
                        <p className="text-sm text-celestial-600 dark:text-celestial-400 mt-1">
                          Tu solicitud será compartida (sin información
                          personal) con nuestro grupo extendido de oración para
                          ampliar el apoyo en oración.
                        </p>
                      </div>
                    </label>

                    <div
                      className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 
                      dark:border-amber-800 rounded-xl"
                    >
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        💡 <strong>Sugerencia:</strong> Antes de enviar, toma un
                        momento para orar brevemente. Pide a Dios que guíe
                        nuestras oraciones por tu situación.
                      </p>
                    </div>
                  </div>

                  {/* Botón de envío */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-5 text-lg font-semibold 
                      flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div
                          className="w-6 h-6 border-2 border-white border-t-transparent 
                          rounded-full animate-spin"
                        ></div>
                        Enviando tu solicitud...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        Enviar solicitud de oración
                      </>
                    )}
                  </button>

                  {/* Nota final */}
                  <div className="text-center">
                    <p className="text-sm text-celestial-600 dark:text-celestial-400">
                      Al enviar, confirmas que has leído y aceptas nuestro{' '}
                      <button
                        type="button"
                        className="underline hover:text-celestial-800 dark:hover:text-celestial-300"
                      >
                        compromiso de confidencialidad
                      </button>
                    </p>

                    <div className="mt-6 pt-6 border-t border-celestial-200 dark:border-celestial-700">
                      <p className="text-celestial-700 dark:text-celestial-300 italic">
                        "No se inquieten por nada; más bien, en toda ocasión,
                        con oración y ruego, presenten sus peticiones a Dios y
                        denle gracias."
                      </p>
                      <p className="text-sm text-celestial-600 dark:text-celestial-400 mt-2">
                        Filipenses 4:6
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Información de contacto adicional */}
            <div
              className="mt-8 bg-gradient-to-r from-celestial-600 to-celestial-800 
              rounded-2xl p-8 text-white"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    ¿Necesitas ayuda urgente?
                  </h3>
                  <p className="opacity-90">
                    Si necesitas hablar inmediatamente con un pastor o consejero
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/contacto')}
                    className="px-6 py-3 bg-white text-celestial-800 rounded-xl 
                      font-semibold hover:bg-celestial-50 transition-colors"
                  >
                    Contactar a un Pastor
                  </button>

                  <button
                    className="px-6 py-3 border-2 border-white text-white 
                    rounded-xl font-semibold hover:bg-white/10 transition-colors"
                  >
                    Línea de Emergencia
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20 text-center">
                <p className="text-sm opacity-80">
                  "No temas, porque yo estoy contigo; no desmayes, porque yo soy
                  tu Dios que te esfuerzo; siempre te ayudaré, siempre te
                  sustentaré con la diestra de mi justicia."
                </p>
                <p className="text-sm opacity-80 mt-2">Isaías 41:10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrayerRequest;
