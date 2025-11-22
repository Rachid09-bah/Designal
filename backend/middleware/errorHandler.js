// Middleware de gestion d'erreurs globales
const errorHandler = (err, req, res, next) => {
  console.error('Erreur:', err)

  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({
      error: 'Erreur de validation',
      details: errors
    })
  }

  // Erreur de duplication MongoDB
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(400).json({
      error: `${field} déjà existant`
    })
  }

  // Erreur JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Token invalide'
    })
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expiré'
    })
  }

  // Erreur de cast MongoDB
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'ID invalide'
    })
  }

  // Erreur par défaut
  res.status(err.status || 500).json({
    error: err.message || 'Erreur serveur interne'
  })
}

// Middleware pour les routes non trouvées
const notFound = (req, res, next) => {
  const error = new Error(`Route non trouvée - ${req.originalUrl}`)
  error.status = 404
  next(error)
}

module.exports = { errorHandler, notFound }