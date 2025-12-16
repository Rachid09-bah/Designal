"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Contact } from "@/components/contact"
import { PageTransition } from "@/components/PageTransition"

const servicesData = [
  { title: "Appartement / Maison", desc: "Chambre, salon, cuisine", subs: [
    "Chambre parentale", "Salon contemporain", "Cuisine moderne", "Salle de bain", "Dressing sur mesure"
  ]},
  { title: "Studio créatif", desc: "Photo, mannequinat, influenceur, podcast, gamer", subs: [
    "Studio photo", "Espace mannequinat", "Plateau influenceur", "Setup podcast", "Setup gaming"
  ]},
  { title: "Boutique", desc: "Vêtements, accessoires, parfumerie", subs: [
    "Prêt-à-porter", "Accessoires & maroquinerie", "Parfumerie", "Merchandising visuel"
  ]},
  { title: "Galerie d'art / Exposition", desc: "Espaces qui magnifient les œuvres", subs: [
    "Parcours d'exposition", "Éclairage muséal", "Scénographie", "Signalétique"
  ]},
  { title: "Bureau créatif / Coworking", desc: "Espaces inspirants", subs: [
    "Open space", "Salle de réunion", "Phone booth", "Espace détente"
  ]},
  { title: "Restaurant & Café", desc: "Fast-food, café, lounge", subs: [
    "Fast-food", "Café", "Lounge", "Comptoir & flux"
  ]},
  { title: "Pharmacie & Agence", desc: "Fonctionnels et accueillants", subs: [
    "Comptoir & parcours client", "Rayonnage & vitrines", "Espace d'attente", "Back-office"
  ]},
] as const

