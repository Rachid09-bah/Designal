const mongoose = require('mongoose')
const User = require('../models/User')
require('dotenv').config()

async function initAdmin() {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('⚠️ MONGODB_URI non défini')
      return
    }

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connecté à MongoDB')
    
    // Vérifier si admin existe
    const existingAdmin = await User.findOne({ role: 'admin' })
    if (existingAdmin) {
      console.log('✅ Admin déjà existant:', existingAdmin.email)
      return
    }

    // Créer admin par défaut
    const admin = new User({
      name: 'Admin Designal',
      email: 'admin@designal.com',
      password: 'designal2024',
      role: 'admin'
    })

    await admin.save()
    console.log('✅ Admin créé:')
    console.log('Email: admin@designal.com')
    console.log('Mot de passe: designal2024')
    
  } catch (error) {
    console.error('❌ Erreur init admin:', error.message)
  } finally {
    mongoose.disconnect()
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  initAdmin()
}

module.exports = initAdmin