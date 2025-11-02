import { Card, CardContent } from "@/components/ui/card"

const styles = [
  {
    name: "Casual",
    description: "Confort et simplicité au quotidien",
    image: "/casual-interior-design-cozy-living-room.jpg",
  },
  {
    name: "Moderne",
    description: "Lignes épurées et élégance contemporaine",
    image: "/modern-minimalist-interior-design.jpg",
  },
  {
    name: "Tradi-moderne",
    description: "Fusion harmonieuse du classique et du contemporain",
    image: "/traditional-modern-interior-design-blend.jpg",
  },
  {
    name: "Artistique",
    description: "Expression créative et audace visuelle",
    image: "/artistic-interior-design-gallery-space.jpg",
  },
  {
    name: "Gaming & Tech",
    description: "Espaces high-tech pour passionnés",
    image: "/gaming-setup-modern-tech-interior.jpg",
  },
  {
    name: "Hypebeast & Streetwear",
    description: "Culture urbaine et style avant-gardiste",
    image: "/streetwear-boutique-modern-interior.jpg",
  },
]

export function Styles() {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-balance">Nos styles</h2>
          <div className="w-24 h-px bg-accent mx-auto" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des univers variés pour répondre à toutes vos envies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {styles.map((style, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border/50 hover:border-accent transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={style.image || "/placeholder.svg"}
                  alt={style.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-6 space-y-2">
                <h3 className="text-2xl font-medium">{style.name}</h3>
                <p className="text-muted-foreground">{style.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
