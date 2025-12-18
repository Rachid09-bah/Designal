const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
const axios = require('axios')

const API_URL = 'https://votre-backend.onrender.com/api'
const TOKEN = 'votre-token-admin' // Récupérez depuis localStorage après connexion

async function uploadImage(imagePath) {
  try {
    const form = new FormData()
    form.append('image', fs.createReadStream(imagePath))
    
    const response = await axios.post(`${API_URL}/upload`, form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${TOKEN}`
      }
    })
    
    console.log(`✅ ${path.basename(imagePath)} uploadé:`, response.data.imageUrl)
    return response.data.imageUrl
  } catch (error) {
    console.error(`❌ Erreur ${path.basename(imagePath)}:`, error.message)
  }
}

// Utilisation
const imagesFolder = './mes-images' // Dossier contenant vos images
const imageFiles = fs.readdirSync(imagesFolder)
  .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))

imageFiles.forEach(file => {
  uploadImage(path.join(imagesFolder, file))
})