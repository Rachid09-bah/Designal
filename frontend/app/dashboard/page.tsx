"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, CheckCircle, Star, Globe, FolderOpen, LogOut, Calendar, Eye, TrendingUp, Users, Activity, Plus, Settings, Menu, X } from "lucide-react"
import { projectsAPI } from "@/lib/api"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { motion } from "framer-motion"

function DashboardContent() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  const stats = [
    {
      title: "Total Projets",
      value: projects.length,
      icon: BarChart3,
      color: "from-blue-500 to-blue-600",
      change: "+12%"
    },
    {
      title: "Projets Publiés",
      value: projects.filter(p => p.status === 'published').length,
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      change: "+8%"
    },
    {
      title: "Projets Vedettes",
      value: projects.filter(p => p.featured).length,
      icon: Star,
      color: "from-yellow-500 to-yellow-600",
      change: "+15%"
    },
    {
      title: "Vues Totales",
      value: "2.4k",
      icon: Eye,
      color: "from-purple-500 to-purple-600",
      change: "+23%"
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#022B31] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#022B31] to-[#0A4950] bg-clip-text text-transparent">DESIGNAL</h2>
            <Button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 bg-transparent hover:bg-gray-800">
              <X size={20} className="text-gray-400" />
            </Button>
          </div>
          
          <nav className="space-y-2">
            <Button className="w-full justify-start bg-[#022B31] text-white hover:bg-[#0A4950] font-medium">
              <Activity size={18} className="mr-3" /> Dashboard
            </Button>
            <Button onClick={() => router.push('/admin/projects')} className="w-full justify-start bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white font-medium">
              <FolderOpen size={18} className="mr-3" /> Projets
            </Button>
            <Button className="w-full justify-start bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white font-medium">
              <Users size={18} className="mr-3" /> Clients
            </Button>
            <Button className="w-full justify-start bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white font-medium">
              <Settings size={18} className="mr-3" /> Paramètres
            </Button>
          </nav>
        </div>
        
        <div className="absolute bottom-6 left-6 right-6">
          <Button onClick={handleLogout} className="w-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white font-medium">
            <LogOut size={18} className="mr-3" /> Déconnexion
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <div className="bg-black/30 backdrop-blur-xl border-b border-gray-800 p-4 lg:p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 bg-gray-800 hover:bg-gray-700">
                <Menu size={20} className="text-white" />
              </Button>
              <div>
                <h1 className="text-2xl lg:text-4xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400 text-sm lg:text-base">Gérez votre portfolio Designal</p>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-3">
              <Button onClick={() => router.push('/')} className="hidden lg:flex bg-gray-800 text-white hover:bg-gray-700 font-medium px-4 py-2 rounded-lg items-center gap-2">
                <Globe size={16} /> Site
              </Button>
              <Button onClick={() => router.push('/admin/projects')} className="bg-[#022B31] text-white hover:bg-[#0A4950] font-medium px-3 lg:px-6 py-2 lg:py-3 rounded-lg shadow-lg flex items-center gap-2">
                <Plus size={16} /> <span className="hidden lg:inline">Nouveau projet</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-4 lg:p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-4 lg:p-6 rounded-2xl hover:bg-gray-900/70 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                      <TrendingUp size={14} />
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Projects Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">Projets Récents</h2>
              <Button onClick={() => router.push('/admin/projects')} className="bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white font-medium px-4 py-2 rounded-lg">
                Voir tout
              </Button>
            </div>
          </motion.div>
        
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6"
          >
            {projects.length === 0 ? (
              <div className="col-span-full text-center py-16 lg:py-20 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800">
                <FolderOpen size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg lg:text-xl mb-2">Aucun projet trouvé</p>
                <p className="text-gray-500 text-sm mb-6">Créez votre premier projet pour commencer</p>
                <Button onClick={() => router.push('/admin/projects')} className="bg-[#022B31] text-white hover:bg-[#0A4950] font-medium px-6 py-3 rounded-lg">
                  <Plus size={16} className="mr-2" /> Créer un projet
                </Button>
              </div>
            ) : (
              projects.slice(0, 6).map((project: any, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:bg-gray-900/70 transition-all duration-300 rounded-2xl overflow-hidden group">
                    {project.images?.[0]?.url && (
                      <div className="h-40 lg:h-48 overflow-hidden">
                        <img 
                          src={project.images[0].url?.startsWith('/uploads') ? `http://localhost:5001${project.images[0].url}` : project.images[0].url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => { e.currentTarget.src = '/placeholder.svg' }}
                        />
                      </div>
                    )}
                    <CardHeader className="p-4 lg:p-6">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg lg:text-xl font-bold text-white group-hover:text-[#022B31] transition-colors line-clamp-1">{project.title}</CardTitle>
                        {project.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-2 py-1 rounded-full font-medium flex items-center gap-1 text-xs">
                            <Star size={12} /> Vedette
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 lg:p-6 pt-0">
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">{project.description}</p>
                      <div className="flex gap-2 flex-wrap mb-4">
                        <Badge variant="outline" className="border-gray-700 text-gray-400 font-medium text-xs">{project.category}</Badge>
                        {project.subcategory && <Badge variant="outline" className="border-gray-700 text-gray-400 font-medium text-xs">{project.subcategory}</Badge>}
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge className={`${project.status === 'published' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'} border font-medium text-xs`}>
                          {project.status === 'published' ? <><Eye size={10} className="mr-1" /> Publié</> : <><Calendar size={10} className="mr-1" /> Brouillon</>}
                        </Badge>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
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