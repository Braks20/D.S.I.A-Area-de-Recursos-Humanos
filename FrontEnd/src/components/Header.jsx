import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/" className="brand-link">
            <span className="material-symbols-outlined brand-icon" style={{ fontVariationSettings: "'FILL' 1" }}>
              corporate_fare
            </span>
            <span className="brand-text">
              Talento & Estrategia
            </span>
          </Link>
        </div>

        <nav className="header-nav">
          <Link to="/servicios" className="nav-link">Servicios</Link>
          <Link to="/firma" className="nav-link">Nuestra Firma</Link>
          <Link to="/sectores" className="nav-link">Sectores</Link>
          <Link to="/contacto" className="nav-link">Contacto</Link>
        </nav>

        <div className="header-actions">
          <Link to="/register" className="btn-outline">
            Registro
          </Link>
          <Link to="/login" className="btn-primary">
            Acceso Portal
          </Link>
        </div>

        <button className="mobile-toggle">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
