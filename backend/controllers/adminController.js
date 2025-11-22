const User = require('../models/User')
const Project = require('../models/Project')

// Dashboard statistiques
const getDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProjects,
      publishedProjects,
      featuredProjects,
      recentUsers,
      recentProjects
    ] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Project.countDocuments({ status: 'published' }),
      Project.countDocuments({ featured: true }),
      User.find().sort({ createdAt: -1 }).limit(5).select('-password'),
      Project.find().sort({ createdAt: -1 }).limit(5)
    ])

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProjects,
        publishedProjects,
        featuredProjects
      },
      recentUsers,
      recentProjects
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Gestion des utilisateurs
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, role } = req.query
    
    let filter = {}
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }
    if (role) {
      filter.role = role
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await User.countDocuments(filter)

    res.json({
      success: true,
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Modifier utilisateur
const updateUser = async (req, res) => {
  try {
    const { name, email, role, isActive } = req.body
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, isActive },
      { new: true, runValidators: true }
    ).select('-password')
    
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }
    
    res.json({ 
      success: true,
      user 
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Supprimer utilisateur
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }
    
    res.json({ 
      success: true,
      message: 'Utilisateur supprimé' 
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Créer un admin
const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisé' })
    }

    const admin = new User({
      name,
      email,
      password,
      role: 'admin'
    })

    await admin.save()

    res.status(201).json({
      success: true,
      message: 'Administrateur créé avec succès',
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getDashboard,
  getUsers,
  updateUser,
  deleteUser,
  createAdmin
}