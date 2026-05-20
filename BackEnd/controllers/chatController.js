const KnowledgeDocument = require('../models/KnowledgeDocument');
const ChatHistory = require('../models/ChatHistory');

// RAG: find the most relevant document chunk for the question
function searchDocuments(docs, question) {
  const stopWords = new Set(['que', 'como', 'cual', 'qué', 'cómo', 'cuál', 'para', 'con', 'una', 'uno', 'los', 'las', 'del', 'por', 'son', 'hay', 'esta', 'este', 'esta', 'ser', 'sus', 'más']);
  const keywords = question.toLowerCase()
    .replace(/[¿?¡!.,;:]/g, '')
    .split(' ')
    .filter(w => w.length > 3 && !stopWords.has(w));

  if (keywords.length === 0) return null;

  let best = null;
  let bestScore = 0;

  for (const doc of docs) {
    const text = doc.textContent.toLowerCase();
    const score = keywords.reduce((acc, kw) => {
      const matches = (text.match(new RegExp(kw, 'g')) || []).length;
      return acc + matches;
    }, 0);
    if (score > bestScore) { bestScore = score; best = { doc, score }; }
  }

  if (!best || best.score === 0) return null;

  const firstKw = keywords[0];
  const text = best.doc.textContent;
  const idx = text.toLowerCase().indexOf(firstKw);
  const start = Math.max(0, idx - 200);
  const end = Math.min(text.length, idx + 1300);
  const chunk = text.substring(start, end);

  return { docName: best.doc.name, chunk, score: best.score };
}

const SYSTEM_PROMPT = `Eres "Tali", el asistente virtual de "Talento & Estrategia", una firma líder de consultoría de Recursos Humanos en México.

PERSONALIDAD:
- Eres amigable, profesional y muy útil. Usas un tono cálido pero corporativo.
- Responde de forma conversacional y natural, como si fueras un asesor experto que quiere genuinamente ayudar.
- Usa emojis de forma discreta (máx. 1-2 por respuesta) para hacer el chat más agradable.
- Si el usuario saluda, salúdalo de vuelta con entusiasmo y pregunta en qué puedes ayudarle.
- Puedes ser algo creativo al dar respuestas, pero siempre basándote en información real de la empresa.

LO QUE PUEDES HACER:
✅ Responder cualquier pregunta sobre los servicios, la firma, sectores, contacto o cómo navegar el sitio.
✅ Explicar cómo registrarse o acceder al portal de clientes.
✅ Dar información sobre políticas, privacidad y uso del sitio.
✅ Si hay documentos internos de contexto, usarlos para responder con precisión.
❌ NO responder temas completamente ajenos (política mundial, deportes, recetas, etc.). En ese caso, redirige amablemente.

INFORMACIÓN DE LA EMPRESA:

🏢 SERVICIOS:
1. Reclutamiento y Selección (Headhunting): búsqueda de talento ejecutivo y especializado para cualquier nivel.
2. Administración de Nómina (Outsourcing): gestión integral de pagos, prestaciones e IMSS.
3. Consultoría Organizacional: diagnóstico de clima laboral, reestructuración y cultura corporativa.
4. Capacitación y Desarrollo: programas de formación en habilidades blandas y técnicas.
5. Evaluaciones Psicométricas: pruebas de personalidad, inteligencia, integridad y competencias gerenciales.
6. Asesoría Legal Laboral: cumplimiento normativo, contratos y auditorías de expedientes.

🏭 SECTORES: Tecnología y TI, Manufactura, Finanzas y Banca, Retail, Salud y Farmacéutica, Inmobiliario.

📞 CONTACTO:
- Email: contacto@talentoestrategia.com
- Teléfono: +52 (55) 1234-5678
- Horario: Lunes a Viernes de 9:00 AM a 6:00 PM
- Dirección: Av. Reforma 222, Piso 14, Cuauhtémoc, CDMX

🌐 NAVEGACIÓN DEL SITIO:
- Página principal: inicio con presentación de la firma
- /servicios → Catálogo completo de servicios
- /firma → Misión, Visión y Valores de la empresa
- /sectores → Industrias que atendemos
- /contacto → Formulario de contacto directo
- /register → Registrar tu empresa para el Portal de Clientes
- /login → Acceso al Portal de Clientes
- /aviso-legal, /politica-privacidad, /cookies → Información legal y de privacidad

🏆 TRAYECTORIA: +15 años de experiencia | +500 empresas atendidas | Presencia nacional

FORMATO DE RESPUESTA:
- Sé conciso pero completo (2-5 oraciones idealmente).
- Si listas cosas, usa viñetas cortas con emojis.
- Termina siempre ofreciendo más ayuda o invitando a actuar (visitar una sección, contactar, registrarse).`;

