const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// CORS simple
app.use(cors())

// Body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/upload', require('./routes/upload'))

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend DESIGNAL fonctionne!' })
})

// MongoDB
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connecté à MongoDB'))
    .catch(err => console.error('❌ Erreur MongoDB:', err))
} else {
  console.log('⚠️ MONGODB_URI non défini')
}

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`)
})