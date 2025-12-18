const mongoose = require('mongoose')

// Configuration directe
const MONGODB_URI = 'mongodb+srv://rachidoubah:rachidbailoDjenabou09@cluster0.ajsyg7t.mongodb.net/designal'

async function fixAllUrls() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connecté à MongoDB')

    // Schéma Project existant
    const Project = mongoose.model('Project', new mongoose.Schema({}, { strict: false }))

    // Trouver TOUS les projets avec localhost
    const projects = await Project.find({
      $or: [
        { 'images.url': { $regex: 'localhost' } },
        { 'model3D.url': { $regex: 'localhost' } }
      ]
    })

    console.log(`🔍 ${projects.length} projets à corriger`)

    for (const project of projects) {
      let updated = false

      // Corriger images
      if (project.images) {
        project.images = project.images.map(image => {
          if (image.url && image.url.includes('localhost:5001')) {
            console.log(`🔄 Image: ${image.url}`)
            image.url = image.url.replace('http://localhost:5001', 'https://designal-bah.onrender.com')
            updated = true
          }
          return image
        })
      }

      // Corriger modèle 3D
      if (project.model3D && project.model3D.url && project.model3D.url.includes('localhost:5001')) {
        console.log(`🔄 3D: ${project.model3D.url}`)
        project.model3D.url = project.model3D.url.replace('http://localhost:5001', 'https://designal-bah.onrender.com')
        updated = true
      }

      if (updated) {
        await project.save()
        console.log(`✅ "${project.title}" corrigé`)
      }
    }

    console.log('🎉 TOUTES LES URLs CORRIGÉES!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

fixAllUrls()