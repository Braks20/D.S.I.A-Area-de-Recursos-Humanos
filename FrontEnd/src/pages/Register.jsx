import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../Styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Las contraseñas no coinciden.');
    }
    if (formData.password.length < 8) {
      return setError('La contraseña debe tener al menos 8 caracteres.');
    }

    setLoading(true);
    try {
      await api.post('/auth/register', {
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        password: formData.password,
      });
      setSuccess('¡Empresa registrada con éxito! Redirigiendo al inicio de sesión...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar. Inténtalo de nuevo.');
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
            <h1 className="auth-title">Registro de Empresa</h1>
            <p className="auth-subtitle">Complete los datos para crear su cuenta corporativa.</p>
          </div>

          {error && <div className="form-alert form-alert-error">{error}</div>}
          {success && <div className="form-alert form-alert-success">{success}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="companyName">Nombre de la Empresa</label>
              <input className="form-input" id="companyName" name="companyName" onChange={handleChange} placeholder="Ej. TechCorp Solutions" required type="text" value={formData.companyName} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contactPerson">Persona de Contacto</label>
              <input className="form-input" id="contactPerson" name="contactPerson" onChange={handleChange} placeholder="Nombre completo" required type="text" value={formData.contactPerson} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Correo Corporativo</label>
              <input className="form-input" id="email" name="email" onChange={handleChange} placeholder="ejemplo@empresa.com" required type="email" value={formData.email} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Contraseña</label>
              <input className="form-input" id="password" name="password" onChange={handleChange} placeholder="Mínimo 8 caracteres" required type="password" value={formData.password} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input className="form-input" id="confirmPassword" name="confirmPassword" onChange={handleChange} placeholder="Repita su contraseña" required type="password" value={formData.confirmPassword} />
            </div>
            <div className="form-submit">
              <button className="btn-primary btn-block" disabled={loading} type="submit">
                {loading ? 'Registrando...' : 'Registrar Empresa'}
              </button>
            </div>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              ¿Ya tienes una cuenta? <Link className="text-link-bold" to="/login">Inicia Sesión</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
