import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../Styles/BasicPage.css';

const AvisoLegal = () => {
  return (
    <>
      <Header />
      <main className="basic-page-main">
        <div className="page-container" style={{ textAlign: 'left' }}>
          <div className="page-header" style={{ textAlign: 'center' }}>
            <span className="material-symbols-outlined page-icon">gavel</span>
            <h1 className="page-title">Aviso Legal</h1>
            <p className="page-description">Información general y condiciones de uso del sitio web de Talento & Estrategia.</p>
          </div>

          <div className="legal-content" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>1. Información General</h3>
            <p>En cumplimiento con las normativas vigentes, se informa que este sitio web es titularidad de <strong>Talento & Estrategia Consultores S.A. de C.V.</strong>, con domicilio en Av. Reforma 222, Piso 14, Cuauhtémoc, CDMX, y correo electrónico de contacto: contacto@talentoestrategia.com.</p>

            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>2. Objeto</h3>
            <p>El presente Aviso Legal regula el acceso, navegación y uso del presente sitio web. El acceso a la misma atribuye la condición de Usuario e implica la aceptación plena de todas las disposiciones incluidas en este documento.</p>

            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>3. Propiedad Intelectual e Industrial</h3>
            <p>Todos los contenidos del sitio web (textos, fotografías, gráficos, imágenes, tecnología, software, links y demás contenidos audiovisuales o sonoros), así como su diseño gráfico y códigos fuente, son propiedad intelectual de Talento & Estrategia o de terceros. No se cede al Usuario ningún derecho de explotación sobre los mismos más allá de lo estrictamente necesario para el correcto uso del sitio web.</p>

            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>4. Responsabilidad del Usuario</h3>
            <p>El Usuario se compromete a utilizar el sitio web y sus servicios y contenidos sin contravenir la legislación vigente, la buena fe, los usos generalmente aceptados y el orden público. Queda prohibido, el uso del sitio web con fines ilícitos o lesivos contra Talento & Estrategia o cualquier tercero.</p>
            
            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>5. Modificaciones</h3>
            <p>Talento & Estrategia se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados.</p>

            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>6. Legislación Aplicable</h3>
            <p>Las relaciones establecidas entre Talento & Estrategia y el Usuario se regirán por lo dispuesto en la normativa vigente aplicable en los Estados Unidos Mexicanos. Para la resolución de cualquier conflicto que pudiera derivarse, las partes se someten a los Juzgados y Tribunales de la Ciudad de México.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AvisoLegal;
