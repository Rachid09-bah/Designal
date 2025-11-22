"use client"

import { useState, useEffect } from "react"
import { projectsAPI } from "@/lib/api"

export function Portfolio() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll()
        setProjects(response.data.projects || [])
      } catch (error) {
        console.error("Erreur lors du chargement des projets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-balance">Portfolio</h2>
          <div className="w-24 h-px bg-accent mx-auto" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos réalisations et laissez-vous inspirer
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Chargement des projets...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {projects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Aucun projet disponible</p>
              </div>
            ) : (
              projects.map((project: any) => (
                <div key={project._id} className="group relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer">
                  <img
                    src={project.images?.[0]?.url || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-semibold">{project.title}</h3>
                    <p className="text-white/80 text-sm">{project.category}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  )
}
