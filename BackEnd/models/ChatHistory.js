const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChatHistory = sequelize.define('ChatHistory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Browser session identifier (anonymous)',
  },
  userMessage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  botReply: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sourceDocument: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Name of the document used to generate the reply',
  },
  wasAnswered: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'false = fallback was used, no document matched',
  },
}, { timestamps: true });

module.exports = ChatHistory;
