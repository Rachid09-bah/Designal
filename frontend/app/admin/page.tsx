"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { adminAPI, projectsAPI } from "@/lib/api"

export default function AdminPage() {
  const [stats, setStats] = useState<any>({})
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "Résidentiel",
    style: "Moderne",
    status: "draft"
  })
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/login')
      return
    }

    fetchData()
  }, [router])

  const fetchData = async () => {
    try {
      const [dashboardRes, projectsRes] = await Promise.all([
        adminAPI.getDashboard(),
        projectsAPI.getAll()
      ])
      
      setStats(dashboardRes.data.stats)
      setProjects(projectsRes.data.projects || [])
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('token')
        router.push('/auth/login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await projectsAPI.create(newProject)
      setNewProject({ title: "", description: "", category: "Résidentiel", style: "Moderne", status: "draft" })
      setShowCreateForm(false)
      fetchData()
    } catch (error) {
      console.error("Erreur création projet:", error)
    }
  }

  const toggleFeatured = async (projectId: string) => {
    try {
      await projectsAPI.toggleFeatured(projectId)
      fetchData()
    } catch (error) {
      console.error("Erreur toggle featured:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  if (isLoading) {
    return <div className="p-8">Chargement...</div>
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Administration</h1>
        <div className="space-x-4">
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            {showCreateForm ? "Annuler" : "Nouveau Projet"}
          </Button>
          <Button onClick={handleLogout} variant="outline">Déconnexion</Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Projets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Projets Publiés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedProjects || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Projets Mis en Avant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featuredProjects || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Formulaire de création */}
      {showCreateForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nouveau Projet</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <Input
                placeholder="Titre du projet"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                required
              />
              <Textarea
                placeholder="Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                required
              />
              <select 
                value={newProject.category} 
                onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="Résidentiel">Résidentiel</option>
                <option value="Commercial">Commercial</option>
                <option value="Studio">Studio</option>
                <option value="Boutique">Boutique</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Bureau">Bureau</option>
              </select>
              <Button type="submit">Créer le Projet</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Liste des projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <Card key={project._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <Button
                  size="sm"
                  variant={project.featured ? "default" : "outline"}
                  onClick={() => toggleFeatured(project._id)}
                >
                  {project.featured ? "★" : "☆"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{project.description}</p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">{project.category}</Badge>
                <Badge className={project.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {project.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}