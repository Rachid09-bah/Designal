"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import api, { projectsAPI, uploadAPI } from "@/lib/api"

// Helper pour base URL
const buildImageUrl = (url: string) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  
  // Utiliser l'URL du backend Render en production
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://designal-bah.onrender.com'
    : 'http://localhost:5001'
  
  return baseUrl + url
}

import { useCategories } from '@/hooks/useCategories'

const styles = ['Moderne', 'Casual', 'Tradi-moderne', 'Artistique', 'Gaming & Tech', 'Hypebeast & Streetwear', 'Autre']

function AdminProjectsContent() {
  const { categories, getSubcategories, validateCategorySubcategory } = useCategories()
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    style: '',
    status: 'draft',
    featured: false,
    client: '',
    images: [{ url: '', alt: '', isPrimary: true }]
  })
  const [isUploading, setIsUploading] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [successMsg, setSuccessMsg] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setErrorMsg("")
    try {
      const { data } = await api.get('/projects/admin/all')
      setProjects(data.projects || [])
    } catch (error: any) {
      console.error("Erreur lors du chargement des projets", error)
      const msg = error?.response?.data?.error || 'Erreur lors du chargement des projets'
      setErrorMsg(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    setSuccessMsg("")
    try {
      const projectData = {
        ...formData,
        images: formData.images.filter(img => img.url)
      }

      if (!projectData.title || !projectData.description || !projectData.category) {
        setErrorMsg('Veuillez renseigner Titre, Description et Catégorie')
        return
      }

      // Validation des relations catégorie/sous-catégorie
      if (!validateCategorySubcategory(projectData.category, projectData.subcategory)) {
        setErrorMsg('Sous-catégorie invalide pour cette catégorie')
        return
      }

      if (editingProject) {
        await projectsAPI.update(editingProject._id, projectData)
        setSuccessMsg('Projet modifié avec succès')
      } else {
        await projectsAPI.create(projectData)
        setSuccessMsg('Projet créé avec succès')
      }

      setShowForm(false)
      setEditingProject(null)
      setFormData({
        title: '', description: '', category: '', subcategory: '', style: '',
        status: 'draft', featured: false, client: '',
        images: [{ url: '', alt: '', isPrimary: true }]
      })
      fetchProjects()
    } catch (error: any) {
      console.error('Erreur lors de la création/mise à jour', error)
      const msg = error?.response?.data?.error || 'Erreur lors de la création/mise à jour du projet'
      setErrorMsg(msg)
    }
  }

  const editProject = (project: any) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      subcategory: project.subcategory || '',
      style: project.style || '',
      status: project.status,
      featured: project.featured,
      client: project.client || '',
      images: project.images || [{ url: '', alt: '', isPrimary: true }]
    })
    setShowForm(true)
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return
    try {
      await projectsAPI.delete(id)
      fetchProjects()
    } catch (error: any) {
      console.error('Erreur suppression:', error)
      const msg = error?.response?.data?.error || 'Erreur lors de la suppression'
      setErrorMsg(msg)
    }
  }

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published'
    try {
      await projectsAPI.updateStatus(id, newStatus)
      fetchProjects()
    } catch (error: any) {
      console.error('Erreur changement statut:', error)
      const msg = error?.response?.data?.error || 'Erreur lors du changement de statut'
      setErrorMsg(msg)
    }
  }

  const selectedSubcategories = getSubcategories(formData.category)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const { data } = await uploadAPI.single(file)
      setFormData({
        ...formData,
        images: [{ url: data.imageUrl, alt: file.name, isPrimary: true }]
      })
    } catch (error: any) {
      console.error('Erreur upload:', error)
      const msg = error?.response?.data?.error || 'Erreur lors de l\'upload'
      setErrorMsg(msg)
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-xl">Vérification des permissions...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-black text-white p-8 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => router.push('/dashboard')}
              className="bg-gray-700 text-white hover:bg-gray-600 font-medium px-4 py-2 rounded-lg"
            >
              ← Retour
            </Button>
            <div>
              <h1 className="text-4xl font-semibold mb-2">Gestion des projets</h1>
              <p className="text-gray-300">Créez et gérez vos projets Designal</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-black hover:bg-gray-200 font-medium px-6 py-3 rounded-xl"
          >
            {showForm ? 'Annuler' : '+ Nouveau projet'}
          </Button>
        </div>
      </div>

      <div className="p-8">
        {showForm && (
          <Card className="mb-8 border-gray-800 bg-gray-900 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-black text-white p-8 border-b border-gray-800">
              <CardTitle className="text-2xl font-semibold">{editingProject ? 'Modifier le projet' : 'Nouveau projet'}</CardTitle>
            </CardHeader>
            <CardContent className="p-8 bg-gray-900">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Titre du projet *"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="p-4 border border-gray-700 rounded-xl bg-gray-800 text-white focus:border-white focus:outline-none transition-colors font-medium"
                  />
                  <input
                    type="text"
                    placeholder="Client"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="p-4 border border-gray-700 rounded-xl bg-gray-800 text-white focus:border-white focus:outline-none transition-colors font-medium"
                  />
                </div>

                <textarea
                  placeholder="Description *"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-4 border border-gray-700 rounded-xl bg-gray-800 text-white focus:border-white focus:outline-none transition-colors font-medium"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
                    className="p-4 border border-gray-700 rounded-xl bg-gray-800 text-white focus:border-white focus:outline-none transition-colors font-medium"
                  >
                    <option value="">Catégorie *</option>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.value}</option>
                    ))}
                  </select>

                  <select
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="p-4 border border-gray-700 rounded-xl bg-gray-800 text-white focus:border-white focus:outline-none transition-colors font-medium"
                    disabled={!formData.category}
                  >
                    <option value="">Sous-catégorie</option>
                    {selectedSubcategories.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>

                  <select
                    value={formData.style}
                    onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                    className="p-4 border border-gray-700 rounded-xl bg-gray-800 text-white focus:border-white focus:outline-none transition-colors font-medium"
                  >
                    <option value="">Style</option>
                    {styles.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Image principale *</label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleImageUpload}
                    className="w-full p-4 border border-gray-700 rounded-xl bg-gray-800 text-white focus:border-white focus:outline-none transition-colors font-medium file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white file:text-black hover:file:bg-gray-200"
                  />
                  {formData.images[0].url && (
                    <div className="mt-2">
                      <img 
                        src={buildImageUrl(formData.images[0].url)}
                        alt="Aperçu" 
                        className="w-32 h-32 object-cover rounded-lg border border-gray-600" 
                        onLoad={() => console.log('Image chargée avec succès')}
                        onError={(e) => {
                          console.log('Erreur image URL:', formData.images[0].url)
                          console.log('Erreur complète:', e)
                        }}
                      />
                      <p className="text-xs text-gray-400 mt-1">URL: {formData.images[0].url}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="p-4 border border-gray-700 rounded-xl bg-gray-800 text-white focus:border-white focus:outline-none transition-colors font-medium"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                  </select>

                  <label className="flex items-center gap-3 bg-gray-800 p-4 rounded-xl">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="accent-white w-5 h-5"
                    />
                    <span className="font-medium text-white">Projet mis en avant</span>
                  </label>
                </div>

                <Button type="submit" disabled={isLoading || isUploading} className="bg-white text-black hover:bg-gray-200 font-medium py-4 px-8 rounded-xl shadow-lg disabled:opacity-50">
                  {isUploading ? 'Upload en cours...' : isLoading ? (editingProject ? 'Modification...' : 'Création...') : (editingProject ? 'Modifier le projet' : 'Créer le projet')}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-200 text-sm">
            {successMsg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-gray-900 rounded-2xl">
              <p className="text-gray-400 text-lg">Aucun projet trouvé</p>
            </div>
          ) : (
            projects.map((project: any) => (
              <Card key={project._id} className="border-gray-800 bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold text-white">{project.title}</CardTitle>
                    {project.featured && <Badge className="bg-white text-black px-3 py-1 rounded-full">Mis en avant</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex gap-2 flex-wrap mb-6">
                    <Badge variant="outline" className="border-gray-700 bg-gray-800 text-white font-medium">{project.category}</Badge>
                    {project.subcategory && <Badge variant="outline" className="border-gray-700 bg-gray-800 text-white font-medium">{project.subcategory}</Badge>}
                    {project.style && <Badge variant="outline" className="border-gray-700 bg-gray-800 text-white font-medium">{project.style}</Badge>}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => toggleStatus(project._id, project.status)}
                      className={project.status === 'published' 
                        ? 'bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg text-sm' 
                        : 'bg-white text-black hover:bg-gray-200 font-medium px-4 py-2 rounded-lg text-sm'
                      }
                    >
                      {project.status === 'published' ? 'Dépublier' : 'Publier'}
                    </Button>
                    <Button
                      onClick={() => editProject(project)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm"
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => deleteProject(project._id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg text-sm"
                    >
                      Supprimer
                    </Button>
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

export default function AdminProjectsPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminProjectsContent />
    </ProtectedRoute>
  )
}