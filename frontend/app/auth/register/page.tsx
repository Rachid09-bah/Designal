"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        router.push("/auth/login")
      } else {
        setError(data.error || "Erreur lors de l'inscription")
      }
    } catch (error) {
      setError("Erreur de connexion")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022B31] to-[#0A4950] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl font-light text-white tracking-wider">DESIGNAL</Link>
          <p className="text-white/80 mt-2">Créer votre compte</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:border-white focus:outline-none transition-all"
                placeholder="Nom complet"
              />
            </div>

            <div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:border-white focus:outline-none transition-all"
                placeholder="Email"
              />
            </div>

            <div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:border-white focus:outline-none transition-all"
                placeholder="+224 123 456 789"
              />
            </div>

            <div>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:border-white focus:outline-none transition-all"
                placeholder="Mot de passe"
                minLength={6}
              />
            </div>

            <div>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:border-white focus:outline-none transition-all"
                placeholder="Confirmer le mot de passe"
                minLength={6}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-white text-[#022B31] hover:bg-white/90 font-medium py-4 text-lg rounded-xl transition-all"
            >
              {isLoading ? "Création..." : "Créer mon compte"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-white/80">
              Déjà un compte ? <Link href="/auth/login" className="text-white font-medium underline">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}