const express = require('express')
const multer = require('multer')

const router = express.Router()

// Configuration Cloudinary directe
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'daice51xy',
  api_key: '978342353197896',
  api_secret: 'u82IoTiv9DtIVMcWAxDoXITyBSk'
})

// Configuration multer
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Seules les images sont autorisées'))
    }
  }
})

// POST /api/upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier fourni' })
    }
    
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: 'designal',
        transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }]
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary error:', error)
          return res.status(500).json({ error: error.message })
        }
        res.json({
          success: true,
          imageUrl: result.secure_url,
          publicId: result.public_id
        })
      }
    ).end(req.file.buffer)
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST /api/upload/single
router.post('/single', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier fourni' })
    }
    
    cloudinary.uploader.upload_stream(
      {
        folder: 'designal',
        transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }]
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary error:', error)
          return res.status(500).json({ error: error.message })
        }
        res.json({
          success: true,
          imageUrl: result.secure_url,
          publicId: result.public_id
        })
      }
    ).end(req.file.buffer)
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router