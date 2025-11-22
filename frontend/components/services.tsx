import { Home, Camera, ShoppingBag, Palette, Briefcase, Coffee, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const services = [
  {
    icon: Home,
    title: "Appartement / Maison",
    description: "Chambre, salon, cuisine - Des espaces de vie harmonieux et fonctionnels",
    subcategories: ["Chambre", "Salon", "Cuisine"]
  },
  {
    icon: Camera,
    title: "Studio créatif",
    description: "Photo, influenceur, podcast, gaming - Espaces optimisés pour créateurs",
    subcategories: ["Photo", "Influenceur", "Podcast", "Gaming"]
  },
  {
    icon: ShoppingBag,
    title: "Boutique",
    description: "Vêtements, accessoires, parfumerie - Retail design qui valorise vos produits",
    subcategories: ["Vêtements", "Accessoires", "Parfumerie"]
  },
  {
    icon: Palette,
    title: "Galerie d'art",
    description: "Exposition et galerie - Espaces qui magnifient les œuvres",
    subcategories: ["Exposition", "Galerie"]
  },
  {
    icon: Briefcase,
    title: "Bureau & Coworking",
    description: "Espaces de travail inspirants et productifs",
    subcategories: ["Bureau", "Coworking"]
  },
  {
    icon: Coffee,
    title: "Restaurant & Café",
    description: "Fast-food, café, lounge - Ambiances qui fidélisent",
    subcategories: ["Fast-food", "Café", "Lounge"]
  },
  {
    icon: Building2,
    title: "Pharmacie & Agence",
    description: "Espaces professionnels accueillants et fonctionnels",
    subcategories: ["Pharmacie", "Agence"]
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-balance">Nos services</h2>
          <div className="w-24 h-px bg-accent mx-auto" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une expertise complète pour tous vos projets d'aménagement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent"
            >
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <service.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-medium">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.subcategories.map((subcategory, subIndex) => (
                    <Link
                      key={subIndex}
                      href={`/projects/${encodeURIComponent(subcategory)}`}
                      className="text-sm px-3 py-1 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {subcategory}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
