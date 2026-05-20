import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../Styles/BasicPage.css';

const PoliticaPrivacidad = () => {
  return (
    <>
      <Header />
      <main className="basic-page-main">
        <div className="page-container" style={{ textAlign: 'left' }}>
          <div className="page-header" style={{ textAlign: 'center' }}>
            <span className="material-symbols-outlined page-icon">policy</span>
            <h1 className="page-title">Política de Privacidad</h1>
            <p className="page-description">Información detallada sobre cómo protegemos y tratamos tus datos personales.</p>
          </div>

          <div className="legal-content" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>1. Responsable del Tratamiento</h3>
            <p><strong>Talento & Estrategia Consultores S.A. de C.V.</strong> es el responsable del tratamiento de los datos personales recopilados a través de este sitio web. Para cualquier consulta sobre privacidad, puede contactarnos en <strong>privacidad@talentoestrategia.com</strong>.</p>

            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>2. Datos Recopilados</h3>
            <p>Recopilamos información cuando te registras en nuestro portal, aplicas a una vacante o nos contactas. Esta información puede incluir:</p>
            <ul style={{ marginLeft: '24px', marginTop: '8px', marginBottom: '16px' }}>
              <li><strong>Datos identificativos:</strong> Nombre, apellidos, DNI/RFC.</li>
              <li><strong>Datos de contacto:</strong> Correo electrónico, teléfono, dirección.</li>
              <li><strong>Datos profesionales:</strong> Currículum vitae, experiencia laboral, educación.</li>
              <li><strong>Datos corporativos:</strong> Razón social, puesto, necesidades de contratación (para empresas).</li>
            </ul>

            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>3. Finalidad del Tratamiento</h3>
            <p>Tus datos son utilizados para los siguientes fines:</p>
            <ul style={{ marginLeft: '24px', marginTop: '8px', marginBottom: '16px' }}>
              <li>Gestionar procesos de reclutamiento y selección de personal (Headhunting).</li>
              <li>Proveer servicios de consultoría y administración de nómina.</li>
              <li>Crear y gestionar tu cuenta en el Portal de Clientes.</li>
              <li>Responder a consultas enviadas a través de nuestro formulario de contacto.</li>
              <li>Mejorar nuestros servicios y personalizar la experiencia del usuario (incluyendo el futuro uso de asistencia mediante Chatbot).</li>
            </ul>

            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>4. Compartición de Datos</h3>
            <p>Tus datos profesionales (CV) solo serán compartidos con empresas clientes en el marco de procesos de selección específicos, siempre con tu consentimiento explícito. No vendemos ni cedemos datos a terceros para fines publicitarios.</p>

            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>5. Derechos ARCO</h3>
            <p>Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos personales. Para ejercer estos derechos, envía una solicitud formal a nuestro correo de privacidad indicando tu petición y adjuntando una copia de tu identificación oficial.</p>

            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>6. Seguridad de los Datos</h3>
            <p>Implementamos medidas de seguridad técnicas y organizativas robustas (cifrado SSL, bases de datos seguras) para proteger tus datos personales contra el acceso no autorizado, alteración, divulgación o destrucción.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PoliticaPrivacidad;
