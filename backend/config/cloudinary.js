const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Configuration du stockage Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'designal-projects', // Dossier dans Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 1920, height: 1080, crop: 'limit', quality: 'auto' }, // Image principale
      { width: 800, height: 600, crop: 'fill', quality: 'auto', fetch_format: 'auto' } // Thumbnail
    ]
  }
})

// Configuration Multer avec Cloudinary
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Seules les images sont autorisées'), false)
    }
  }
})

// Fonction pour supprimer une image
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.error('Erreur suppression Cloudinary:', error)
    throw error
  }
}

// Fonction pour optimiser une URL d'image
const optimizeImageUrl = (url, options = {}) => {
  const { width = 800, height = 600, quality = 'auto' } = options
  return cloudinary.url(url, {
    width,
    height,
    crop: 'fill',
    quality,
    fetch_format: 'auto'
  })
}

module.exports = {
  cloudinary,
  upload,
  deleteImage,
  optimizeImageUrl
}