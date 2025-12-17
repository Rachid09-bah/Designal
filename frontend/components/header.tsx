"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    checkAuth()
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    } else {
      setUser(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setIsMobileMenuOpen(false)
    window.location.href = '/'
  }

  const navLinks = [
    { href: "#accueil", label: "Accueil" },
    { href: "#a-propos", label: "À propos" },
    { href: "#services", label: "Services" },
    { href: "#styles", label: "Styles" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ]

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  if (!isClient) {
    return null
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-[#022B31]/95 backdrop-blur-md shadow-lg text-white" : "bg-[#022B31] text-white"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#accueil"
            onClick={(e) => scrollToSection(e, "#accueil")}
            className="text-2xl font-light tracking-wider text-white hover:text-gray-200 transition-colors"
          >
            DESIGNAL
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-light tracking-wide text-white hover:text-gray-200 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-white">Bonjour, {user.name}</span>
                {user.role === 'admin' && (
                  <Link href="/admin/projects">
                    <Button size="sm" className="bg-[#D6E7E8] text-[#022B31] hover:bg-white font-medium">
                      Admin
                    </Button>
                  </Link>
                )}
                <Button 
                  size="sm" 
                  onClick={handleLogout}
                  className="bg-gray-600 text-white hover:bg-gray-700 font-medium"
                >
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm font-medium text-[#D6E7E8] hover:text-white transition-colors">
                  Se connecter
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="bg-[#D6E7E8] text-[#022B31] hover:bg-white font-medium">
                    Créer un compte
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-600">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-base font-light text-white hover:text-gray-200 py-2"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="border-t border-gray-600 pt-4">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="text-white text-base py-2">
                      Bonjour, {user.name}
                    </div>
                    {user.role === 'admin' && (
                      <Link href="/admin/projects" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button size="sm" className="bg-white text-[#022B31] hover:bg-gray-100 w-full">
                          Administration
                        </Button>
                      </Link>
                    )}
                    <Button 
                      size="sm" 
                      onClick={handleLogout}
                      className="bg-red-600 text-white hover:bg-red-700 w-full"
                    >
                      Déconnexion
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link 
                      href="/auth/login" 
                      className="text-base text-white hover:text-gray-200 py-2 block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Se connecter
                    </Link>
                    <Link 
                      href="/auth/register" 
                      className="py-2 block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button size="sm" className="bg-white text-[#022B31] hover:bg-gray-100 w-full">
                        Créer un compte
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}