export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001',
  
  // Fonction pour construire l'URL complète des images - Support Cloudinary
  getImageUrl: (imagePath: string) => {
    if (!imagePath) return '/placeholder.jpg'
    
    // Si c'est déjà une URL Cloudinary complète
    if (imagePath.startsWith('https://res.cloudinary.com')) return imagePath
    
    // Si c'est une URL HTTP complète
    if (imagePath.startsWith('http')) return imagePath
    
    // Pour les anciennes URLs relatives
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
    return `${baseUrl}${imagePath}`
  }
}