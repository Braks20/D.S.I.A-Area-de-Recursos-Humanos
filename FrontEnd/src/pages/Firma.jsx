import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../Styles/BasicPage.css';

const Firma = () => {
  return (
    <>
      <Header />
      <main className="basic-page-main">
        <div className="page-container">
          <div className="page-header">
            <span className="material-symbols-outlined page-icon">apartment</span>
            <h1 className="page-title">Nuestra Firma</h1>
            <p className="page-description">
              Más de 15 años de experiencia consolidando equipos de alto rendimiento. Somos el aliado estratégico de las mejores empresas a nivel nacional.
            </p>
          </div>

          <div className="content-grid">
            <div className="content-card">
              <span className="material-symbols-outlined card-icon-small">flag</span>
              <h3 className="card-heading">Nuestra Misión</h3>
              <p className="card-text">
                Impulsar el crecimiento sostenible de las organizaciones mediante la correcta atracción, retención y desarrollo del capital humano, ofreciendo soluciones ágiles y de calidad humana.
              </p>
            </div>
            <div className="content-card">
              <span className="material-symbols-outlined card-icon-small">visibility</span>
              <h3 className="card-heading">Nuestra Visión</h3>
              <p className="card-text">
                Ser reconocidos como la firma consultora de Recursos Humanos líder en la región, marcando la pauta en innovación de procesos y dejando una huella positiva en el mundo corporativo.
              </p>
            </div>
            <div className="content-card">
              <span className="material-symbols-outlined card-icon-small">workspace_premium</span>
              <h3 className="card-heading">Nuestros Valores</h3>
              <p className="card-text">
                Nos regimos por principios inquebrantables: <strong>Integridad</strong> en nuestro actuar, <strong>Excelencia</strong> en cada entrega, y <strong>Compromiso</strong> absoluto con el éxito de nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Firma;
