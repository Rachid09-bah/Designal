const cloudinary = require('cloudinary').v2

// Configuration Cloudinary avec fallback complet
cloudinary.config({
  cloud_name: 'daice51xy',
  api_key: '978342353197896',
  api_secret: 'u82IoTiv9DtIVMcWAxDoXITyBSk'
})

module.exports = cloudinary