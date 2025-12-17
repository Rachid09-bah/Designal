"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

function AuthButtons({ isScrolled }: { isScrolled: boolean }) {
  const [isClient, setIsClient] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/'
  }

  if (!isClient) {
    return (
      <>
        <Link href="/auth/login" className={`text-sm font-medium transition-colors ${
          isScrolled ? "text-yellow-400 hover:text-yellow-300 font-semibold" : "text-white hover:text-gray-100 drop-shadow-lg font-medium"
        }`}>
          Se connecter
        </Link>
        <Link href="/auth/register">
          <Button size="sm" className={`font-medium ${
            isScrolled ? "bg-white text-[#022B31] hover:bg-gray-100" : "bg-[#D6E7E8] text-[#022B31] hover:bg-white"
          }`}>
            Créer un compte
          </Button>
        </Link>
      </>
    )
  }

  return user ? (
    <div className="flex items-center gap-4">
      <span className={`text-sm ${
        isScrolled ? "text-white" : "text-white drop-shadow-lg font-medium"
      }`}>Bonjour, {user.name}</span>
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
    </div>
  ) : (
    <>
      <Link href="/auth/login" className={`text-sm font-medium transition-colors ${
        isScrolled ? "text-yellow-400 hover:text-yellow-300 font-semibold" : "text-[#D6E7E8] hover:text-white"
      }`}>
        Se connecter
      </Link>
      <Link href="/auth/register">
        <Button size="sm" className={`font-medium ${
          isScrolled ? "bg-white text-[#022B31] hover:bg-gray-100" : "bg-[#D6E7E8] text-[#022B31] hover:bg-white"
        }`}>
          Créer un compte
        </Button>
      </Link>
    </>
  )
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? "bg-gradient-to-r from-[#022B31] to-[#0A4950] backdrop-blur-xl shadow-2xl border-b border-[#022B31]/30" 
          : "bg-black/20 backdrop-blur-sm mt-4"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#accueil"
            onClick={(e) => scrollToSection(e, "#accueil")}
            className={`text-2xl font-light tracking-wider transition-colors ${
              isScrolled ? "text-white hover:text-gray-200" : "text-white hover:text-gray-100 drop-shadow-lg"
            }`}
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
                className={`text-sm font-light tracking-wide transition-colors ${
                  isScrolled ? "text-white hover:text-gray-200" : "text-white hover:text-gray-100 drop-shadow-lg font-medium"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <AuthButtons isScrolled={isScrolled} />
            <Button
              size="sm"
              className={`font-medium transition-all ${
                isScrolled ? "bg-white/20 text-white hover:bg-white hover:text-[#022B31] border border-white/30" : "bg-[#0A4950] text-white hover:bg-[#D6E7E8] hover:text-[#022B31]"
              }`}
              onClick={() => {
                const element = document.querySelector("#contact")
                if (element) element.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Devis gratuit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-base font-light tracking-wide text-white hover:text-gray-200 transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-gray-600 pt-4">
                <Link 
                  href="/auth/login" 
                  className="text-base font-light tracking-wide text-white hover:text-gray-200 transition-colors py-2 block"
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
              </div>
              <Button
                size="sm"
                className="bg-white text-[#022B31] hover:bg-gray-100 w-full mt-2"
                onClick={() => {
                  const element = document.querySelector("#contact")
                  if (element) element.scrollIntoView({ behavior: "smooth" })
                  setIsMobileMenuOpen(false)
                }}
              >
                Devis gratuit
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
