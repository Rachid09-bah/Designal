export function About() {
  return (
    <section id="a-propos" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-balance">À propos</h2>
          <div className="w-24 h-px bg-accent mx-auto" />
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            DESIGNAL est un studio spécialisé dans l'illustration 3D de modèles et l'aménagement d'espaces modernes.
            Nous transformons vos idées en réalité visuelle, créant des environnements qui reflètent votre identité et
            subliment votre quotidien.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Notre expertise s'étend à divers domaines : appartements, studios, boutiques, restaurants, galeries d'art,
            bureaux, pharmacies et agences. Chaque projet est une œuvre unique, pensée avec soin et réalisée avec
            passion.
          </p>
        </div>
      </div>
    </section>
  )
}
