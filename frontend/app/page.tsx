"use client"

import React from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Contact } from "@/components/contact"

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
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section id="accueil" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="/modern-minimalist-interior-design-living-room-with.jpg"
            alt="Design intérieur haut de gamme"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/70 to-background" />
        </div>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
            Donnez vie à vos espaces avec DESIGNAL
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Studio créatif de design et de décoration d'intérieur. L'art de sublimer les espaces.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button asChild className="bg-[#022B31] text-white hover:bg-[#0A4950] font-medium px-8 py-6 text-lg shadow-lg">
              <Link href="#services">Découvrir nos services</Link>
            </Button>
            <Button variant="outline" asChild className="border-2 border-[#022B31] text-[#022B31] hover:bg-[#022B31] hover:text-white font-medium px-8 py-6 text-lg">
              <Link href="#contact">Demander un devis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section id="a-propos" className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-semibold text-white">
              À propos
            </h2>
            <div className="w-20 h-1 bg-white"></div>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              DESIGNAL est un studio créatif spécialisé dans l'illustration 3D et l'aménagement d'espaces modernes. Nous transformons vos idées en environnements élégants et fonctionnels.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="text-center p-4 bg-gray-800 rounded-xl border border-gray-700">
                <div className="text-2xl font-bold text-white">150+</div>
                <div className="text-sm text-gray-300">Projets réalisés</div>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-xl border border-gray-700">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-gray-300">Clients satisfaits</div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl border border-gray-700">
              <img src="/luxury-modern-living-room.png" className="w-full h-full object-cover" alt="Intérieur premium" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 bg-gray-950 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl md:text-6xl font-semibold text-white">Nos services</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">Une expertise complète pour tous vos projets d'aménagement</p>
          </div>
          <ServicesGrid />
        </div>
      </section>

      {/* Styles */}
      <section id="styles" className="py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl md:text-6xl font-semibold text-white">Nos styles</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
            <p className="text-gray-300 text-xl">Des univers variés pour répondre à toutes vos envies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {name:"Casual", img:"/casual-interior-design-cozy-living-room.jpg"},
              {name:"Moderne", img:"/modern-minimalist-interior-design.jpg"},
              {name:"Tradi-moderne", img:"/traditional-modern-interior-design-blend.jpg"},
              {name:"Artistique", img:"/artistic-interior-design-gallery-space.jpg"},
              {name:"Gaming & Tech", img:"/gaming-setup-modern-tech-interior.jpg"},
              {name:"Hypebeast & Streetwear", img:"/streetwear-boutique-modern-interior.jpg"},
            ].map((st,i)=> (
              <div key={st.name} className="group overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img src={st.img} alt={st.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#022B31]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white">{st.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-32 bg-gray-950 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl md:text-6xl font-semibold text-white">Portfolio</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
            <p className="text-gray-300 text-xl">Découvrez nos réalisations et laissez-vous inspirer</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              // Skeleton loading
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="aspect-[4/3] rounded-md bg-card/60 animate-pulse" />
              ))
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={project.images?.[0]?.url?.startsWith('/uploads') ? `http://localhost:5001${project.images[0].url}` : project.images?.[0]?.url || '/placeholder.jpg'} 
                    alt={project.images?.[0]?.alt || project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    onError={(e) => { e.currentTarget.src = '/placeholder.jpg' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-xl mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm">{project.category}</p>
                    {project.subcategory && <p className="text-gray-400 text-xs mt-1">{project.subcategory}</p>}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-400">
                Aucun projet disponible pour le moment
              </div>
            )}
          </div>
        </div>
      </section>

      <Contact />

      <Footer />
    </main>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              className="w-full text-left p-8 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="w-12 h-12 rounded-full grid place-items-center bg-white text-black mb-6 text-xl">★</div>
                  <h3 className="text-2xl mb-3 font-semibold text-white">{s.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{s.desc}</p>
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