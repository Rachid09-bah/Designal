const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.set('trust proxy', 1)

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || 
        origin.includes('vercel.app') || 
        origin.includes('localhost') ||
        origin === process.env.FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(null, true)
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Cross-Origin-Resource-Policy', 'cross-origin')
  next()
}, express.static(uploadsDir, {
  maxAge: '1d',
  etag: false
}))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/upload', require('./routes/upload-cloudinary'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/categories', require('./routes/categories'))

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Backend DESIGNAL opérationnel',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    version: '2.2.0'
  })
})

app.post('/api/fix-urls', async (req, res) => {
  try {
    const Project = require('./models/Project')
    
    const projects = await Project.find({
      'images.url': { $regex: 'localhost' }
    })

    let fixed = 0
    for (const project of projects) {
      let updated = false
      
      project.images = project.images.map(image => {
        if (image.url && image.url.includes('localhost:5001')) {
          image.url = image.url.replace('http://localhost:5001', 'https://designal-bah.onrender.com')
          updated = true
          return image
        }
        return image
      })

      if (project.model3D && project.model3D.url && project.model3D.url.includes('localhost:5001')) {
        project.model3D.url = project.model3D.url.replace('http://localhost:5001', 'https://designal-bah.onrender.com')
        updated = true
      }

      if (updated) {
        await project.save()
        fixed++
      }
    }

    res.json({ 
      success: true, 
      message: `${fixed} projets corrigés`,
      total: projects.length 
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/', (req, res) => {
  res.json({ 
    message: 'API DESIGNAL',
    status: 'running',
    version: '2.2.0'
  })
})

app.use((err, req, res, next) => {
  console.error('Erreur:', err.message)
  res.status(500).json({ 
    error: 'Erreur serveur',
    message: err.message
  })
})

app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint non trouvé',
    path: req.originalUrl
  })
})

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ MongoDB connecté')
    })
    .catch(err => {
      console.error('❌ Erreur MongoDB:', err.message)
      process.exit(1)
    })
} else {
  console.error('❌ MONGODB_URI manquant')
  process.exit(1)
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur démarré sur port ${PORT}`)
})