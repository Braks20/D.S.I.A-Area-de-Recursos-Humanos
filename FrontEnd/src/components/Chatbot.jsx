import React, { useState, useRef, useEffect } from 'react';
import api from '../api/api';
import '../Styles/Chatbot.css';

// Generate a persistent session ID for this browser
function getSessionId() {
  let id = sessionStorage.getItem('chat_session_id');
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('chat_session_id', id);
  }
  return id;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy el asistente virtual de Talento & Estrategia. ¿En qué puedo ayudarte hoy?', source: null }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const sessionId = getSessionId();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: 'user', content: trimmed, source: null };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/chat', { message: trimmed, sessionId });
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: res.data.reply,
        source: res.data.source || null
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Lo siento, no puedo responder en este momento. Contáctanos en contacto@talentoestrategia.com.',
        source: null
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

  // Quick suggestion chips
  const suggestions = ['¿Qué servicios ofrecen?', '¿Cómo me registro?', '¿Cómo los contacto?'];

  const formatMessageContent = (text) => {
    if (!text) return '';
    const lines = text.split('\n');
    const boldRegex = /\*\*(.*?)\*\*/g;

    const parseLine = (line) => {
      const parts = [];
      let lastIndex = 0;
      let match;
      boldRegex.lastIndex = 0;
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index}>{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }
      return parts.length > 0 ? parts : line;
    };

    return lines.map((line, index) => {
      if (line.trim() === '') {
        return <div key={index} style={{ height: '8px' }} />;
      }
      if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
        const cleanText = line.replace(/^[\s*\-]+/, '').trim();
        return (
          <ul key={index} style={{ margin: '4px 0 4px 16px', paddingLeft: '0', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '2px' }}>{parseLine(cleanText)}</li>
          </ul>
        );
      }
      return (
        <p key={index} style={{ margin: '0 0 6px 0', lineHeight: '1.45' }}>
          {parseLine(line)}
        </p>
      );
    });
  };

  return (
    <div className="chatbot-wrapper">
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="material-symbols-outlined chatbot-avatar-icon">support_agent</span>
              <div>
                <p className="chatbot-name">Asistente Virtual</p>
                <p className="chatbot-status">Talento & Estrategia • En línea</p>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message-group ${msg.role === 'user' ? 'user-group' : 'assistant-group'}`}>
                <div className={`chat-bubble ${msg.role === 'user' ? 'bubble-user' : 'bubble-assistant'}`}>
                  {formatMessageContent(msg.content)}
                </div>
                {/* Source indicator */}
                {msg.source && msg.role === 'assistant' && (
                  <div className="chat-source-badge">
                    <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>description</span>
                    Fuente: {msg.source}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chat-message-group assistant-group">
                <div className="bubble-assistant chat-bubble typing-indicator">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion chips (only at start) */}
          {messages.length <= 1 && (
            <div className="chatbot-suggestions">
              {suggestions.map((s, i) => (
                <button className="suggestion-chip" key={i} onClick={() => { setInput(s); }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
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

      {/* FAB Toggle */}
      <button className="chatbot-toggle" onClick={() => setIsOpen(prev => !prev)} title="Abrir Asistente">
        <span className="material-symbols-outlined">
          {isOpen ? 'close' : 'chat'}
        </span>
        {!isOpen && <span className="chatbot-badge">?</span>}
      </button>
    </div>
  );
};

export default Chatbot;
