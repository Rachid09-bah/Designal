const mongoose = require('mongoose')

const fieldProjectSchema = new mongoose.Schema({
  // Informations de base
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  
  // Localisation et timing
  location: {
    address: String,
    city: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  dateRealized: {
    type: Date,
    required: true,
    default: Date.now
  },
  
  // Catégorisation
  category: {
    type: String,
    required: true,
    enum: ['Résidentiel', 'Commercial', 'Industriel', 'Rénovation', 'Installation', 'Maintenance']
  },
  subcategory: String,
  tags: [String],
  
  // Images (Cloudinary URLs)
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String, // ID Cloudinary pour suppression
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  
  // Informations client (optionnel)
  client: {
    name: String,
    type: {
      type: String,
      enum: ['Particulier', 'Entreprise', 'Collectivité']
    }
  },
  
  // Métadonnées
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  featured: {
    type: Boolean,
    default: false
  },
  
  // Audit
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Index pour recherche et performance
fieldProjectSchema.index({ category: 1, status: 1 })
fieldProjectSchema.index({ dateRealized: -1 })
fieldProjectSchema.index({ featured: -1, createdAt: -1 })

// Middleware pour mettre à jour updatedAt
fieldProjectSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

module.exports = mongoose.model('FieldProject', fieldProjectSchema)