/**
 * Utilitaire pour construire les URLs d'images correctement
 * Gère automatiquement DEV vs PROD
 */

export function getImageUrl(imagePath: string): string {
  if (!imagePath) return ''
  
  // Forcer le remplacement des URLs localhost
  if (imagePath.includes('localhost:5001')) {
    return imagePath.replace('http://localhost:5001', 'https://designal-bah.onrender.com')
  }
  
  // Si l'URL est déjà complète et correcte, la retourner
  if (imagePath.startsWith('https://designal-bah.onrender.com')) {
    return imagePath
  }
  
  // Construire l'URL avec la base de production
  const baseUrl = 'https://designal-bah.onrender.com'
  
  // S'assurer que le chemin commence par /
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
  
  return `${baseUrl}${cleanPath}`
}

export function isValidImageUrl(url: string): boolean {
  return url && (url.startsWith('http') || url.startsWith('/uploads'))
}