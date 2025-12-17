// Configuration centralisée pour les URLs - HTTPS ONLY
const getBackendUrl = (): string => {
  // En production, toujours HTTPS
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    return 'https://designal-bah.onrender.com'
  }
  
  // Variables d'environnement avec fallback sécurisé
  return process.env.NEXT_PUBLIC_BACKEND_URL || 
         process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 
         'http://localhost:5001'
}

export const config = {
  // URL de base de l'API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
  
  // URL de base du backend (sans /api)
  backendUrl: getBackendUrl(),
  
  // Construction d'URL d'image complète - HTTPS ONLY
  getImageUrl: (imagePath: string): string => {
    if (!imagePath) return '/placeholder.jpg'
    if (imagePath.startsWith('http')) return imagePath
    
    // Force HTTPS en production
    const baseUrl = getBackendUrl()
    return `${baseUrl}${imagePath}`
  },
  
  // Vérification de l'environnement
  isProduction: process.env.NODE_ENV === 'production' || (typeof window !== 'undefined' && window.location.protocol === 'https:'),
  isDevelopment: process.env.NODE_ENV === 'development'
}