/**
 * Utilitaire pour construire les URLs d'images correctement
 * Gère automatiquement DEV vs PROD
 */

export function getImageUrl(imagePath: string): string {
  if (!imagePath) return ''
  
  // Si l'URL est déjà complète, la retourner telle quelle
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  // Construire l'URL avec la base correcte selon l'environnement
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
  
  // S'assurer que le chemin commence par /
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
  
  return `${baseUrl}${cleanPath}`
}

export function isValidImageUrl(url: string): boolean {
  return url && (url.startsWith('http') || url.startsWith('/uploads'))
}