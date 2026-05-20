import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Servicios from './pages/Servicios';
import Firma from './pages/Firma';
import Sectores from './pages/Sectores';
import Contacto from './pages/Contacto';
import AvisoLegal from './pages/AvisoLegal';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import Cookies from './pages/Cookies';
import MapaDelSitio from './pages/MapaDelSitio';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/firma" element={<Firma />} />
      <Route path="/sectores" element={<Sectores />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/aviso-legal" element={<AvisoLegal />} />
      <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/mapa-sitio" element={<MapaDelSitio />} />
    </Routes>
  );
}

export default App;
