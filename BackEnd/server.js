require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Importar Modelos para que Sequelize los sincronice
require('./models/User');
require('./models/ContactMessage');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Sincronizar Base de Datos y arrancar servidor
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }) // 'alter: true' will sync db schema with models without dropping existing data
  .then(() => {
    console.log('Base de datos conectada y sincronizada correctamente.');
    app.listen(PORT, () => {
      console.log(`Servidor de Talento & Estrategia corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });
