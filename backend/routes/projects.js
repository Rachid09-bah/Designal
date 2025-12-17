const express = require('express')
const router = express.Router()
const { auth, adminAuth } = require('../middleware/auth')
const {
  getPublicProjects,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  updateStatus
} = require('../controllers/projectController')

// Routes publiques
router.get('/', getPublicProjects)
router.get('/:id', async (req, res) => {
  try {
    const project = await require('../models/Project').findById(req.params.id)
    if (!project) return res.status(404).json({ error: 'Projet non trouvé' })
    res.json({ success: true, project })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/subcategory/:subcategory', async (req, res) => {
  try {
    const projects = await require('../models/Project').find({ 
      subcategory: decodeURIComponent(req.params.subcategory),
      status: 'published' 
    })
    res.json({ success: true, projects })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Routes admin
router.get('/admin/all', auth, adminAuth, getAllProjects)
router.post('/', auth, adminAuth, createProject)
router.put('/:id', auth, adminAuth, updateProject)
router.put('/:id/status', auth, adminAuth, updateStatus)
router.put('/:id/toggle-featured', auth, adminAuth, async (req, res) => {
  try {
    const project = await require('../models/Project').findById(req.params.id)
    if (!project) return res.status(404).json({ error: 'Projet non trouvé' })
    project.featured = !project.featured
    await project.save()
    res.json({ success: true, project })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
router.delete('/:id', auth, adminAuth, deleteProject)
router.patch('/:id/status', auth, adminAuth, updateStatus)

module.exports = router