const validator = require('validator')

// Middleware de validation pour l'inscription
const validateRegister = (req, res, next) => {
  const { email, password, name } = req.body
  const errors = []

  if (!name || !validator.isLength(name.trim(), { min: 2, max: 50 })) {
    errors.push('Le nom doit contenir entre 2 et 50 caractères')
  }

  if (!email || !validator.isEmail(email)) {
    errors.push('Email invalide')
  }

  if (!password || !validator.isLength(password, { min: 6, max: 128 })) {
    errors.push('Le mot de passe doit contenir entre 6 et 128 caractères')
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') })
  }

  next()
}

// Middleware de validation pour la connexion
const validateLogin = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email invalide' })
  }

  next()
}

// Middleware de validation pour les projets
const validateProject = (req, res, next) => {
  const { title, category } = req.body
  const errors = []

  if (!title || !validator.isLength(title.trim(), { min: 2, max: 100 })) {
    errors.push('Le titre doit contenir entre 2 et 100 caractères')
  }

  if (!category || !validator.isLength(category.trim(), { min: 2, max: 50 })) {
    errors.push('La catégorie doit contenir entre 2 et 50 caractères')
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') })
  }

  next()
}

// Middleware de validation pour le contact
const validateContact = (req, res, next) => {
  const { name, email, message } = req.body
  const errors = []

  if (!name || !validator.isLength(name.trim(), { min: 2, max: 50 })) {
    errors.push('Le nom doit contenir entre 2 et 50 caractères')
  }

  if (!email || !validator.isEmail(email)) {
    errors.push('Email invalide')
  }

  if (!message || !validator.isLength(message.trim(), { min: 10, max: 1000 })) {
    errors.push('Le message doit contenir entre 10 et 1000 caractères')
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') })
  }

  next()
}

// Sanitizer pour nettoyer les données
const sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = validator.escape(req.body[key].trim())
      }
    })
  }
  next()
}

module.exports = {
  validateRegister,
  validateLogin,
  validateProject,
  validateContact,
  sanitizeInput
}