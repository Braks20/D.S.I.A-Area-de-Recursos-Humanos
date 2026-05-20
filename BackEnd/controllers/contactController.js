const ContactMessage = require('../models/ContactMessage');

exports.sendMessage = async (req, res) => {
  try {
    const { fullName, company, email, subject, message } = req.body;

    const newMessage = await ContactMessage.create({
      fullName,
      company,
      email,
      subject,
      message
    });

    res.status(201).json({ message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.', data: newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al enviar el mensaje.' });
  }
};
