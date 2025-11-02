const portfolioImages = [
  "/luxury-modern-living-room.png",
  "/minimalist-bedroom.png",
  "/modern-kitchen.png",
  "/boutique-retail-interior-design.jpg",
  "/modern-restaurant-interior.png",
  "/office-workspace-interior-design.jpg",
  "/art-gallery-interior-design.jpg",
  "/cafe-interior-design-modern.jpg",
  "/gaming-room-interior-design.jpg",
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-balance">Portfolio</h2>
          <div className="w-24 h-px bg-accent mx-auto" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos réalisations et laissez-vous inspirer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {portfolioImages.map((image, index) => (
            <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer">
              <img
                src={image || "/placeholder.svg"}
                alt={`Portfolio ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
