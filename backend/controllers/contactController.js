const validator = require('validator')

// Envoyer un message de contact
const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Tous les champs sont requis' })
    }
    
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email invalide' })
    }
    
    if (!validator.isLength(name, { min: 2, max: 100 })) {
      return res.status(400).json({ error: 'Le nom doit contenir entre 2 et 100 caractères' })
    }
    
    if (!validator.isLength(message, { min: 10, max: 1000 })) {
      return res.status(400).json({ error: 'Le message doit contenir entre 10 et 1000 caractères' })
    }

    // Log du message (tu peux ajouter l'envoi d'email ou sauvegarde en DB ici)
    console.log('Nouveau message de contact:', { 
      name: validator.escape(name), 
      email: validator.normalizeEmail(email), 
      message: validator.escape(message),
      timestamp: new Date().toISOString()
    })
    
    res.json({ 
      success: true, 
      message: 'Message envoyé avec succès' 
    })
  } catch (error) {
    console.error('Erreur contact:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

module.exports = {
  sendMessage
}