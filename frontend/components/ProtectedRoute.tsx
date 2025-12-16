"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI } from '@/lib/api'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        router.push('/auth/login')
        return
      }

      try {
        const { data } = await authAPI.getProfile()
        if (!data?.success) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          router.push('/auth/login')
          return
        }
        if (requireAdmin && data.user.role !== 'admin') {
          router.push('/auth/login')
          return
        }
        setIsAuthorized(true)
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/auth/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, requireAdmin])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Vérification...</div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}