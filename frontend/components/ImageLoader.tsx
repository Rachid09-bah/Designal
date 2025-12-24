"use client"

import Image from 'next/image'
import { useState } from 'react'
import { config } from '@/lib/config'

interface ImageLoaderProps {
  src?: string | null
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  quality?: number
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

export function ImageLoader({ src, alt, width = 400, height = 300, className = "", fill, ...props }: ImageLoaderProps) {
  const [error, setError] = useState(false)
  
  // Vérification sécurisée de l'URL
  const imageUrl = src ? config.getImageUrl(src) : '/placeholder.jpg'

  if (error || !src) {
    if (fill) {
      return (
        <div className={`bg-gray-800 flex items-center justify-center absolute inset-0 ${className}`}>
          <span className="text-gray-400 text-sm">Image non disponible</span>
        </div>
      )
    }
    return (
      <div className={`bg-gray-800 flex items-center justify-center ${className}`} style={{ width, height }}>
        <span className="text-gray-400 text-sm">Image non disponible</span>
      </div>
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={alt || 'Image'}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  )
}