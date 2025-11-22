"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { projectsAPI } from "@/lib/api"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SubcategoryProjectsPage() {
  const params = useParams()
  const subcategory = decodeURIComponent(params.subcategory as string)
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll()
        console.log('Tous les projets:', response.data.projects)
        console.log('Sous-catégorie recherchée:', subcategory)
        const filteredProjects = response.data.projects?.filter(
          (project: any) => {
            console.log('Projet:', project.title, 'Sous-catégorie:', project.subcategory)
            return project.subcategory === subcategory && project.status === 'published'
          }
        ) || []
        console.log('Projets filtrés:', filteredProjects)
        setProjects(filteredProjects)
      } catch (error) {
        console.error("Erreur lors du chargement des projets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [subcategory])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <Link 
            href="/#services" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux services
          </Link>
        </div>

        <div className="text-center space-y-8 mb-16">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight">{subcategory}</h1>
          <div className="w-24 h-px bg-accent mx-auto" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos réalisations en {subcategory.toLowerCase()}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Chargement des projets...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {projects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Aucun projet disponible pour cette catégorie</p>
              </div>
            ) : (
              projects.map((project: any) => (
                <div key={project._id} className="group relative aspect-[4/3] overflow-hidden rounded-sm">
                  <img
                    src={project.images?.[0]?.url || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white font-semibold text-lg mb-1">{project.title}</h3>
                    <p className="text-white/80 text-sm">{project.description}</p>
                    {project.style && (
                      <p className="text-white/60 text-xs mt-1">Style: {project.style}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}