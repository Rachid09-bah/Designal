const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: 'Email invalide'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true,
    maxlength: 100
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date
  }
}, {
  timestamps: true
})

// Hash password avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// Vérifier si le compte est verrouillé
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

// Incrémenter les tentatives de connexion
userSchema.methods.incLoginAttempts = function() {
  // Si nous avons une date de verrouillage précédente et qu'elle est expirée, redémarrer à 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    })
  }
  
  const updates = { $inc: { loginAttempts: 1 } }
  
  // Si nous atteignons le maximum de tentatives et qu'il n'y a pas de verrouillage, verrouiller le compte
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 } // 2 heures
  }
  
  return this.updateOne(updates)
}

// Réinitialiser les tentatives de connexion
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  })
}

module.exports = mongoose.model('User', userSchema)