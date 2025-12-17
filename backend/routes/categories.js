const express = require('express')
const router = express.Router()

const categoriesData = [
  {
    value: "Appartement / Maison",
    subcategories: ["Chambre parentale", "Salon contemporain", "Cuisine moderne", "Salle de bain", "Dressing sur mesure"]
  },
  {
    value: "Studio créatif", 
    subcategories: ["Studio photo", "Espace mannequinat", "Plateau influenceur", "Setup podcast", "Setup gaming"]
  },
  {
    value: "Boutique",
    subcategories: ["Prêt-à-porter", "Accessoires & maroquinerie", "Parfumerie", "Merchandising visuel"]
  },
  {
    value: "Galerie d'art / Exposition",
    subcategories: ["Parcours d'exposition", "Éclairage muséal", "Scénographie", "Signalétique"]
  },
  {
    value: "Bureau créatif / Coworking",
    subcategories: ["Open space", "Salle de réunion", "Phone booth", "Espace détente"]
  },
  {
    value: "Restaurant & Café",
    subcategories: ["Fast-food", "Café", "Lounge", "Comptoir & flux"]
  },
  {
    value: "Pharmacie & Agence",
    subcategories: ["Comptoir & parcours client", "Rayonnage & vitrines", "Espace d'attente", "Back-office"]
  }
]

// GET /api/categories
router.get('/', (req, res) => {
  res.json({
    success: true,
    categories: categoriesData
  })
})

module.exports = router