const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Trust proxy pour Render
app.set('trust proxy', 1)

// CORS optimisé pour production
app.use(cors({
  origin: [
    'https://v0-designal-landing-page.vercel.app',
    'https://designal.vercel.app',
    'http://localhost:3000',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Body parsing
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Créer dossier uploads si inexistant
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Static files avec headers CORS
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Cross-Origin-Resource-Policy', 'cross-origin')
  next()
}, express.static(uploadsDir, {
  maxAge: '1d',
  etag: false
}))

// Routes API
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/upload', require('./routes/upload'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/categories', require('./routes/categories'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Backend DESIGNAL opérationnel',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development'
  })
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'API DESIGNAL',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      projects: '/api/projects',
      uploads: '/uploads'
    }
  })
})

// Error handling
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err.message)
  res.status(500).json({ 
    error: 'Erreur interne du serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint non trouvé',
    path: req.originalUrl,
    method: req.method
  })
})

// MongoDB connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ MongoDB connecté:', mongoose.connection.name)
    })
    .catch(err => {
      console.error('❌ Erreur MongoDB:', err.message)
      process.exit(1)
    })
} else {
  console.error('❌ MONGODB_URI manquant')
  process.exit(1)
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 Arrêt du serveur...')
  mongoose.connection.close()
  process.exit(0)
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur DESIGNAL démarré sur port ${PORT}`)
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`)
})