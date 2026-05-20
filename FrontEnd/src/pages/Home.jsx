import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../Styles/Home.css';

const Home = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-grid">
            {/* Text Content */}
            <div className="hero-text">
              <h1 className="hero-title">
                Impulsamos el crecimiento de tu empresa a través del talento.
              </h1>
              <p className="hero-description">
                Somos especialistas en consultoría estratégica de Recursos Humanos, selección de personal ejecutivo, outsourcing de nómina y desarrollo organizacional para medianas y grandes empresas.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary">
                  Solicitar Asesoría
                  <span className="material-symbols-outlined icon-small">arrow_forward</span>
                </button>
                <button className="btn-outline">
                  Ver Catálogo de Servicios
                </button>
              </div>
            </div>
            {/* Hero Image */}
            <div className="hero-image-wrapper">
              <div className="image-container">
                <img alt="Corporate Office Strategy" className="hero-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ2XzAdNZghmW0HzbieWGTHeb2CoxD7pVxzUeIaNljDLnmthdfzj9Kha4nEsaqGFFtSMALGv8GJDdL83rtVVDggEpCtsVyn66CRkyO7T2F_qh0cQEbJUd9hnDFW3-d_tV_4cgJYoxSbfeJ-KIiw6ghOGmu4FKs5Cui7pWQCtIU6DsG_atyZW54dsNI9eS94fy6mwiGvVljJWBf5wx9MIfPB34A-GI52PQN1WMKkc5jGY6dfnOabQmQa0ST42tpmlBVnpzSKU7r_IDG" />
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Trayectoria Banner */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">+15</span>
              <span className="stat-label">Años de experiencia</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">+500</span>
              <span className="stat-label">Empresas atendidas</span>
            </div>
            <div className="stat-item">
              <span className="material-symbols-outlined stat-icon" style={{ fontVariationSettings: "'wght' 300" }}>public</span>
              <span className="stat-label">Presencia Nacional</span>
            </div>
          </div>
        </section>

        {/* Servicios Section */}
        <section className="services-section">
          <div className="services-header">
            <h2 className="services-title">Nuestros Servicios</h2>
            <p className="services-description">
              Soluciones integrales diseñadas para optimizar la gestión del talento y estructurar equipos de alto rendimiento.
            </p>
          </div>
          <div className="services-grid">
            {/* Card 1 */}
            <div className="service-card">
              <div className="card-top-line"></div>
              <div className="card-icon-wrapper">
                <span className="material-symbols-outlined card-icon">person_search</span>
              </div>
              <h3 className="card-title">Reclutamiento y Selección</h3>
              <span className="card-subtitle">(Headhunting)</span>
              <p className="card-text">
                Identificamos y atraemos al talento ejecutivo y especializado que tu organización necesita para alcanzar sus objetivos estratégicos.
              </p>
            </div>
            {/* Card 2 */}
            <div className="service-card">
              <div className="card-top-line"></div>
              <div className="card-icon-wrapper">
                <span className="material-symbols-outlined card-icon">payments</span>
              </div>
              <h3 className="card-title">Administración de Personal y Nómina</h3>
              <span className="card-subtitle">(Outsourcing)</span>
              <p className="card-text">
                Gestionamos de forma integral el ciclo de vida laboral de tus colaboradores, asegurando cumplimiento legal y eficiencia operativa.
              </p>
            </div>
            {/* Card 3 */}
            <div className="service-card">
              <div className="card-top-line"></div>
              <div className="card-icon-wrapper">
                <span className="material-symbols-outlined card-icon">group_work</span>
              </div>
              <h3 className="card-title">Consultoría y Clima Organizacional</h3>
              <span className="card-spacer">-</span>
              <p className="card-text">
                Diagnosticamos y diseñamos estrategias para fortalecer la cultura corporativa, mejorar el ambiente laboral y retener al talento clave.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
