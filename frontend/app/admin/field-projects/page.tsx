"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import api from '@/lib/api'

export default function FieldProjectsPage() {
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/field-projects/admin/all')
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-black text-white">
        <div className="p-4 md:p-8 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-4xl font-semibold mb-2">Projets Terrain</h1>
              <p className="text-gray-300">Ajoutez vos réalisations depuis le terrain</p>
            </div>
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-xl"
            >
              + Nouveau projet
            </Button>
          </div>
        </div>

        <div className="p-4 md:p-8">
          {showForm && (
            <Card className="mb-8 border-gray-800 bg-gray-900 rounded-2xl">
              <CardHeader className="bg-black p-6 border-b border-gray-800">
                <CardTitle className="text-xl text-white">Ajouter un projet</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <QuickForm onSuccess={() => {
                  setShowForm(false)
                  fetchProjects()
                }} />
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-400">Chargement...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-gray-900 rounded-2xl">
                <p className="text-gray-400">Aucun projet trouvé</p>
              </div>
            ) : (
              projects.map((project: any) => (
                <ProjectCard key={project._id} project={project} />
              ))
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function QuickForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Résidentiel',
    city: ''
  })
  const [images, setImages] = useState<FileList | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.description || !images) return

    setIsSubmitting(true)
    try {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('description', formData.description)
      data.append('category', formData.category)
      data.append('location', JSON.stringify({ city: formData.city }))
      
      Array.from(images).forEach(file => {
        data.append('images', file)
      })

      await api.post('/field-projects', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      onSuccess()
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Titre du projet *"
        required
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-3 border border-gray-700 rounded-xl bg-gray-800 text-white focus:border-white focus:outline-none"
      />

      <textarea
        placeholder="Description *"
        required
        rows={3}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full p-3 border border-gray-700 rounded-xl bg-gray-800 text-white focus:border-white focus:outline-none"
      />

      <div className="grid grid-cols-2 gap-4">
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="p-3 border border-gray-700 rounded-xl bg-gray-800 text-white focus:border-white focus:outline-none"
        >
          <option value="Résidentiel">Résidentiel</option>
          <option value="Commercial">Commercial</option>
          <option value="Industriel">Industriel</option>
          <option value="Rénovation">Rénovation</option>
        </select>

        <input
          type="text"
          placeholder="Ville"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="p-3 border border-gray-700 rounded-xl bg-gray-800 text-white focus:border-white focus:outline-none"
        />
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        required
        onChange={(e) => setImages(e.target.files)}
        className="w-full p-3 border border-gray-700 rounded-xl bg-gray-800 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white file:text-black"
      />

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-white text-black hover:bg-gray-200 py-3 rounded-xl"
      >
        {isSubmitting ? 'Création...' : 'Créer le projet'}
      </Button>
    </form>
  )
}

function ProjectCard({ project }: { project: any }) {
  const primaryImage = project.images?.[0]

  return (
    <Card className="border-gray-800 bg-gray-900 rounded-2xl overflow-hidden">
      {primaryImage && (
        <div className="aspect-video bg-gray-800">
          <img 
            src={primaryImage.url} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
        
        <div className="flex gap-2 mb-3">
          <Badge className="bg-gray-700 text-white text-xs">
            {project.category}
          </Badge>
          {project.location?.city && (
            <Badge className="bg-gray-700 text-white text-xs">
              {project.location.city}
            </Badge>
          )}
        </div>

        <div className="text-xs text-gray-400">
          {new Date(project.dateRealized || project.createdAt).toLocaleDateString('fr-FR')}
        </div>
      </CardContent>
    </Card>
  )
}