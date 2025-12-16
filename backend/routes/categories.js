const express = require('express')
const { getAllCategories, getSubcategories, CATEGORIES_CONFIG } = require('../config/categories')
const router = express.Router()

// GET /api/categories - Récupérer toutes les catégories
router.get('/', (req, res) => {
  try {
    const categories = getAllCategories().map(category => ({
      value: category,
      subcategories: getSubcategories(category)
    }))
    
    res.json({
      success: true,
      categories
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/categories/:category/subcategories - Récupérer les sous-catégories d'une catégorie
router.get('/:category/subcategories', (req, res) => {
  try {
    const { category } = req.params
    const subcategories = getSubcategories(category)
    
    if (subcategories.length === 0) {
      return res.status(404).json({ error: 'Catégorie non trouvée' })
    }
    
    res.json({
      success: true,
      category,
      subcategories
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router