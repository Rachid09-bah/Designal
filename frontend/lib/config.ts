// Configuration centralisée pour les URLs
export const config = {
  // URL de base de l'API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
  
  // URL de base du backend (sans /api)
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5001',
  
  // Construction d'URL d'image complète
  getImageUrl: (imagePath: string): string => {
    if (!imagePath) return '/placeholder.jpg'
    if (imagePath.startsWith('http')) return imagePath
    
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5001'
    return `${baseUrl}${imagePath}`
  },
  
  // Vérification de l'environnement
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development'
}