exports.chat = async (req, res) => {
  try {
    const { message, sessionId = 'anonymous' } = req.body;
    if (!message) return res.status(400).json({ message: 'El mensaje no puede estar vacío.' });

    console.log(`[Chat] "${message}" | session: ${sessionId}`);

    // Load active documents for RAG
    const activeDocs = await KnowledgeDocument.findAll({ where: { isActive: true } });
    const ragResult = searchDocuments(activeDocs, message);

    let systemPrompt = SYSTEM_PROMPT;
    let sourceDocument = null;

    if (ragResult) {
      sourceDocument = ragResult.docName;
      systemPrompt += `\n\n📄 CONTEXTO DEL DOCUMENTO INTERNO "${ragResult.docName}":\n---\n${ragResult.chunk}\n---\nCuando uses este contenido, menciona que la información proviene de "${ragResult.docName}".`;
      console.log(`[Chat] RAG: "${ragResult.docName}" (score: ${ragResult.score})`);
    }

    const apiKey = process.env.GROQ_API_KEY;
    let reply = null;
    let wasAnswered = true;

    if (apiKey) {
      try {
        const Groq = require('groq-sdk');
        const groq = new Groq({ apiKey });

        const completion = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message },
          ],
          max_tokens: 500,
          temperature: 0.75, // More natural and fluid
        });

        reply = completion.choices[0].message.content;
        console.log(`[Chat] Groq OK: "${reply.substring(0, 80)}..."`);
      } catch (groqError) {
        console.error(`[Chat] Groq ERROR (${groqError.status}): ${groqError.message}`);
        reply = null;
      }
    }

    // Only use fallback if Groq failed
    if (!reply) {
      wasAnswered = false;
      reply = getFallbackReply(message);
    }

    await ChatHistory.create({ sessionId, userMessage: message, botReply: reply, sourceDocument, wasAnswered });
    res.json({ reply, source: sourceDocument });

  } catch (error) {
    console.error('[Chat] Fatal error:', error.message);
    res.status(500).json({ message: 'Error en el servidor del chat.' });
  }
};

// Minimal fallback only when Groq is completely unavailable
function getFallbackReply(message) {
  const msg = message.toLowerCase();
  if (msg.includes('hola') || msg.includes('buenas') || msg.includes('buenos'))
    return '¡Hola! 👋 Bienvenido a Talento & Estrategia. Soy Tali, tu asistente virtual. ¿En qué puedo ayudarte hoy?';
  if (msg.includes('servicio'))
    return 'Ofrecemos Reclutamiento, Administración de Nómina, Consultoría Organizacional, Capacitación, Psicometría y Asesoría Legal. 🎯 Visita /servicios para más detalles.';
  if (msg.includes('contacto') || msg.includes('teléfono') || msg.includes('correo'))
    return '📞 Contáctanos: contacto@talentoestrategia.com | +52 (55) 1234-5678 | Lunes-Viernes 9AM–6PM.';
  if (msg.includes('registro') || msg.includes('registrar'))
    return '¡Fácil! Ve a /register o haz clic en "Registro" en el menú superior para crear tu cuenta corporativa. 🏢';
  if (msg.includes('gracias'))
    return '¡Con mucho gusto! 😊 Estoy aquí para lo que necesites.';
  return '¡Hola! Soy Tali, el asistente de Talento & Estrategia. Puedo ayudarte con información sobre nuestros servicios, cómo registrarte o cómo contactarnos. ¿Qué necesitas saber? 😊';
}