export default function Home() {
  const [projects, setProjects] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  // Charger les projets depuis l'API
  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
        if (response.ok) {
          const data = await response.json()
          setProjects(data.projects || [])
        }
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProjects()
  }, [])



  return (
    <PageTransition>
      <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0 -z-10">
          <img
            src="/modern-minimalist-interior-design-living-room-with.jpg"
            alt="Design intérieur haut de gamme"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.3) contrast(1.2)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#022B31]/30 to-transparent" />
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-[#022B31]/20 rounded-full blur-lg animate-pulse delay-1000" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">

            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6 text-center"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="block text-white mb-2"
              >
                Donnez vie à vos espaces
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block text-[#022B31] font-semibold"
              >
                avec DESIGNAL
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8 font-light"
            >
              Studio de design d'intérieur premium spécialisé dans l'aménagement d'espaces d'exception.
              <br className="hidden sm:block" />
              <span className="text-white font-normal">Votre vision, notre expertise.</span>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild className="bg-[#022B31] text-white hover:bg-[#0A4950] font-medium px-8 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto">
                <Link href="#services">
                  Nos services
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="border-2 border-white text-white hover:bg-white hover:text-black font-medium px-8 py-3 text-base transition-all duration-200 w-full sm:w-auto">
                <Link href="#contact">
                  Nous contacter
                </Link>
              </Button>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">150+</div>
                    <div className="text-sm text-gray-300">Projets réalisés</div>
                  </div>
                  <div className="border-x border-white/20">
                    <div className="text-3xl font-bold text-white mb-1">98%</div>
                    <div className="text-sm text-gray-300">Clients satisfaits</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">5★</div>
                    <div className="text-sm text-gray-300">Note moyenne</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* À propos */}
      <section id="a-propos" className="py-24 sm:py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden scroll-mt-20">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#022B31]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-block px-4 py-2 bg-[#022B31]/20 backdrop-blur-sm rounded-full border border-[#022B31]/30 text-[#022B31] text-sm font-medium mb-6">
                  🏆 Excellence & Innovation
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  À propos de
                  <span className="block bg-gradient-to-r from-[#022B31] to-[#0A4950] bg-clip-text text-transparent">
                    DESIGNAL
                  </span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#022B31] to-[#0A4950] mb-8" />
              </div>
              
              <div className="space-y-6">
                <p className="text-xl text-gray-300 leading-relaxed">
                  DESIGNAL est un <span className="text-white font-semibold">studio créatif premium</span> spécialisé dans l'illustration 3D et l'aménagement d'espaces d'exception.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Nous transformons vos idées les plus audacieuses en environnements élégants, fonctionnels et inspirants. Chaque projet est une œuvre d'art unique.
                </p>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                <div className="group p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-[#022B31]/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#022B31] to-[#0A4950] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Innovation</h3>
                  <p className="text-gray-400 text-sm">Technologies 3D de pointe</p>
                </div>
                
                <div className="group p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-[#022B31]/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#022B31] to-[#0A4950] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Excellence</h3>
                  <p className="text-gray-400 text-sm">Qualité premium garantie</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl border border-gray-700/50">
                <img 
                  src="/luxury-modern-living-room.png" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  alt="Intérieur premium DESIGNAL" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Floating badge */}
                <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-black text-sm font-semibold shadow-lg">
                  ⭐ Projet Premium
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-[#022B31]/20 to-transparent rounded-full blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 sm:py-32 bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white relative overflow-hidden scroll-mt-20">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #022B31 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-8">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#022B31]/20 to-[#0A4950]/20 backdrop-blur-sm rounded-full border border-[#022B31]/30 text-white text-sm font-medium mb-6">
              🏗️ Nos expertises
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Nos <span className="bg-gradient-to-r from-[#022B31] to-[#0A4950] bg-clip-text text-transparent">services</span>
            </h2>
            
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#022B31] to-transparent mx-auto" />
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Une expertise complète et sur-mesure pour donner vie à tous vos projets d'aménagement, 
              <br className="hidden sm:block" />
              du concept à la réalisation.
            </p>
          </div>
          
          <ServicesGrid />
          
          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">Un projet en tête ?</h3>
              <p className="text-gray-300 mb-6">Discutons ensemble de vos besoins et créons quelque chose d'exceptionnel.</p>
              <Button asChild className="bg-gradient-to-r from-[#022B31] to-[#0A4950] text-white hover:from-[#0A4950] hover:to-[#022B31] font-semibold px-8 py-3 shadow-lg hover:shadow-[#022B31]/25 transition-all duration-300">
                <Link href="#contact">Commencer mon projet</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Styles */}
      <section id="styles" className="py-24 sm:py-32 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white relative overflow-hidden scroll-mt-20">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#022B31]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-8">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#022B31]/20 to-[#0A4950]/20 backdrop-blur-sm rounded-full border border-[#022B31]/30 text-white text-sm font-medium mb-6">
              🎨 Univers créatifs
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Nos <span className="bg-gradient-to-r from-[#022B31] to-[#0A4950] bg-clip-text text-transparent">styles</span>
            </h2>
            
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#022B31] to-transparent mx-auto" />
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Des univers variés et sur-mesure pour répondre à toutes vos envies et refléter votre personnalité unique.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {name:"Casual", img:"/casual-interior-design-cozy-living-room.jpg", desc: "Confort et convivialité"},
              {name:"Moderne", img:"/modern-minimalist-interior-design.jpg", desc: "Épuré et contemporain"},
              {name:"Tradi-moderne", img:"/traditional-modern-interior-design-blend.jpg", desc: "Élégance intemporelle"},
              {name:"Artistique", img:"/artistic-interior-design-gallery-space.jpg", desc: "Créativité et originalité"},
              {name:"Gaming & Tech", img:"/gaming-setup-modern-tech-interior.jpg", desc: "Innovation et performance"},
              {name:"Hypebeast & Streetwear", img:"/streetwear-boutique-modern-interior.jpg", desc: "Tendance et audace"},
            ].map((st,i)=> (
              <div key={st.name} className="group relative overflow-hidden rounded-3xl border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-[#022B31]/20 transition-all duration-700 hover:-translate-y-2">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={st.img} 
                    alt={st.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#022B31]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-bold text-white mb-2">{st.name}</h3>
                      <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {st.desc}
                      </p>
                    </div>
                    
                    {/* Action button */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-black transition-all duration-300">
                        Découvrir
                      </Button>
                    </div>
                  </div>
                  
                  {/* Number badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-sm font-bold border border-white/30">
                    {i + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 sm:py-32 bg-gradient-to-b from-black via-gray-950 to-black text-white relative overflow-hidden scroll-mt-20">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-[#022B31] rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-white rounded-full blur-2xl animate-pulse delay-2000" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-8">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#022B31]/20 to-[#0A4950]/20 backdrop-blur-sm rounded-full border border-[#022B31]/30 text-white text-sm font-medium mb-6">
              🏆 Nos réalisations
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Notre <span className="bg-gradient-to-r from-[#022B31] to-[#0A4950] bg-clip-text text-transparent">Portfolio</span>
            </h2>
            
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#022B31] to-transparent mx-auto" />
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Découvrez nos créations les plus remarquables et laissez-vous inspirer par l'excellence de nos réalisations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Enhanced skeleton loading
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 animate-pulse border border-gray-700/50">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-[#022B31] border-t-transparent rounded-full animate-spin" />
                  </div>
                </div>
              ))
            ) : projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={project._id} className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-[#022B31]/20 transition-all duration-700 hover:-translate-y-2">
                  <img 
                    src={project.images?.[0]?.url?.startsWith('/uploads') ? `http://localhost:5001${project.images[0].url}` : project.images?.[0]?.url || '/placeholder.jpg'} 
                    alt={project.images?.[0]?.alt || project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    onError={(e) => { e.currentTarget.src = '/placeholder.jpg' }}
                  />
                  
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#022B31]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Project number */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-sm font-bold border border-white/30 group-hover:bg-[#022B31] group-hover:border-[#022B31] transition-all duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-[#022B31] to-[#0A4950] rounded-full text-white text-xs font-semibold shadow-lg">
                      ⭐ Vedette
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="space-y-2">
                      <h3 className="font-bold text-xl mb-2 group-hover:text-[#022B31] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-gray-300 border border-white/30">
                          {project.category}
                        </span>
                        {project.subcategory && (
                          <span className="px-2 py-1 bg-[#022B31]/30 backdrop-blur-sm rounded-full text-gray-400 border border-[#022B31]/50">
                            {project.subcategory}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Action button */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-black transition-all duration-300">
                        Voir le projet
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Portfolio en construction</h3>
                  <p className="text-gray-400">Nos plus beaux projets arrivent bientôt !</p>
                </div>
              </div>
            )}
          </div>
          
          {/* CTA */}
          {projects.length > 0 && (
            <div className="mt-16 text-center">
              <Button asChild className="bg-gradient-to-r from-[#022B31] to-[#0A4950] text-white hover:from-[#0A4950] hover:to-[#022B31] font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-[#022B31]/25 transition-all duration-300">
                <Link href="/portfolio">Voir tous nos projets</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <Contact />

        <Footer />
      </main>
    </PageTransition>
  )
}

function ServicesGrid() {
  const [open, setOpen] = React.useState(new Set<number>())

  const toggle = (idx: number) => {
    const next = new Set(open)
    if (next.has(idx)) next.delete(idx)
    else next.add(idx)
    setOpen(next)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {servicesData.map((s, i) => {
        const isOpen = open.has(i)
        return (
          <div
            key={s.title}
            className={`rounded-2xl border bg-gray-900 shadow-lg hover:shadow-xl p-0 overflow-hidden transition-all duration-300 ${isOpen ? 'border-white shadow-2xl' : 'border-gray-700'}`}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => toggle(i)}
              className="w-full text-left p-4 sm:p-6 lg:p-8 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full grid place-items-center bg-white text-black mb-4 sm:mb-6 text-lg sm:text-xl">★</div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 font-semibold text-white leading-tight">{s.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{s.desc}</p>
                </div>
                <svg className={`mt-1 size-6 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
            <div className={`px-8 pb-6 transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              {isOpen && (
                <ul className="mt-2 space-y-3 text-gray-300">
                  {s.subs.map((sub) => (
                    <li key={sub} className="flex items-center gap-3">
                      <span className="size-2 rounded-full bg-white" />
                      <Link 
                        href={`/projects/${encodeURIComponent(sub)}`}
                        className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={`h-1 w-full transition-colors ${isOpen ? 'bg-white' : 'bg-transparent'}`} />
          </div>
        )
      })}
    </div>
  )
}