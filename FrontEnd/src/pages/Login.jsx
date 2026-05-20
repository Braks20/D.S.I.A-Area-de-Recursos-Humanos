import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../Styles/Register.css'; // Reusing the shared auth styles

const Login = () => {
  return (
    <>
      <Header />
      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-card-gradient"></div>
          
          <div className="auth-header">
            <h1 className="auth-title">Portal de Clientes</h1>
            <p className="auth-subtitle">Ingrese sus credenciales para acceder</p>
          </div>
          
          <form className="auth-form" method="POST">
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Correo Electrónico
              </label>
              <div className="form-input-wrapper">
                <span className="material-symbols-outlined form-input-icon">mail</span>
                <input className="form-input with-icon" id="email" name="email" placeholder="ejemplo@empresa.com" required type="email" />
              </div>
            </div>
            
            <div className="form-group">
              <div className="form-row-between">
                <label className="form-label" htmlFor="password">
                  Contraseña
                </label>
                <a className="text-link-bold" href="#">
                  ¿Olvidó su contraseña?
                </a>
              </div>
              <div className="form-input-wrapper mt-2">
                <span className="material-symbols-outlined form-input-icon">lock</span>
                <input className="form-input with-icon" id="password" name="password" placeholder="••••••••" required type="password" />
              </div>
            </div>
            
            <button className="btn-primary btn-block" type="submit" style={{ marginTop: '16px' }}>
              <span>Entrar al Portal</span>
              <span className="material-symbols-outlined icon-small">arrow_forward</span>
            </button>
          </form>
          
          <div className="auth-footer">
            <p className="auth-footer-text">
              ¿No tiene una cuenta? 
              <Link to="/register" className="text-link-bold" style={{ marginLeft: '4px' }}>
                Crear una cuenta
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
