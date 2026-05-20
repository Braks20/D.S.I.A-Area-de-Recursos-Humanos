require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');

// Import all models so Sequelize syncs them
require('./models/User');
require('./models/ContactMessage');
require('./models/ChatHistory');
require('./models/KnowledgeDocument');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));

// Sync DB and start server
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Base de datos conectada y sincronizada correctamente.');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor de Talento & Estrategia corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });
