const express = require('express')
const Project = require('../models/Project')
const { auth, adminAuth } = require('../middleware/auth')
const { validateCategorySubcategory } = require('../config/categories')
const router = express.Router()

// GET /api/projects - Récupérer tous les projets publiés
router.get('/', async (req, res) => {
  try {
    const { category, subcategory, style, featured } = req.query
    
    let filter = { status: 'published' }
    if (category) filter.category = category
    if (subcategory) filter.subcategory = subcategory
    if (style) filter.style = style
    if (featured) filter.featured = featured === 'true'
    
    const projects = await Project.find(filter)
      .sort({ featured: -1, createdAt: -1 })
    
    res.json({ projects })
  } catch (error) {
    console.error('Erreur GET projets:', error)
    res.status(500).json({ error: 'Erreur serveur: ' + error.message })
  }
})

// GET /api/projects/subcategory/:subcategory - Projets par sous-catégorie
router.get('/subcategory/:subcategory', async (req, res) => {
  try {
    const { subcategory } = req.params
    
    const projects = await Project.find({ 
      subcategory: decodeURIComponent(subcategory),
      status: 'published' 
    }).sort({ featured: -1, createdAt: -1 })
    
    res.json({ 
      subcategory: decodeURIComponent(subcategory),
      projects 
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/projects/:id - Récupérer un projet par ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    
    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' })
    }
    
    res.json({ project })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// === ROUTES ADMIN ===

// GET /api/projects/admin/all - Tous les projets (admin)
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json({ projects })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/projects - Créer un projet (admin)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { category, subcategory } = req.body
    
    // Validation des relations catégorie/sous-catégorie
    const validation = validateCategorySubcategory(category, subcategory)
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error })
    }
    
    const project = new Project(req.body)
    await project.save()
    
    res.status(201).json({ 
      message: 'Projet créé avec succès',
      project 
    })
  } catch (error) {
    console.error('Erreur création projet:', error)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message)
      return res.status(400).json({ error: messages.join(', ') })
    }
    res.status(400).json({ error: 'Erreur création: ' + error.message })
  }
})

// PUT /api/projects/:id - Modifier un projet (admin)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' })
    }
    
    res.json({ 
      message: 'Projet modifié avec succès',
      project 
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// DELETE /api/projects/:id - Supprimer un projet (admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    
    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' })
    }
    
    res.json({ message: 'Projet supprimé avec succès' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /api/projects/:id/toggle-featured - Basculer le statut featured (admin)
router.put('/:id/toggle-featured', adminAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    
    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' })
    }
    
    project.featured = !project.featured
    await project.save()
    
    res.json({ 
      message: `Projet ${project.featured ? 'mis en avant' : 'retiré de la mise en avant'}`,
      project 
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /api/projects/:id/status - Changer le statut (admin)
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body
    
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
    
    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' })
    }
    
    res.json({ 
      message: `Statut changé vers ${status}`,
      project 
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router