const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = crypto.randomUUID()
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const allowedExts = ['.jpg', '.jpeg', '.png', '.webp']
  const ext = path.extname(file.originalname).toLowerCase()
  
  if (allowedTypes.includes(file.mimetype) && allowedExts.includes(ext)) {
    cb(null, true)
  } else {
    cb(new Error('Format de fichier non autorisé. Utilisez JPG, PNG ou WebP'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
    files: 10
  }
})

// Error handler pour multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Fichier trop volumineux (max 2MB)' })
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Trop de fichiers (max 10)' })
    }
  }
  if (error.message.includes('Format de fichier')) {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = { upload, handleMulterError }