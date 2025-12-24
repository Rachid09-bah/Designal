// Script pour uploader toutes les images d'un dossier
const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
const axios = require('axios')

const API_URL = 'https://designal-bah.onrender.com/api'
const TOKEN = 'votre-token-admin' // Récupérez depuis localStorage
const IMAGES_FOLDER = './images-pinterest' // Dossier avec vos images

async function uploadImagesFromFolder() {
  try {
    const files = fs.readdirSync(IMAGES_FOLDER)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))

    console.log(`📸 ${files.length} images trouvées`)

    for (const file of files) {
      const filePath = path.join(IMAGES_FOLDER, file)
      
      // Créer un projet pour chaque image
      const form = new FormData()
      form.append('title', `Projet ${path.parse(file).name}`)
      form.append('description', 'Projet inspiré de Pinterest')
      form.append('category', 'Résidentiel')
      form.append('image', fs.createReadStream(filePath))

      try {
        const response = await axios.post(`${API_URL}/projects`, form, {
          headers: {
            ...form.getHeaders(),
            'Authorization': `Bearer ${TOKEN}`
          }
        })
        
        console.log(`✅ ${file} uploadé`)
      } catch (error) {
        console.error(`❌ Erreur ${file}:`, error.message)
      }
    }

    console.log('🎉 Upload terminé!')
  } catch (error) {
    console.error('❌ Erreur:', error)
  }
}

// Utilisation:
// 1. Créez un dossier "images-pinterest"
// 2. Mettez vos images Pinterest dedans
// 3. Lancez: node upload-pinterest.js
uploadImagesFromFolder()