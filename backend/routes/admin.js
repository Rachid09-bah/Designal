const express = require('express')
const router = express.Router()
const { auth, adminAuth } = require('../middleware/auth')
const User = require('../models/User')
const Project = require('../models/Project')

// GET /api/admin/dashboard - Statistiques admin
router.get('/dashboard', auth, adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalProjects = await Project.countDocuments()
    const publishedProjects = await Project.countDocuments({ status: 'published' })
    const featuredProjects = await Project.countDocuments({ featured: true })
    
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email role createdAt')
    
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category subcategory style status featured createdAt')
    
    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProjects,
        publishedProjects,
        featuredProjects
      },
      recentUsers,
      recentProjects
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/admin/users - Liste des utilisateurs
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select('name email role createdAt')
    
    res.json({
      success: true,
      users
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/admin/create-admin - Créer un admin
router.post('/create-admin', auth, adminAuth, async (req, res) => {
  try {
    const { name, email, password } = req.body
    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Utilisateur déjà existant' })
    }
    
    const user = new User({
      name,
      email,
      password,
      role: 'admin'
    })
    
    await user.save()
    
    res.status(201).json({
      success: true,
      message: 'Admin créé avec succès'
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router