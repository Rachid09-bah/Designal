"use client"

import { useState, useEffect } from 'react'
import { ImageLoader } from './ImageLoader'
import { Button } from './ui/button'

interface ImageGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  currentImage: {
    url: string
    alt: string
    title: string
    category: string
  }
  allImages: Array<{
    url: string
    alt: string
    title: string
    category: string
  }>
}

export function ImageGalleryModal({ isOpen, onClose, currentImage, allImages }: ImageGalleryModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  // Filtrer les images de la même catégorie
  const categoryImages = allImages.filter(img => img.category === currentImage.category)
  
  useEffect(() => {
    if (isOpen) {
      const index = categoryImages.findIndex(img => img.url === currentImage.url)
      setSelectedIndex(index >= 0 ? index : 0)
    }
  }, [isOpen, currentImage, categoryImages])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex])

  const goToNext = () => {
    setSelectedIndex((prev) => (prev + 1) % categoryImages.length)
  }

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev - 1 + categoryImages.length) % categoryImages.length)
  }

  if (!isOpen) return null

  const selectedImage = categoryImages[selectedIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Bouton fermer */}
      <Button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white border-none rounded-full w-10 h-10 p-0"
      >
        ✕
      </Button>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 h-full max-h-[90vh]">
        {/* Image principale */}
        <div className="lg:col-span-3 flex items-center justify-center">
          <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
            <ImageLoader
              src={selectedImage?.url}
              alt={selectedImage?.alt || ''}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              width={800}
              height={600}
            />
            
            {/* Navigation */}
            {categoryImages.length > 1 && (
              <>
                <Button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-none rounded-full w-12 h-12 p-0"
                >
                  ←
                </Button>
                <Button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-none rounded-full w-12 h-12 p-0"
                >
                  →
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Sidebar avec miniatures */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2">{selectedImage?.title}</h3>
            <p className="text-gray-300 text-sm">{selectedImage?.category}</p>
            <p className="text-gray-400 text-xs mt-2">{selectedIndex + 1} / {categoryImages.length}</p>
          </div>

          {/* Miniatures */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {categoryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                    index === selectedIndex 
                      ? 'ring-2 ring-white scale-105' 
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageLoader
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    width={150}
                    height={150}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}