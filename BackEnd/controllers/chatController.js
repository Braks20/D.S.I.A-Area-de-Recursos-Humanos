// Chatbot Controller - Powered by Groq (llama-3.3-70b)
// Falls back to keyword rules if Groq is unavailable

const SYSTEM_PROMPT = `Eres un asistente virtual exclusivo del sitio web de "Talento & Estrategia", 
una firma de consultoría de Recursos Humanos con sede en la Ciudad de México.

TU ÚNICA FUNCIÓN es responder preguntas sobre esta empresa y este sitio web.
Si el usuario pregunta algo que NO esté relacionado con Talento & Estrategia, responde amablemente 
que solo puedes ayudar con información de la empresa.

INFORMACIÓN COMPLETA DE LA EMPRESA:

SERVICIOS OFRECIDOS:
- Reclutamiento y Selección (Headhunting): búsqueda de talento ejecutivo y especializado.
- Administración de Personal y Nómina (Outsourcing): gestión integral del ciclo laboral.
- Consultoría y Clima Organizacional: diagnóstico y estrategias para mejorar cultura corporativa.
- Capacitación y Desarrollo: programas a medida para habilidades blandas y técnicas.
- Evaluaciones Psicométricas: pruebas de personalidad, inteligencia e integridad.
- Asesoría Legal Laboral: cumplimiento normativo, auditorías y redacción de contratos.

SECTORES QUE ATIENDEN:
Tecnología y TI, Manufactura y Logística, Finanzas y Banca, Retail y Consumo Masivo, 
Salud y Farmacéutica, Inmobiliario y Construcción.

DATOS DE CONTACTO:
- Email: contacto@talentoestrategia.com
- Teléfono: +52 (55) 1234-5678
- Horario: Lunes a Viernes de 9:00 AM a 6:00 PM
- Dirección: Av. Reforma 222, Piso 14, Cuauhtémoc, CDMX.

TRAYECTORIA:
- Más de 15 años de experiencia
- Más de 500 empresas atendidas
- Presencia nacional

NAVEGACIÓN DEL PORTAL:
- Registro de empresas: /register (botón "Registro" en el menú)
- Acceso al portal: /login (botón "Acceso Portal" en el menú)
- Formulario de contacto: /contacto
- Catálogo de servicios: /servicios
- Nuestra firma (misión, visión, valores): /firma
- Sectores atendidos: /sectores
- Aviso legal: /aviso-legal
- Política de privacidad (incluye derechos ARCO): /politica-privacidad
- Política de cookies: /cookies

INSTRUCCIONES DE TONO:
- Responde SIEMPRE en español
- Sé profesional, amable y conciso (máximo 3-4 oraciones)
- Si no sabes algo específico, sugiere contactar por email o teléfono
- NO respondas preguntas fuera del contexto de Talento & Estrategia`;

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'El mensaje no puede estar vacío.' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    console.log(`[Chat] Mensaje recibido: "${message}"`);
    console.log(`[Chat] Groq API Key presente: ${!!apiKey}`);

    if (apiKey) {
      try {
        const Groq = require('groq-sdk');
        const groq = new Groq({ apiKey });

        console.log('[Chat] Llamando a Groq...');
        const completion = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user',   content: message },
          ],
          max_tokens: 400,
          temperature: 0.7,
        });

        const reply = completion.choices[0].message.content;
        console.log(`[Chat] Respuesta Groq OK: "${reply.substring(0, 80)}..."`);
        return res.json({ reply });

      } catch (groqError) {
        console.error('[Chat] Error de Groq:', groqError.message);
        if (groqError.status === 401) {
          return res.json({ reply: 'Error de autenticación con Groq. Verifica que GROQ_API_KEY sea válida en tu .env.' });
        }
        if (groqError.status === 429) {
          return res.json({ reply: 'El servicio de IA está temporalmente ocupado. Por favor intenta en unos segundos.' });
        }
      }
    } else {
      console.log('[Chat] Sin GROQ_API_KEY, usando respuestas locales.');
    }

    // Keyword fallback (works without any API key)
    res.json({ reply: getLocalReply(message) });

  } catch (error) {
    console.error('[Chat] Error general:', error.message);
    res.status(500).json({ message: 'Error en el servidor del chat.' });
  }
};

function getLocalReply(message) {
  const msg = message.toLowerCase();
  if (msg.includes('hola') || msg.includes('buenas') || msg.includes('buenos'))
    return '¡Hola! Bienvenido a Talento & Estrategia. ¿En qué te puedo ayudar hoy?';
  if (msg.includes('servicio') || msg.includes('ofrecen') || msg.includes('hacen'))
    return 'Ofrecemos: Reclutamiento, Nómina, Consultoría Organizacional, Capacitación, Evaluaciones Psicométricas y Asesoría Legal Laboral. Visita /servicios para más detalles.';
  if (msg.includes('precio') || msg.includes('costo') || msg.includes('tarifa'))
    return 'Los precios varían según el servicio. Escríbenos a contacto@talentoestrategia.com para una cotización sin costo.';
  if (msg.includes('contacto') || msg.includes('teléfono') || msg.includes('correo') || msg.includes('email'))
    return 'Contáctanos: contacto@talentoestrategia.com | +52 (55) 1234-5678 | Lunes-Viernes 9AM–6PM.';
  if (msg.includes('dirección') || msg.includes('oficina') || msg.includes('ubicación'))
    return 'Estamos en Av. Reforma 222, Piso 14, Cuauhtémoc, CDMX.';
  if (msg.includes('registro') || msg.includes('registrar') || msg.includes('cuenta'))
    return 'Regístrate en /register haciendo clic en "Registro" en el menú superior.';
  if (msg.includes('login') || msg.includes('acceso') || msg.includes('portal'))
    return 'Accede al Portal de Clientes en /login desde el menú superior.';
  if (msg.includes('sector') || msg.includes('industria'))
    return 'Atendemos: Tecnología, Manufactura, Finanzas, Retail, Salud e Inmobiliario.';
  if (msg.includes('experiencia') || msg.includes('años') || msg.includes('trayectoria'))
    return 'Contamos con más de 15 años de experiencia y más de 500 empresas atendidas a nivel nacional.';
  if (msg.includes('gracias'))
    return '¡Con gusto! Si tienes más preguntas, aquí estaré. 😊';
  return 'Para más información visita nuestras secciones o contáctanos en contacto@talentoestrategia.com o al +52 (55) 1234-5678.';
}
