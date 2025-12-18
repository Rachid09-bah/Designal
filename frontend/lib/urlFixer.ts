/**
 * SOLUTION DÉFINITIVE - Force le remplacement des URLs localhost
 */

export function forceHttpsUrl(url: string): string {
  if (!url) return ''
  
  // FORCER le remplacement de TOUTES les URLs localhost
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    return url
      .replace('http://localhost:5001', 'https://designal-bah.onrender.com')
      .replace('https://localhost:5001', 'https://designal-bah.onrender.com')
      .replace('http://127.0.0.1:5001', 'https://designal-bah.onrender.com')
  }
  
  // Si déjà HTTPS correct, retourner tel quel
  if (url.startsWith('https://designal-bah.onrender.com')) {
    return url
  }
  
  // Si chemin relatif, construire URL complète
  if (url.startsWith('/uploads/')) {
    return `https://designal-bah.onrender.com${url}`
  }
  
  return url
}

export function fixProjectImages(project: any) {
  if (!project) return project
  
  return {
    ...project,
    images: project.images?.map((img: any) => ({
      ...img,
      url: forceHttpsUrl(img.url)
    })) || [],
    model3D: project.model3D ? {
      ...project.model3D,
      url: forceHttpsUrl(project.model3D.url)
    } : undefined
  }
}