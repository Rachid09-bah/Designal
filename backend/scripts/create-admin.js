const mongoose = require('mongoose')
const User = require('../models/User')
require('dotenv').config()

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/designal')
    
    // Vérifier si admin existe déjà
    const existingAdmin = await User.findOne({ email: 'admin@designal.com' })
    if (existingAdmin) {
      console.log('Admin déjà existant')
      process.exit(0)
    }

    // Créer admin
    const admin = new User({
      name: 'Admin Designal',
      email: 'admin@designal.com',
      password: 'admin123',
      role: 'admin'
    })

    await admin.save()
    console.log('✅ Admin créé avec succès')
    console.log('Email: admin@designal.com')
    console.log('Mot de passe: admin123')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

createAdmin()