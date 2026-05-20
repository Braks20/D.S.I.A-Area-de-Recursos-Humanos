const multer = require('multer');
const path = require('path');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const KnowledgeDocument = require('../models/KnowledgeDocument');
const ChatHistory = require('../models/ChatHistory');
const { Op } = require('sequelize');

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Solo se permiten archivos PDF.'), false);
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Upload PDF and extract text
exports.uploadDocument = [
  upload.single('pdf'),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'No se recibió ningún archivo PDF.' });

      const { name } = req.body;
      if (!name) return res.status(400).json({ message: 'El nombre del documento es requerido.' });

      // Extract text from PDF
      const pdfBuffer = fs.readFileSync(req.file.path);
      const parsed = await pdfParse(pdfBuffer);
      const textContent = parsed.text.replace(/\s+/g, ' ').trim();

      const doc = await KnowledgeDocument.create({
        name,
        fileName: req.file.originalname,
        filePath: req.file.path,
        textContent,
        isActive: true,
        uploadedBy: req.body.uploadedBy || 'Admin'
      });

      res.status(201).json({ message: `Documento "${name}" cargado correctamente.`, document: { id: doc.id, name: doc.name, fileName: doc.fileName, isActive: doc.isActive, createdAt: doc.createdAt } });
    } catch (error) {
      console.error('[Documents] Upload error:', error.message);
      res.status(500).json({ message: 'Error al procesar el PDF.' });
    }
  }
];

// List all documents
exports.getDocuments = async (req, res) => {
  try {
    const docs = await KnowledgeDocument.findAll({
      attributes: ['id', 'name', 'fileName', 'isActive', 'uploadedBy', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los documentos.' });
  }
};

// Toggle document active/inactive
exports.toggleDocument = async (req, res) => {
  try {
    const doc = await KnowledgeDocument.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Documento no encontrado.' });
    doc.isActive = !doc.isActive;
    await doc.save();
    res.json({ message: `Documento ${doc.isActive ? 'activado' : 'desactivado'}.`, isActive: doc.isActive });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el documento.' });
  }
};

// Delete document
exports.deleteDocument = async (req, res) => {
  try {
    const doc = await KnowledgeDocument.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Documento no encontrado.' });
    if (fs.existsSync(doc.filePath)) fs.unlinkSync(doc.filePath);
    await doc.destroy();
    res.json({ message: 'Documento eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el documento.' });
  }
};

// Get chat history (unanswered + FAQ stats)
exports.getChatHistory = async (req, res) => {
  try {
    const all = await ChatHistory.findAll({ order: [['createdAt', 'DESC']], limit: 100 });
    const unanswered = all.filter(h => !h.wasAnswered);
    
    // FAQ: top repeated questions
    const freq = {};
    all.forEach(h => {
      const key = h.userMessage.toLowerCase().substring(0, 60);
      freq[key] = (freq[key] || 0) + 1;
    });
    const faq = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([question, count]) => ({ question, count }));

    res.json({ total: all.length, unanswered: unanswered.length, faq, history: all });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el historial.' });
  }
};
