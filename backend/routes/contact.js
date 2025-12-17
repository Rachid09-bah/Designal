const express = require('express')
const router = express.Router()

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    // Simuler l'envoi d'email
    console.log('Contact reçu:', req.body)
    
    res.json({
      success: true,
      message: 'Message envoyé avec succès'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router