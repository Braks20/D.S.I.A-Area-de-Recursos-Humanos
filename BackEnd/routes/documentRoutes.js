const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// PDF upload
router.post('/upload', documentController.uploadDocument);

// List documents
router.get('/', documentController.getDocuments);

// Toggle active/inactive
router.patch('/:id/toggle', documentController.toggleDocument);

// Delete document
router.delete('/:id', documentController.deleteDocument);

// Chat history + stats
router.get('/history', documentController.getChatHistory);

module.exports = router;
