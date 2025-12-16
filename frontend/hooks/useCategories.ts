import { useState, useEffect } from 'react'
import { categoriesAPI } from '@/lib/api'

interface Category {
  value: string
  subcategories: string[]
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await categoriesAPI.getAll()
        setCategories(data.categories)
      } catch (err: any) {
        setError(err?.response?.data?.error || 'Erreur lors du chargement des catégories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const getSubcategories = (category: string): string[] => {
    const cat = categories.find(c => c.value === category)
    return cat?.subcategories || []
  }

  const validateCategorySubcategory = (category: string, subcategory?: string): boolean => {
    if (!category) return false
    const allowedSubcategories = getSubcategories(category)
    if (subcategory && !allowedSubcategories.includes(subcategory)) return false
    return true
  }

  return {
    categories,
    loading,
    error,
    getSubcategories,
    validateCategorySubcategory
  }
}