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

// Routes admin
router.get('/admin/all', auth, adminAuth, getAllProjects)
router.post('/', auth, adminAuth, createProject)
router.put('/:id', auth, adminAuth, updateProject)
router.delete('/:id', auth, adminAuth, deleteProject)
router.patch('/:id/status', auth, adminAuth, updateStatus)

module.exports = router