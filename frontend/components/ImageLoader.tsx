"use client"

import Image from 'next/image'
import { useState } from 'react'

interface ImageLoaderProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function ImageLoader({ src, alt, width = 400, height = 300, className = "" }: ImageLoaderProps) {
  const [error, setError] = useState(false)
  
  // Construire l'URL complète
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
    return `${baseUrl}${imagePath}`
  }

  const imageUrl = getImageUrl(src)

  if (error || !imageUrl) {
    return (
      <div className={`bg-gray-800 flex items-center justify-center ${className}`} style={{ width, height }}>
        <span className="text-gray-400 text-sm">Image non disponible</span>
      </div>
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
      unoptimized
    />
  )
}