// Configuration centralisée des catégories et sous-catégories
const CATEGORIES_CONFIG = {
  'Résidentiel': [
    'Chambre parentale',
    'Salon contemporain', 
    'Cuisine moderne',
    'Salle de bain',
    'Dressing sur mesure'
  ],
  'Studio': [
    'Studio photo',
    'Espace mannequinat',
    'Plateau influenceur',
    'Setup podcast',
    'Setup gaming'
  ],
  'Boutique': [
    'Prêt-à-porter',
    'Accessoires & maroquinerie',
    'Parfumerie',
    'Merchandising visuel'
  ],
  'Commercial': [
    'Parcours d\'exposition',
    'Éclairage muséal',
    'Scénographie',
    'Signalétique'
  ],
  'Bureau': [
    'Open space',
    'Salle de réunion',
    'Phone booth',
    'Espace détente'
  ],
  'Restaurant': [
    'Fast-food',
    'Café',
    'Lounge',
    'Comptoir & flux'
  ],
  'Autre': [
    'Comptoir & parcours client',
    'Rayonnage & vitrines',
    'Espace d\'attente',
    'Back-office'
  ]
}

// Validation des relations catégorie/sous-catégorie
const validateCategorySubcategory = (category, subcategory) => {
  if (!category) return { valid: false, error: 'Catégorie requise' }
  
  const allowedSubcategories = CATEGORIES_CONFIG[category]
  if (!allowedSubcategories) {
    return { valid: false, error: 'Catégorie invalide' }
  }
  
  if (subcategory && !allowedSubcategories.includes(subcategory)) {
    return { valid: false, error: 'Sous-catégorie invalide pour cette catégorie' }
  }
  
  return { valid: true }
}

// Obtenir les sous-catégories d'une catégorie
const getSubcategories = (category) => {
  return CATEGORIES_CONFIG[category] || []
}

// Obtenir toutes les catégories
const getAllCategories = () => {
  return Object.keys(CATEGORIES_CONFIG)
}

module.exports = {
  CATEGORIES_CONFIG,
  validateCategorySubcategory,
  getSubcategories,
  getAllCategories
}