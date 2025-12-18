const express = require('express')
const router = express.Router()
const FieldProject = require('../models/FieldProject')
const { auth, adminAuth } = require('../middleware/auth')
const { upload, deleteImage } = require('../config/cloudinary')

// GET /api/field-projects - Liste publique des projets
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      featured, 
      limit = 12, 
      page = 1,
      sort = '-dateRealized'
    } = req.query

    const filter = { status: 'published' }
    
    if (category) filter.category = category
    if (featured === 'true') filter.featured = true

    const projects = await FieldProject.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('createdBy', 'name')
      .lean()

    const total = await FieldProject.countDocuments(filter)

    res.json({
      success: true,
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/field-projects/:id - Détail d'un projet
router.get('/:id', async (req, res) => {
  try {
    const project = await FieldProject.findById(req.params.id)
      .populate('createdBy', 'name')

    if (!project || project.status !== 'published') {
      return res.status(404).json({ error: 'Projet non trouvé' })
    }

    res.json({ success: true, project })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/field-projects - Créer un nouveau projet (Admin)
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      subcategory,
      location,
      dateRealized,
      client,
      tags,
      status = 'published'
    } = req.body

    // Validation
    if (!title || !description || !category) {
      return res.status(400).json({ 
        error: 'Titre, description et catégorie sont obligatoires' 
      })
    }

    // Traiter les images uploadées
    const images = req.files.map((file, index) => ({
      url: file.path,
      publicId: file.filename,
      caption: req.body[`caption_${index}`] || '',
      isPrimary: index === 0 // Première image = principale
    }))

    // Créer le projet
    const project = new FieldProject({
      title,
      description,
      category,
      subcategory,
      location: location ? JSON.parse(location) : undefined,
      dateRealized: dateRealized || new Date(),
      client: client ? JSON.parse(client) : undefined,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      images,
      status,
      createdBy: req.user.id
    })

    await project.save()

    res.status(201).json({
      success: true,
      message: 'Projet créé avec succès',
      project
    })
  } catch (error) {
    // Nettoyer les images en cas d'erreur
    if (req.files) {
      for (const file of req.files) {
        await deleteImage(file.filename).catch(console.error)
      }
    }
    res.status(500).json({ error: error.message })
  }
})

// PUT /api/field-projects/:id - Modifier un projet (Admin)
router.put('/:id', auth, upload.array('newImages', 5), async (req, res) => {
  try {
    const project = await FieldProject.findById(req.params.id)
    
    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' })
    }

    // Mise à jour des champs
    const updates = ['title', 'description', 'category', 'subcategory', 'status', 'featured']
    updates.forEach(field => {
      if (req.body[field] !== undefined) {
        project[field] = req.body[field]
      }
    })

    // Ajouter nouvelles images si présentes
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        url: file.path,
        publicId: file.filename,
        caption: '',
        isPrimary: false
      }))
      project.images.push(...newImages)
    }

    await project.save()

    res.json({
      success: true,
      message: 'Projet mis à jour',
      project
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE /api/field-projects/:id - Supprimer un projet (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await FieldProject.findById(req.params.id)
    
    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' })
    }

    // Supprimer les images de Cloudinary
    for (const image of project.images) {
      if (image.publicId) {
        await deleteImage(image.publicId).catch(console.error)
      }
    }

    await FieldProject.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: 'Projet supprimé avec succès'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/field-projects/admin/all - Liste admin (tous statuts)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const projects = await FieldProject.find()
      .sort('-createdAt')
      .populate('createdBy', 'name')

    res.json({ success: true, projects })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router