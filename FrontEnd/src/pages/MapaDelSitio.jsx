import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../Styles/BasicPage.css';

const MapaDelSitio = () => {
  return (
    <>
      <Header />
      <main className="basic-page-main">
        <div className="page-container" style={{ textAlign: 'left' }}>
          <div className="page-header" style={{ textAlign: 'center' }}>
            <span className="material-symbols-outlined page-icon">account_tree</span>
            <h1 className="page-title">Mapa del Sitio</h1>
            <p className="page-description">Navega rápidamente a cualquier sección de nuestro portal corporativo.</p>
          </div>

          <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            
            <div className="content-card" style={{ padding: '24px' }}>
              <h3 className="card-heading" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>home</span> Principal
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Inicio</Link></li>
                <li><Link to="/servicios" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Servicios</Link></li>
                <li><Link to="/firma" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Nuestra Firma</Link></li>
                <li><Link to="/sectores" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Sectores</Link></li>
                <li><Link to="/contacto" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contacto</Link></li>
              </ul>
            </div>

            <div className="content-card" style={{ padding: '24px' }}>
              <h3 className="card-heading" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>lock</span> Portales
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Acceso Portal</Link></li>
                <li><Link to="/register" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Registro de Empresas</Link></li>
              </ul>
            </div>

            <div className="content-card" style={{ padding: '24px' }}>
              <h3 className="card-heading" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>gavel</span> Legal
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><Link to="/aviso-legal" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Aviso Legal</Link></li>
                <li><Link to="/politica-privacidad" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Política de Privacidad</Link></li>
                <li><Link to="/cookies" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Política de Cookies</Link></li>
                <li><Link to="/mapa-sitio" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Mapa del Sitio</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MapaDelSitio;
