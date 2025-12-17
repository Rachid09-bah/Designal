const express = require('express')
const router = express.Router()

// POST /api/upload - Upload basique
router.post('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Upload non implémenté'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router