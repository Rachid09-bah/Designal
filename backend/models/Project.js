const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Résidentiel', 'Commercial', 'Studio', 'Boutique', 'Restaurant', 'Bureau', 'Autre']
  },
  subcategory: {
    type: String,
    required: false
  },
  style: {
    type: String,
    enum: ['Moderne', 'Casual', 'Tradi-moderne', 'Artistique', 'Gaming & Tech', 'Hypebeast & Streetwear', 'Autre']
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: { type: Boolean, default: false }
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  client: String,
  tags: [String]
}, {
  timestamps: true
})

module.exports = mongoose.model('Project', projectSchema)