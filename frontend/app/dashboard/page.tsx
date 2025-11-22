"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, CheckCircle, Star, Globe, FolderOpen, LogOut, Calendar, Eye } from "lucide-react"
import { projectsAPI } from "@/lib/api"
import { ProtectedRoute } from "@/components/ProtectedRoute"

function DashboardContent() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await projectsAPI.getAll()
        setProjects(response.data.projects || [])
      } catch (error) {
        console.error('Erreur chargement projets:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-800 p-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400 text-lg">Bienvenue dans votre espace d'administration Designal</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => router.push('/')}
              className="bg-gray-800 text-white hover:bg-gray-700 font-medium px-6 py-3 rounded-xl border border-gray-600 transition-all flex items-center gap-2"
            >
              <Globe size={18} /> Voir le site
            </Button>
            <Button 
              onClick={() => router.push('/admin/projects')}
              className="bg-white text-black hover:bg-gray-100 font-medium px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <FolderOpen size={18} /> Gérer les projets
            </Button>
            <Button onClick={handleLogout} className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-6 py-3 rounded-xl transition-all flex items-center gap-2">
              <LogOut size={18} /> Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Projets</p>
                <p className="text-3xl font-bold text-white">{projects.length}</p>
              </div>
              <BarChart3 size={32} className="text-gray-500" />
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Projets Publiés</p>
                <p className="text-3xl font-bold text-white">{projects.filter(p => p.status === 'published').length}</p>
              </div>
              <CheckCircle size={32} className="text-gray-500" />
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Projets Mis en Avant</p>
                <p className="text-3xl font-bold text-white">{projects.filter(p => p.featured).length}</p>
              </div>
              <Star size={32} className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Vos Projets Récents</h2>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-800">
              <FolderOpen size={64} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-xl">Aucun projet trouvé</p>
              <p className="text-gray-500 text-sm mt-2">Commencez par créer votre premier projet</p>
            </div>
          ) : (
            projects.map((project: any) => (
              <Card key={project._id} className="border-gray-700 bg-gray-900/70 backdrop-blur-sm shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden group">
                {project.images?.[0]?.url && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={project.images[0].url?.startsWith('/uploads') ? `http://localhost:5001${project.images[0].url}` : project.images[0].url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</CardTitle>
                    {project.featured && <Badge className="bg-gray-700 text-white px-3 py-1 rounded-full font-medium flex items-center gap-1"><Star size={14} /> Vedette</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-gray-300 mb-4 leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge variant="outline" className="border-gray-600 text-gray-300 font-medium">{project.category}</Badge>
                    {project.subcategory && <Badge variant="outline" className="border-gray-600 text-gray-300 font-medium">{project.subcategory}</Badge>}
                    {project.style && <Badge variant="outline" className="border-gray-600 text-gray-300 font-medium">{project.style}</Badge>}
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge className={project.status === 'published' ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-200'} variant="outline">
                      {project.status === 'published' ? <><Eye size={12} className="mr-1" /> Publié</> : <><Calendar size={12} className="mr-1" /> Brouillon</>}
                    </Badge>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <DashboardContent />
    </ProtectedRoute>
  )
}