const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { auth } = require('../middleware/auth')

const router = express.Router()

// Créer le dossier uploads s'il n'existe pas
const uploadsDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configuration multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB pour les modèles 3D
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|glb|gltf|obj|fbx|dae|ply|stl/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const imageTypes = /image\/(jpeg|jpg|png|gif|webp)/
    const modelTypes = /model\/(gltf-binary|gltf\+json)|application\/(octet-stream)/
    
    if (imageTypes.test(file.mimetype) || modelTypes.test(file.mimetype) || extname) {
      return cb(null, true)
    } else {
      cb(new Error('Seules les images et modèles 3D sont autorisés'))
    }
  }
})

// POST /api/upload - Upload d'une image
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier fourni' })
    }
    
    const imageUrl = `/uploads/${req.file.filename}`
    
    res.json({
      success: true,
      imageUrl,
      filename: req.file.filename
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/upload/single - Upload d'une image (alias)
router.post('/single', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier fourni' })
    }
    
    const imageUrl = `/uploads/${req.file.filename}`
    
    res.json({
      success: true,
      imageUrl,
      filename: req.file.filename
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/upload/multiple - Upload multiple images
router.post('/multiple', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Aucun fichier fourni' })
    }
    
    const images = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename
    }))
    
    res.json({
      success: true,
      images
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router