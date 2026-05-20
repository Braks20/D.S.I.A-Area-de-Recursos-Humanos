import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../Styles/BasicPage.css';

const Contacto = () => {
  return (
    <>
      <Header />
      <main className="basic-page-main">
        <div className="page-container">
          <div className="page-header">
            <span className="material-symbols-outlined page-icon">contact_support</span>
            <h1 className="page-title">Ponte en Contacto</h1>
            <p className="page-description">
              ¿Listo para transformar la gestión del talento en tu empresa? Escríbenos y un consultor especializado se pondrá en contacto contigo.
            </p>
          </div>

          <div className="contact-wrapper">
            {/* Contact Info */}
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

            {/* Contact Form */}
            <div className="contact-form">
              <form>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <input className="form-input-basic" placeholder="Nombre completo" type="text" required />
                  <input className="form-input-basic" placeholder="Empresa" type="text" />
                </div>
                <input className="form-input-basic" placeholder="Correo electrónico" type="email" required />
                <input className="form-input-basic" placeholder="Asunto" type="text" required />
                <textarea className="form-textarea-basic" placeholder="¿En qué podemos ayudarte?" required></textarea>
                
                <button className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px' }} type="submit">
                  Enviar Mensaje
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
