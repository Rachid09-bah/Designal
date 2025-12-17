"use client"

import Image from 'next/image'
import { config } from '@/lib/config'
import { useState } from 'react'

interface ImageLoaderProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  quality?: number
  loading?: 'lazy' | 'eager'
  priority?: boolean
  width?: number
  height?: number
}

export function ImageLoader({ src, alt, ...props }: ImageLoaderProps) {
  const [error, setError] = useState(false)
  
  // Construction sécurisée de l'URL
  const imageUrl = config.getImageUrl(src)
  
  return (
    <Image
      src={error ? '/placeholder.jpg' : imageUrl}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  )
}