const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Middleware d'authentification
const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token manquant ou format invalide' })
    }

    const token = authHeader.replace('Bearer ', '')
    
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET non défini')
      return res.status(500).json({ error: 'Erreur de configuration serveur' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).select('-password')
    
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Utilisateur non autorisé' })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token invalide' })
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expiré' })
    }
    console.error('Erreur auth:', error)
    res.status(500).json({ error: 'Erreur d\'authentification' })
  }
}

// Middleware admin uniquement
const adminAuth = async (req, res, next) => {
  auth(req, res, (error) => {
    if (error) {
      return next(error)
    }
    
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Accès administrateur requis' })
    }
    
    next()
  })
}

module.exports = { auth, adminAuth }