import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../Styles/BasicPage.css';

const Servicios = () => {
  const servicios = [
    {
      icon: 'person_search',
      title: 'Reclutamiento y Selección',
      desc: 'Búsqueda exhaustiva de perfiles clave y talento especializado. Evaluamos competencias y ajuste cultural para asegurar que cada contratación aporte valor inmediato a tu organización.'
    },
    {
      icon: 'payments',
      title: 'Administración de Nómina',
      desc: 'Gestión integral del pago a colaboradores, cálculo de impuestos, prestaciones y cumplimiento normativo, reduciendo riesgos fiscales y carga administrativa.'
    },
    {
      icon: 'group_work',
      title: 'Consultoría Organizacional',
      desc: 'Diagnóstico de clima laboral, reestructuración de áreas, diseño de planes de carrera y estrategias para mejorar el bienestar y la productividad de tus equipos.'
    },
    {
      icon: 'school',
      title: 'Capacitación y Desarrollo',
      desc: 'Programas de formación diseñados a la medida para potenciar habilidades blandas y técnicas, fomentando el liderazgo y preparando a tu equipo para los retos del futuro.'
    },
    {
      icon: 'psychology',
      title: 'Evaluaciones Psicométricas',
      desc: 'Aplicación e interpretación de baterías de pruebas psicométricas y proyectivas para evaluar inteligencia, personalidad, integridad y habilidades gerenciales.'
    },
    {
      icon: 'gavel',
      title: 'Asesoría Legal Laboral',
      desc: 'Acompañamiento en el cumplimiento de las normativas laborales vigentes, prevención de conflictos, auditorías de expedientes y redacción de contratos.'
    }
  ];

  return (
    <>
      <Header />
      <main className="basic-page-main">
        <div className="page-container">
          <div className="page-header">
            <span className="material-symbols-outlined page-icon">design_services</span>
            <h1 className="page-title">Nuestros Servicios</h1>
            <p className="page-description">
              Proveemos soluciones integrales y personalizadas para transformar la gestión del talento en tu empresa. Conoce nuestro catálogo de servicios especializados.
            </p>
          </div>
          
          <div className="content-grid">
            {servicios.map((srv, idx) => (
              <div className="content-card" key={idx}>
                <span className="material-symbols-outlined card-icon-small">{srv.icon}</span>
                <h3 className="card-heading">{srv.title}</h3>
                <p className="card-text">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Servicios;
