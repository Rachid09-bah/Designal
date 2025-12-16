"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { projectsAPI } from "@/lib/api"
import { ArrowLeft, Eye } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SubcategoryProjectsPage() {
  const params = useParams()
  const subcategory = decodeURIComponent(params.subcategory as string)
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getBySubcategory(subcategory)
        setProjects(response.data.projects || [])
      } catch (error) {
        console.error("Erreur lors du chargement des projets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [subcategory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#022B31]/20 to-transparent" />
        <div className="container mx-auto px-4 py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              href="/#services" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Retour aux services
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              {subcategory}
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-[#022B31] to-[#0A4950] mx-auto" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos créations d'exception en <span className="text-white font-medium">{subcategory.toLowerCase()}</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-24">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-[#022B31] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Chargement des projets...</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {projects.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Aucun projet disponible</h3>
                  <p className="text-gray-400">Nos créations pour cette catégorie arrivent bientôt !</p>
                </div>
              </div>
            ) : (
              projects.map((project: any, index) => (
                <motion.div 
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl hover:shadow-2xl hover:shadow-[#022B31]/20 transition-all duration-500 hover:-translate-y-2"
                >
                  <img
                    src={project.images?.[0]?.url?.startsWith('/uploads') 
                      ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5001'}${project.images[0].url}` 
                      : project.images?.[0]?.url || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.currentTarget.src = '/placeholder.svg' }}
                  />
                  
                  {/* Overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#022B31]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Project number */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-sm font-bold border border-white/30 group-hover:bg-[#022B31] group-hover:border-[#022B31] transition-all duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-[#022B31] to-[#0A4950] rounded-full text-white text-xs font-semibold shadow-lg">
                      ⭐ Vedette
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="space-y-2">
                      <h3 className="font-bold text-xl mb-2 group-hover:text-[#022B31] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex items-center gap-2 pt-2">
                        {project.style && (
                          <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-gray-300 border border-white/30">
                            {project.style}
                          </span>
                        )}
                        {project.category && (
                          <span className="px-2 py-1 bg-[#022B31]/30 backdrop-blur-sm rounded-full text-xs text-gray-400 border border-[#022B31]/50">
                            {project.category}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* View button */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-black transition-all duration-300 px-4 py-2 rounded-lg text-sm font-medium">
                        <Eye className="w-4 h-4" />
                        Voir le projet
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}