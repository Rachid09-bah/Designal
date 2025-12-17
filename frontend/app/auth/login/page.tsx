"use client"

import { useState, useEffect } from "react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Vérifier si déjà connecté
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')
        
        if (token && userData) {
          const user = JSON.parse(userData)
          setTimeout(() => {
            if (user.role === 'admin') {
              window.location.replace('/admin/projects')
            } else {
              window.location.replace('/')
            }
          }, 100)
        }
      } catch (e) {
        // Ignorer les erreurs
      }
    }
    
    checkAuth()
  }, [])

  const handleSubmit = async (e) => {
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
        
        // Redirection forcée
        setTimeout(() => {
          if (data.user.role === 'admin') {
            window.location.replace('/admin/projects')
          } else {
            window.location.replace('/')
          }
        }, 200)
      } else {
        setError(data.error || "Identifiants incorrects")
      }
    } catch (error) {
      setError("Erreur de connexion")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#1a1a1a',
        padding: '32px',
        borderRadius: '12px',
        border: '1px solid #333'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <a href="/" style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#fff', 
            textDecoration: 'none' 
          }}>
            DESIGNAL
          </a>
          <h1 style={{ 
            fontSize: '24px', 
            margin: '16px 0 8px 0',
            fontWeight: '600'
          }}>
            Connexion
          </h1>
          <p style={{ color: '#999', margin: 0 }}>
            Accédez à votre espace
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: '#2a2a2a',
                border: '1px solid #444',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="votre@email.com"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: '#2a2a2a',
                border: '1px solid #444',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="Votre mot de passe"
            />
          </div>

          {error && (
            <div style={{
              padding: '12px',
              backgroundColor: '#dc2626',
              border: '1px solid #b91c1c',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <p style={{ color: '#999', margin: '0 0 16px 0' }}>
              Pas de compte ? <a href="/auth/register" style={{ color: '#fff', textDecoration: 'underline' }}>S'inscrire</a>
            </p>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#1a1a1a', 
              borderRadius: '8px',
              border: '1px solid #333'
            }}>
              <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px 0' }}>
                Test :
              </p>
              <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
                admin@designal.com / admin123
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}