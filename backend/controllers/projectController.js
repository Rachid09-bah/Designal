const Project = require('../models/Project')

// GET /api/projects - Liste publique des projets
exports.getPublicProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: 'published' })
      .sort({ createdAt: -1 })
      .select('-createdBy')
    
    res.json({
      success: true,
      projects
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/projects/admin/all - Liste admin de tous les projets
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email')
    
    res.json({
      success: true,
      projects
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /api/projects - Créer un projet
exports.createProject = async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      createdBy: req.user.id
    }
    
    const project = new Project(projectData)
    await project.save()
    
    res.status(201).json({
      success: true,
      project
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// PUT /api/projects/:id - Modifier un projet
exports.updateProject = async (req, res) => {
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
      success: true,
      project
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// DELETE /api/projects/:id - Supprimer un projet
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    
    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' })
    }
    
    res.json({
      success: true,
      message: 'Projet supprimé'
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// PATCH /api/projects/:id/status - Changer le statut
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body
    
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    
    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' })
    }
    
    res.json({
      success: true,
      project
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}