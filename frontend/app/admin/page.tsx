"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { adminAPI } from "@/lib/api"

interface DashboardStats {
  totalUsers: number
  totalProjects: number
  publishedProjects: number
  featuredProjects: number
}

interface DashboardData {
  success: boolean
  stats: DashboardStats
  recentUsers: any[]
  recentProjects: any[]
}

function KpiCard({ label, value, icon, accent = "#fff" }: { label: string; value: number | string; icon?: React.ReactNode; accent?: string }) {
  return (
    <Card className="bg-gray-900 border-gray-800 rounded-2xl shadow-lg">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-400 mb-1">{label}</div>
          <div className="text-3xl font-semibold text-white">{value}</div>
        </div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#ffffff10", border: "1px solid #ffffff20", color: accent }}>
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}

function MiniAreaChart({ points, height = 80 }: { points: number[]; height?: number }) {
  const width = 220
  const padding = 6
  const max = Math.max(1, ...points)
  const step = (width - padding * 2) / Math.max(1, points.length - 1)
  const d = points.map((v, i) => `${padding + i * step},${height - padding - (v / max) * (height - padding * 2)}`).join(" ")

  return (
    <svg width={width} height={height} className="block">
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={d} fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <polygon
        points={`${d} ${padding},${height - padding}`}
        fill="url(#grad)"
        opacity={0.6}
      />
    </svg>
  )
}

function AdminDashboardContent() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState("")
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      setErrorMsg("")
      try {
        const { data } = await adminAPI.getDashboard()
        setData(data)
      } catch (err: any) {
        const msg = err?.response?.data?.error || "Erreur lors du chargement du tableau de bord"
        setErrorMsg(msg)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const trend = useMemo(() => {
    // Construire un mini trend 7 jours à partir des dates de recentProjects
    const days = 7
    const arr = new Array(days).fill(0)
    const today = new Date()
    data?.recentProjects?.forEach((p) => {
      const d = new Date(p.createdAt || p.updatedAt || Date.now())
      const diff = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
      if (diff >= 0 && diff < days) arr[days - 1 - diff]++
    })
    return arr
  }, [data])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Chargement du tableau de bord...</div>
      </div>
    )
  }

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
              <h1 className="text-4xl font-semibold mb-2">Tableau de bord</h1>
              <p className="text-gray-300">Vue d'ensemble de votre activité</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => router.push('/admin/projects')} className="bg-white text-black hover:bg-gray-200 font-medium px-6 py-3 rounded-xl">Gérer les projets</Button>
            <Button onClick={() => router.push('/admin/projects')} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl">+ Nouveau projet</Button>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {errorMsg && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm">{errorMsg}</div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard label="Utilisateurs" value={data?.stats?.totalUsers ?? 0} accent="#60a5fa" icon={<span className="text-xl">👥</span>} />
          <KpiCard label="Projets" value={data?.stats?.totalProjects ?? 0} accent="#fbbf24" icon={<span className="text-xl">📁</span>} />
          <KpiCard label="Publiés" value={data?.stats?.publishedProjects ?? 0} accent="#34d399" icon={<span className="text-xl">✅</span>} />
          <KpiCard label="En vedette" value={data?.stats?.featuredProjects ?? 0} accent="#f472b6" icon={<span className="text-xl">⭐</span>} />
        </div>

        {/* Trend + Actions rapides */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-gray-800 rounded-2xl shadow-lg lg:col-span-2 overflow-hidden">
            <CardHeader className="p-6 border-b border-gray-800">
              <CardTitle className="text-xl">Tendance des projets (7 jours)</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="w-full overflow-x-auto">
                <MiniAreaChart points={trend} />
              </div>
              <div className="mt-4 text-sm text-gray-400">Nombre de créations/modifications récentes</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 rounded-2xl shadow-lg">
            <CardHeader className="p-6 border-b border-gray-800">
              <CardTitle className="text-xl">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <Button onClick={() => router.push('/admin/projects')} className="w-full bg-white text-black hover:bg-gray-200 font-medium py-3 rounded-xl">Créer un projet</Button>
              <Button onClick={() => router.push('/admin/projects')} className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-xl">Gérer les projets</Button>
              <Button onClick={() => router.push('/dashboard')} className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-xl">Voir le site</Button>
            </CardContent>
          </Card>
        </div>

        {/* Activité récente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <CardHeader className="p-6 border-b border-gray-800">
              <CardTitle className="text-xl">Derniers utilisateurs</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {(!data?.recentUsers || data.recentUsers.length === 0) ? (
                <div className="text-gray-400">Aucun utilisateur récent</div>
              ) : (
                <ul className="space-y-4">
                  {data.recentUsers.map((u: any) => (
                    <li key={u._id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{u.name || 'Utilisateur'}</div>
                        <div className="text-gray-400 text-sm">{u.email}</div>
                      </div>
                      <Badge className="bg-white text-black rounded-full">{u.role}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <CardHeader className="p-6 border-b border-gray-800">
              <CardTitle className="text-xl">Derniers projets</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {(!data?.recentProjects || data.recentProjects.length === 0) ? (
                <div className="text-gray-400">Aucun projet récent</div>
              ) : (
                <ul className="space-y-4">
                  {data.recentProjects.map((p: any) => (
                    <li key={p._id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{p.title}</div>
                        <div className="text-gray-400 text-sm">{p.category}{p.style ? ` • ${p.style}` : ''}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {p.featured && <Badge className="bg-white text-black rounded-full">En vedette</Badge>}
                        <Badge variant="outline" className="border-gray-700 bg-gray-800 text-white rounded-full">{p.status}</Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}
