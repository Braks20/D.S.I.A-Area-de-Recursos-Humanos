import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand-section">
          <div className="footer-brand">
            <span className="material-symbols-outlined footer-icon">corporate_fare</span>
            <span className="footer-brand-name">
              Talento & Estrategia
            </span>
          </div>
          <p className="footer-description">
            Consultoría estratégica de Recursos Humanos para el mundo corporativo.
          </p>
        </div>
        
        <div className="footer-links-section">
          <nav className="footer-nav">
            <Link to="/aviso-legal" className="footer-link">Aviso Legal</Link>
            <Link to="/politica-privacidad" className="footer-link">Política de Privacidad</Link>
            <Link to="/cookies" className="footer-link">Cookies</Link>
            <Link to="/mapa-sitio" className="footer-link">Mapa del Sitio</Link>
          </nav>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2024 Talento & Estrategia. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
