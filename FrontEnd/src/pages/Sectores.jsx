import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../Styles/BasicPage.css';

const Sectores = () => {
  const sectoresInfo = [
    {
      icon: 'devices',
      title: 'Tecnología y TI',
      desc: 'Contratamos perfiles desde desarrolladores Junior hasta arquitectos y CTOs, entendiendo a la perfección los stacks tecnológicos modernos.'
    },
    {
      icon: 'precision_manufacturing',
      title: 'Manufactura y Logística',
      desc: 'Expertos en reclutar perfiles operativos, ingenieros de planta, gerentes de cadena de suministro y personal de almacén altamente calificado.'
    },
    {
      icon: 'account_balance',
      title: 'Finanzas y Banca',
      desc: 'Encontramos talento ético y analítico para puestos contables, auditoría, análisis de riesgos y ejecutivos financieros de alto nivel.'
    },
    {
      icon: 'storefront',
      title: 'Retail y Consumo Masivo',
      desc: 'Cubrimos grandes volúmenes para tiendas y puntos de venta, así como gerencias comerciales, marketing y category managers.'
    },
    {
      icon: 'medical_services',
      title: 'Salud y Farmacéutica',
      desc: 'Selección especializada de personal médico, visitadores médicos, QFBs y posiciones directivas en instituciones de salud.'
    },
    {
      icon: 'real_estate_agent',
      title: 'Inmobiliario y Construcción',
      desc: 'Atraemos ingenieros civiles, arquitectos, asesores inmobiliarios y personal de obra, garantizando experiencia comprobable en el sector.'
    }
  ];

  return (
    <>
      <Header />
      <main className="basic-page-main">
        <div className="page-container">
          <div className="page-header">
            <span className="material-symbols-outlined page-icon">category</span>
            <h1 className="page-title">Sectores que Atendemos</h1>
            <p className="page-description">
              Entendemos que cada industria tiene sus propias reglas y necesidades. Nuestra experiencia multisectorial nos permite hablar tu mismo idioma.
            </p>
          </div>

          <div className="content-grid">
            {sectoresInfo.map((sector, index) => (
              <div className="content-card" key={index}>
                <span className="material-symbols-outlined card-icon-small">{sector.icon}</span>
                <h3 className="card-heading">{sector.title}</h3>
                <p className="card-text">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Sectores;
