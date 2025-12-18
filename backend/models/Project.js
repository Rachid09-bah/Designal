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
    required: true
  },
  subcategory: {
    type: String
  },
  style: {
    type: String
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  client: {
    type: String
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean
  }],
  model3D: {
    url: String,
    format: String, // glb, gltf, obj, etc.
    size: Number
  },
  projectType: {
    type: String,
    enum: ['2D', '3D', 'mixed'],
    default: '2D'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Project', projectSchema)