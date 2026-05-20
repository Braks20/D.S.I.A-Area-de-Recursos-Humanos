import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../api/api';
import '../Styles/BasicPage.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    fullName: '', company: '', email: '', subject: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.post('/contact', formData);
      setSuccess('¡Mensaje enviado! Nos pondremos en contacto pronto.');
      setFormData({ fullName: '', company: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="basic-page-main">
        <div className="page-container" style={{ textAlign: 'left' }}>
          <div className="page-header" style={{ textAlign: 'center' }}>
            <span className="material-symbols-outlined page-icon">contact_support</span>
            <h1 className="page-title">Ponte en Contacto</h1>
            <p className="page-description">
              ¿Listo para transformar la gestión del talento? Escríbenos y un consultor se pondrá en contacto contigo.
            </p>
          </div>

          <div className="contact-wrapper">
            <div className="contact-info">
              <h2 className="contact-info-title">Información de Contacto</h2>
              <div className="info-item">
                <span className="material-symbols-outlined">call</span>
                <span>+52 (55) 1234-5678</span>
              </div>
              <div className="info-item">
                <span className="material-symbols-outlined">mail</span>
                <span>contacto@talentoestrategia.com</span>
              </div>
              <div className="info-item">
                <span className="material-symbols-outlined">location_on</span>
                <span>Av. Reforma 222, Piso 14, Cuauhtémoc, CDMX.</span>
              </div>
              <div className="info-item">
                <span className="material-symbols-outlined">schedule</span>
                <span>Lunes a Viernes: 9:00 AM - 6:00 PM</span>
              </div>
            </div>

            <div className="contact-form">
              {success && <div className="form-alert form-alert-success" style={{ marginBottom: '16px' }}>{success}</div>}
              {error && <div className="form-alert form-alert-error" style={{ marginBottom: '16px' }}>{error}</div>}
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <input className="form-input-basic" name="fullName" onChange={handleChange} placeholder="Nombre completo" required type="text" value={formData.fullName} />
                  <input className="form-input-basic" name="company" onChange={handleChange} placeholder="Empresa" type="text" value={formData.company} />
                </div>
                <input className="form-input-basic" name="email" onChange={handleChange} placeholder="Correo electrónico" required type="email" value={formData.email} />
                <input className="form-input-basic" name="subject" onChange={handleChange} placeholder="Asunto" required type="text" value={formData.subject} />
                <textarea className="form-textarea-basic" name="message" onChange={handleChange} placeholder="¿En qué podemos ayudarte?" required value={formData.message}></textarea>
                <button className="btn-primary" disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '16px' }} type="submit">
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contacto;
