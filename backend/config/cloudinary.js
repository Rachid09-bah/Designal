const cloudinary = require('cloudinary').v2

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'daice51xy',
  api_key: process.env.CLOUDINARY_API_KEY || '978342353197896',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'u82IoTiv9DtIVMcWAxDoXITyBSk'
})

module.exports = cloudinary