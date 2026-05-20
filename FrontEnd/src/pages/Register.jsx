import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../Styles/Register.css';

const Register = () => {
  return (
    <>
      <Header />
      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Registro de Empresa</h1>
            <p className="auth-subtitle">Complete los datos para crear su cuenta corporativa.</p>
          </div>
          
          <form className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="companyName">Nombre de la Empresa</label>
              <input className="form-input" id="companyName" placeholder="Ej. TechCorp Solutions" type="text" />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="contactPerson">Persona de Contacto</label>
              <input className="form-input" id="contactPerson" placeholder="Nombre completo" type="text" />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="email">Correo Corporativo</label>
              <input className="form-input" id="email" placeholder="ejemplo@empresa.com" type="email" />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="password">Contraseña</label>
              <input className="form-input" id="password" placeholder="Mínimo 8 caracteres" type="password" />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input className="form-input" id="confirmPassword" placeholder="Repita su contraseña" type="password" />
            </div>
            
            <div className="form-checkbox-group">
              <div className="checkbox-wrapper">
                <input className="form-checkbox" id="terms" type="checkbox" />
              </div>
              <div className="checkbox-label-wrapper">
                <label className="checkbox-label" htmlFor="terms">
                  He leído y acepto los <a className="text-link" href="#">Términos y Condiciones</a> y la <a className="text-link" href="#">Política de Privacidad</a>.
                </label>
              </div>
            </div>
            
            <div className="form-submit">
              <button className="btn-primary btn-block" type="submit">
                Registrar Empresa
              </button>
            </div>
          </form>
          
          <div className="auth-footer">
            <p className="auth-footer-text">
              ¿Ya tienes una cuenta? <Link to="/login" className="text-link-bold">Inicia Sesión</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
