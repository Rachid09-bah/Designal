"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Redirection selon le rôle
        if (data.user.role === 'admin') {
          router.push('/admin/projects')
        } else {
          router.push('/')
        }
      } else {
        setError(data.error || "Identifiants incorrects")
      }
    } catch (error) {
      setError("Erreur de connexion au serveur")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-700">
        <CardHeader className="text-center pb-8">
          <div className="mb-4">
            <Link href="/" className="text-3xl font-bold text-white">DESIGNAL</Link>
          </div>
          <CardTitle className="text-2xl font-semibold text-white">Connexion</CardTitle>
          <p className="text-gray-400 mt-2">Accédez à votre espace personnel</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-white focus:outline-none transition-colors"
                placeholder="votre.email@entreprise.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Mot de passe</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-white focus:outline-none transition-colors"
                placeholder="Votre mot de passe"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="accent-white"
                />
                <span className="text-sm text-gray-300">Se souvenir de moi</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-white underline">
                Mot de passe oublié ?
              </Link>
            </div>

            {error && (
              <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-white text-black hover:bg-gray-200 font-medium py-4 text-lg rounded-lg"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>

            <div className="text-center pt-4">
              <p className="text-gray-400">
                Pas encore de compte ? <Link href="/auth/register" className="text-white underline font-medium">S'inscrire</Link>
              </p>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">Compte de démonstration :</p>
                <p className="text-xs text-gray-400">admin@designal.com / admin123</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}