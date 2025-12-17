const express = require('express')
const router = express.Router()

// GET /api/projects - Liste publique des projets
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      projects: []
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router