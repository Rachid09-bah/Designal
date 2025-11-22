const express = require('express')
const { validateContact } = require('../middleware/validation')
const { sendMessage } = require('../controllers/contactController')
const router = express.Router()

// POST /api/contact - Envoyer un message de contact
router.post('/', validateContact, sendMessage)

module.exports = router