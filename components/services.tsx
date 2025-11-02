import { Home, Camera, ShoppingBag, Palette, Briefcase, Coffee, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Home,
    title: "Appartement / Maison",
    description: "Chambre, salon, cuisine - Des espaces de vie harmonieux et fonctionnels",
  },
  {
    icon: Camera,
    title: "Studio créatif",
    description: "Photo, influenceur, podcast, gaming - Espaces optimisés pour créateurs",
  },
  {
    icon: ShoppingBag,
    title: "Boutique",
    description: "Vêtements, accessoires, parfumerie - Retail design qui valorise vos produits",
  },
  {
    icon: Palette,
    title: "Galerie d'art",
    description: "Exposition et galerie - Espaces qui magnifient les œuvres",
  },
  {
    icon: Briefcase,
    title: "Bureau & Coworking",
    description: "Espaces de travail inspirants et productifs",
  },
  {
    icon: Coffee,
    title: "Restaurant & Café",
    description: "Fast-food, café, lounge - Ambiances qui fidélisent",
  },
  {
    icon: Building2,
    title: "Pharmacie & Agence",
    description: "Espaces professionnels accueillants et fonctionnels",
  },
]

export function Services() {
  return (
    <section className="py-24 md:py-32 bg-background">
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
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
