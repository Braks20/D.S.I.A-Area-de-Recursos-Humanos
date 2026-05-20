const sequelize = require('../config/database');
const User = require('./User');
const ContactMessage = require('./ContactMessage');

module.exports = {
  User,
  ContactMessage,
  sequelize
};
