const express = require('express')
const User = require('../models/User')
const { auth, adminAuth } = require('../middleware/auth')
const { validateRegister, validateLogin } = require('../middleware/validation')
const { register, login, getProfile, updateProfile, changePassword } = require('../controllers/authController')
const router = express.Router()

// Routes d'authentification
router.post('/register', validateRegister, register)
router.post('/login', login)
router.get('/me', auth, getProfile)
router.put('/profile', auth, updateProfile)
router.put('/change-password', auth, changePassword)

// GET /api/auth/users - Liste utilisateurs (admin)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json({ users })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /api/auth/users/:id - Modifier utilisateur (admin)
router.put('/users/:id', adminAuth, async (req, res) => {
  try {
    const { name, email, role, isActive } = req.body
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, isActive },
      { new: true, runValidators: true }
    ).select('-password')
    
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }
    
    res.json({ user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// DELETE /api/auth/users/:id - Supprimer utilisateur (admin)
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }
    
    res.json({ message: 'Utilisateur supprimé' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router