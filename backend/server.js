const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

// Rate limiting désactivé pour le développement
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: 'Trop de requêtes, réessayez plus tard'
// })
// app.use('/api/', limiter)

// CORS configuration - Permissif pour production
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:3000', 'https://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Authorization']
}))

// Body parsing with size limits
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Data sanitization
app.use(mongoSanitize())
app.use(hpp())

// Logging simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/categories', require('./routes/categories'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/upload', require('./routes/upload'))

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Backend DESIGNAL fonctionne!',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Gestion d'erreurs simple
app.use((err, req, res, next) => {
  console.error('Erreur:', err)
  res.status(500).json({ error: 'Erreur serveur' })
})

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route non trouvée' })
})

// Configuration MongoDB avec options de sécurité
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferCommands: false
  })
    .then(async () => {
      console.log('✅ Connecté à MongoDB')
      console.log(`📊 Base de données: ${mongoose.connection.name}`)
      
      // Initialiser admin si nécessaire
      try {
        const initAdmin = require('./scripts/init-admin')
        await initAdmin()
      } catch (error) {
        console.log('⚠️ Init admin:', error.message)
      }
    })
    .catch(err => {
      console.error('❌ Erreur MongoDB:', err)
      process.exit(1)
    })

  // Gestion des événements de connexion
  mongoose.connection.on('error', err => {
    console.error('❌ Erreur MongoDB:', err)
  })

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB déconnecté - tentative de reconnexion...')
    setTimeout(() => {
      mongoose.connect(process.env.MONGODB_URI)
    }, 5000)
  })

  mongoose.connection.on('reconnected', () => {
    console.log('🔄 MongoDB reconnecté')
  })
} else {
  console.log('⚠️ MONGODB_URI non défini - base de données désactivée')
}

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`)
})