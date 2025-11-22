const mongoose = require('mongoose')
const User = require('../models/User')
const Project = require('../models/Project')
require('dotenv').config()

const initializeDatabase = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/designal')
    console.log('✅ Connecté à MongoDB')

    // Créer un admin par défaut
    const adminExists = await User.findOne({ role: 'admin' })
    
    if (!adminExists) {
      const admin = new User({
        name: 'Admin DESIGNAL',
        email: 'admin@designal.com',
        password: 'admin123',
        role: 'admin'
      })
      
      await admin.save()
      console.log('✅ Admin créé: admin@designal.com / admin123')
    } else {
      console.log('ℹ️ Admin déjà existant')
    }

    // Créer des projets d'exemple
    const projectCount = await Project.countDocuments()
    
    if (projectCount === 0) {
      const sampleProjects = [
        {
          title: "Salon Moderne Luxe",
          description: "Design contemporain avec touches dorées et matériaux nobles",
          category: "Résidentiel",
          style: "Moderne",
          images: [{
            url: "/luxury-modern-living-room.png",
            alt: "Salon moderne luxueux",
            isPrimary: true
          }],
          status: "published",
          featured: true,
          tags: ["luxe", "moderne", "salon"]
        },
        {
          title: "Chambre Minimaliste",
          description: "Épuré et fonctionnel avec une ambiance zen",
          category: "Résidentiel", 
          style: "Moderne",
          images: [{
            url: "/minimalist-bedroom.png",
            alt: "Chambre minimaliste",
            isPrimary: true
          }],
          status: "published",
          featured: false,
          tags: ["minimaliste", "zen", "chambre"]
        },
        {
          title: "Cuisine Moderne Ouverte",
          description: "Espace ouvert et lumineux avec îlot central",
          category: "Résidentiel",
          style: "Moderne", 
          images: [{
            url: "/modern-kitchen.png",
            alt: "Cuisine moderne",
            isPrimary: true
          }],
          status: "published",
          featured: true,
          tags: ["cuisine", "moderne", "ouvert"]
        }
      ]

      await Project.insertMany(sampleProjects)
      console.log('✅ Projets d\'exemple créés')
    } else {
      console.log('ℹ️ Projets déjà existants')
    }

    console.log('🎉 Initialisation terminée!')
    process.exit(0)
    
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

initializeDatabase()