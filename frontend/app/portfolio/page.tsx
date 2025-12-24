"use client"

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ImageLoader } from '@/components/ImageLoader'
import { ImageGalleryModal } from '@/components/ImageGalleryModal'
import { Badge } from '@/components/ui/badge'

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [galleryModal, setGalleryModal] = useState({
    isOpen: false,
    currentImage: { url: '', alt: '', title: '', category: '' },
    allImages: [] as Array<{ url: string, alt: string, title: string, category: string }>
  })

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
        if (response.ok) {
          const data = await response.json()
          const projectsData = data.projects || []
          setProjects(projectsData)
          
          const allImages = projectsData.map((project: any) => ({
            url: project.images?.[0]?.url || '',
            alt: project.images?.[0]?.alt || project.title,
            title: project.title,
            category: project.category
          })).filter((img: any) => img.url)
          
          setGalleryModal(prev => ({ ...prev, allImages }))
        }
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProjects()
  }, [])

  const categories = ['Tous', ...Array.from(new Set(projects.map(p => p.category)))]
  const filteredProjects = selectedCategory === 'Tous' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Notre Portfolio</h1>
            <p className="text-gray-300 text-xl">Découvrez nos réalisations exceptionnelles</p>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grille de projets */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-gray-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-900 cursor-pointer hover:-translate-y-2 transition-all duration-300"
                  onClick={() => {
                    const currentImage = {
                      url: project.images?.[0]?.url || '',
                      alt: project.images?.[0]?.alt || project.title,
                      title: project.title,
                      category: project.category
                    }
                    setGalleryModal({
                      isOpen: true,
                      currentImage,
                      allImages: galleryModal.allImages
                    })
                  }}
                >
                  <ImageLoader
                    src={project.images?.[0]?.url || ''}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="flex gap-2">
                      <Badge className="bg-white/20 text-white">{project.category}</Badge>
                      {project.subcategory && (
                        <Badge variant="outline" className="border-white/30 text-white">{project.subcategory}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">Aucun projet trouvé pour cette catégorie</p>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <ImageGalleryModal
        isOpen={galleryModal.isOpen}
        onClose={() => setGalleryModal(prev => ({ ...prev, isOpen: false }))}
        currentImage={galleryModal.currentImage}
        allImages={galleryModal.allImages}
      />
    </div>
  )
}