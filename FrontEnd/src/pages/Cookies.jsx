import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../Styles/BasicPage.css';

const Cookies = () => {
  return (
    <>
      <Header />
      <main className="basic-page-main">
        <div className="page-container" style={{ textAlign: 'left' }}>
          <div className="page-header" style={{ textAlign: 'center' }}>
            <span className="material-symbols-outlined page-icon">cookie</span>
            <h1 className="page-title">Política de Cookies</h1>
            <p className="page-description">Conoce cómo utilizamos las cookies para mejorar tu experiencia en nuestra plataforma.</p>
          </div>

          <div className="legal-content" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>1. ¿Qué son las Cookies?</h3>
            <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (ordenador, smartphone, tablet) cuando los visitas. Sirven para recordar tus preferencias, mantener tu sesión iniciada y analizar cómo interactúas con el sitio web para mejorarlo.</p>

            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>2. ¿Qué tipos de cookies utilizamos?</h3>
            <ul style={{ marginLeft: '24px', marginTop: '8px', marginBottom: '16px' }}>
              <li><strong>Cookies Técnicas / Necesarias:</strong> Son esenciales para el funcionamiento del sitio web. Permiten la navegación y el uso de opciones como el acceso a áreas seguras (Portal de Clientes).</li>
              <li><strong>Cookies de Personalización:</strong> Permiten recordar información para que accedas al servicio con determinadas características que pueden diferenciar tu experiencia de la de otros usuarios (ej. idioma).</li>
              <li><strong>Cookies de Análisis:</strong> Nos permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico del uso que hacen los usuarios del servicio ofertado (utilizamos herramientas como Google Analytics).</li>
            </ul>

            <h3 style={{ color: 'var(--primary)', marginTop: '24px', marginBottom: '12px' }}>3. Gestión de las Cookies</h3>
            <p>Puedes restringir, bloquear o borrar las cookies de este sitio web utilizando tu navegador. Cada navegador opera de forma diferente, la función de "Ayuda" te mostrará cómo hacerlo.</p>
            <p>Ten en cuenta que si deshabilitas las cookies técnicas, es posible que algunas funciones importantes de la plataforma, como el inicio de sesión, dejen de funcionar correctamente.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cookies;
