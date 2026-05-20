const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const KnowledgeDocument = sequelize.define('KnowledgeDocument', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Display name for the document',
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Original filename of the uploaded PDF',
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Server path to the uploaded file',
  },
  textContent: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Extracted text from the PDF for RAG search',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Only active documents are used for chat responses',
  },
  uploadedBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, { timestamps: true });

module.exports = KnowledgeDocument;
