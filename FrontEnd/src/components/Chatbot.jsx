import React, { useState, useRef, useEffect } from 'react';
import api from '../api/api';
import '../Styles/Chatbot.css';

const SYSTEM_CONTEXT = `
Eres un asistente virtual de "Talento & Estrategia", una firma de consultoría de Recursos Humanos.
Tu rol es ayudar a los visitantes con preguntas sobre los servicios, la empresa y cómo usar la plataforma.
Responde siempre de forma profesional, amable y concisa en español.

Información clave que debes conocer:
- Servicios: Reclutamiento y Selección (Headhunting), Administración de Nómina (Outsourcing), Consultoría Organizacional, Capacitación y Desarrollo, Evaluaciones Psicométricas, Asesoría Legal Laboral.
- Contacto: contacto@talentoestrategia.com | +52 (55) 1234-5678 | Lunes a Viernes 9AM-6PM.
- Dirección: Av. Reforma 222, Piso 14, Cuauhtémoc, CDMX.
- Registro: Las empresas pueden registrarse en /register para acceder al Portal de Clientes.
- Sectores atendidos: Tecnología, Manufactura, Finanzas, Retail, Salud, Inmobiliario.
- Más de 15 años de experiencia y más de 500 empresas atendidas.
Si no sabes algo, sugiere al usuario contactar directamente vía correo o teléfono.
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy el asistente de Talento & Estrategia. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/chat', { message: trimmed });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Lo siento, no puedo responder en este momento. Por favor contáctanos en contacto@talentoestrategia.com.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="material-symbols-outlined chatbot-avatar-icon">support_agent</span>
              <div>
                <p className="chatbot-name">Asistente Virtual</p>
                <p className="chatbot-status">Talento & Estrategia</p>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div className={`chat-bubble ${msg.role === 'user' ? 'bubble-user' : 'bubble-assistant'}`} key={i}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="bubble-assistant chat-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              className="chatbot-input"
              disabled={loading}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              type="text"
              value={input}
            />
            <button className="chatbot-send-btn" disabled={loading || !input.trim()} onClick={handleSend}>
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button className="chatbot-toggle" onClick={() => setIsOpen(prev => !prev)} title="Abrir Asistente">
        <span className="material-symbols-outlined">
          {isOpen ? 'close' : 'chat'}
        </span>
      </button>
    </div>
  );
};

export default Chatbot;
