import { Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#022B31] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-3xl font-light tracking-tight">DESIGNAL</h3>
              <p className="text-white/80 text-sm">L'art de sublimer les espaces.</p>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium uppercase tracking-wider">Navigation</h4>
              <nav className="flex flex-col space-y-2">
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Accueil
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Portfolio
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Contact
                </a>
              </nav>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium uppercase tracking-wider">Suivez-nous</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Pinterest"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-white/60 text-sm">© 2025 DESIGNAL - Tous droits réservés</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
