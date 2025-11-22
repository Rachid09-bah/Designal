const jwt = require('jsonwebtoken')
const validator = require('validator')
const User = require('../models/User')

// Générer un token JWT
const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'designal-fallback-secret-2024'
  return jwt.sign(
    { userId }, 
    secret,
    { expiresIn: '7d' }
  )
}

// Inscription
const register = async (req, res) => {
  try {
    const { email, password, name, phone, company } = req.body

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Tous les champs sont requis' })
    }
    
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email invalide' })
    }
    
    if (!validator.isLength(password, { min: 6 })) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' })
    }

    // Vérifier si l'utilisateur existe
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Utilisateur déjà existant' })
    }

    // Créer l'utilisateur
    const user = new User({ email, password, name, phone, company })
    await user.save()

    // Générer le token
    const token = generateToken(user._id)

    res.status(201).json({ 
      success: true,
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      } 
    })
  } catch (error) {
    console.error('Erreur register:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

// Connexion
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' })
    }
    
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email invalide' })
    }

    // Trouver l'utilisateur
    const user = await User.findOne({ email, isActive: true })
    if (!user) {
      return res.status(400).json({ error: 'Identifiants invalides' })
    }

    // Vérifier le mot de passe
    const isValidPassword = await user.comparePassword(password)
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Identifiants invalides' })
    }

    // Mettre à jour la dernière connexion
    user.lastLogin = new Date()
    await user.save()

    // Générer le token
    const token = generateToken(user._id)

    res.json({ 
      success: true,
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      } 
    })
  } catch (error) {
    console.error('Erreur login:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

// Profil utilisateur
const getProfile = async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      phone: req.user.phone,
      company: req.user.company,
      createdAt: req.user.createdAt
    }
  })
}

// Modifier profil
const updateProfile = async (req, res) => {
  try {
    const { name, phone, company } = req.body
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, company },
      { new: true, runValidators: true }
    ).select('-password')
    
    res.json({ 
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        company: user.company
      }
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Changer mot de passe
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Mots de passe requis' })
    }

    if (!validator.isLength(newPassword, { min: 6 })) {
      return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir au moins 6 caractères' })
    }

    const user = await User.findById(req.user._id)
    const isValidPassword = await user.comparePassword(currentPassword)
    
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Mot de passe actuel incorrect' })
    }

    user.password = newPassword
    await user.save()

    res.json({ 
      success: true,
      message: 'Mot de passe modifié avec succès' 
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
}