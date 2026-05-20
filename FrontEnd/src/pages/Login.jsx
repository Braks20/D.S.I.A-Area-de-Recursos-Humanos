import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../Styles/Register.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales incorrectas. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

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

          {error && <div className="form-alert form-alert-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Correo Electrónico</label>
              <div className="form-input-wrapper">
                <span className="material-symbols-outlined form-input-icon">mail</span>
                <input className="form-input with-icon" id="email" name="email" onChange={handleChange} placeholder="ejemplo@empresa.com" required type="email" value={formData.email} />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row-between">
                <label className="form-label" htmlFor="password">Contraseña</label>
                <a className="text-link-bold" href="#">¿Olvidó su contraseña?</a>
              </div>
              <div className="form-input-wrapper" style={{ marginTop: '8px' }}>
                <span className="material-symbols-outlined form-input-icon">lock</span>
                <input className="form-input with-icon" id="password" name="password" onChange={handleChange} placeholder="••••••••" required type="password" value={formData.password} />
              </div>
            </div>
            <button className="btn-primary btn-block" disabled={loading} style={{ marginTop: '16px' }} type="submit">
              <span>{loading ? 'Ingresando...' : 'Entrar al Portal'}</span>
              {!loading && <span className="material-symbols-outlined icon-small">arrow_forward</span>}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              ¿No tiene una cuenta?
              <Link className="text-link-bold" style={{ marginLeft: '4px' }} to="/register">Crear una cuenta</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
