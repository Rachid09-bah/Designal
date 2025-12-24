const express = require('express')
const multer = require('multer')
const cloudinary = require('../config/cloudinary')

const router = express.Router()

// Configuration multer pour Cloudinary
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const extname = allowedTypes.test(file.originalname.toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Seules les images sont autorisées'))
    }
  }
})

// POST /api/upload - Upload vers Cloudinary
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier fourni' })
    }
    
    // Upload vers Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'designal',
          transformation: [
            { width: 1200, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(req.file.buffer)
    })
    
    res.json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id
    })
  } catch (error) {
    console.error('Erreur Cloudinary:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST /api/upload/single - Alias
router.post('/single', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier fourni' })
    }
    
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'designal',
          transformation: [
            { width: 1200, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(req.file.buffer)
    })
    
    res.json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id
    })
  } catch (error) {
    console.error('Erreur Cloudinary:', error)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router