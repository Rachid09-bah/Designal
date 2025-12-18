const mongoose = require('mongoose')
require('dotenv').config()

const Project = require('../models/Project')

async function fixImageUrls() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connecté à MongoDB')

    // Trouver tous les projets avec des URLs localhost
    const projects = await Project.find({
      'images.url': { $regex: 'localhost' }
    })

    console.log(`📊 ${projects.length} projets à corriger`)

    for (const project of projects) {
      let updated = false
      
      // Corriger les URLs d'images
      project.images = project.images.map(image => {
        if (image.url && image.url.includes('localhost:5001')) {
          const newUrl = image.url.replace('http://localhost:5001', 'https://designal-bah.onrender.com')
          console.log(`🔄 ${image.url} → ${newUrl}`)
          updated = true
          return { ...image, url: newUrl }
        }
        return image
      })

      // Corriger l'URL du modèle 3D si elle existe
      if (project.model3D && project.model3D.url && project.model3D.url.includes('localhost:5001')) {
        project.model3D.url = project.model3D.url.replace('http://localhost:5001', 'https://designal-bah.onrender.com')
        updated = true
      }

      if (updated) {
        await project.save()
        console.log(`✅ Projet "${project.title}" mis à jour`)
      }
    }

    console.log('🎉 Correction terminée!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

fixImageUrls()