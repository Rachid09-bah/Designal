export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001',
  
  // Fonction pour construire l'URL complète des images
  getImageUrl: (imagePath: string) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
    return `${baseUrl}${imagePath}`
  }
}