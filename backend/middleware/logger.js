// Middleware de logging des requêtes
const requestLogger = (req, res, next) => {
  const start = Date.now()
  
  // Log de la requête entrante
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`)
  
  // Intercepter la réponse pour logger le temps de traitement
  const originalSend = res.send
  res.send = function(data) {
    const duration = Date.now() - start
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`)
    originalSend.call(this, data)
  }
  
  next()
}

// Logger pour les erreurs d'authentification
const authLogger = (req, res, next) => {
  const originalJson = res.json
  res.json = function(data) {
    if (res.statusCode === 401 || res.statusCode === 403) {
      console.warn(`[AUTH] Tentative d'accès non autorisée - IP: ${req.ip} - Route: ${req.originalUrl}`)
    }
    originalJson.call(this, data)
  }
  next()
}

module.exports = { requestLogger, authLogger }