const express = require('express')
const { upload, handleMulterError } = require('../middleware/upload')
const { adminAuth } = require('../middleware/auth')
const router = express.Router()

// POST /api/upload - Upload d'image (admin)
router.post('/', adminAuth, upload.single('image'), handleMulterError, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier fourni' })
    }

    const imageUrl = `/uploads/${req.file.filename}`
    
    res.json({
      message: 'Image uploadée avec succès',
      imageUrl,
      filename: req.file.filename,
      size: req.file.size
    })
  } catch (error) {
    console.error('Erreur upload:', error)
    res.status(500).json({ error: 'Erreur lors de l\'upload' })
  }
})

// POST /api/upload/multiple - Upload multiple images (admin)
router.post('/multiple', adminAuth, upload.array('images', 10), handleMulterError, (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Aucun fichier fourni' })
    }

    const images = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      size: file.size
    }))
    
    res.json({
      message: 'Images uploadées avec succès',
      images,
      count: images.length
    })
  } catch (error) {
    console.error('Erreur upload multiple:', error)
    res.status(500).json({ error: 'Erreur lors de l\'upload' })
  }
})

module.exports = router