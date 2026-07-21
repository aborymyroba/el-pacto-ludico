import { useState, useEffect } from "react"
import { Outlet, Link, useLocation } from "react-router"
import {
  Menu,
  X,
  CircleDollarSign,
} from "lucide-react"

const navLinks = [
  { name: "Juegos de mesa", href: "/#mesa" },
  { name: "Juegos de Rol", href: "/#rol" },
  { name: "Literatura", href: "/#literatura" },
  { name: "Educación", href: "/educacion" },
]

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-border py-4 shadow-lg"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary text-primary transition-transform duration-500 group-hover:rotate-180 bg-background/50 backdrop-blur-sm">
              <CircleDollarSign size={24} strokeWidth={1.5} />
            </div>
            <span className="font-display font-semibold tracking-widest text-xl uppercase text-foreground group-hover:text-primary transition-colors">
              El Pacto Lvdico
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm tracking-widest uppercase font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-xl z-40 transition-transform duration-500 flex flex-col items-center justify-center gap-8 ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        } md:hidden`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-2xl tracking-widest uppercase text-foreground hover:text-primary transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-card pt-20 pb-10 border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <CircleDollarSign
                  size={32}
                  className="text-primary"
                  strokeWidth={1.5}
                />
                <span className="font-display text-2xl tracking-widest uppercase text-foreground">
                  El Pacto Lvdico
                </span>
              </div>
              <p className="text-foreground/60 leading-relaxed max-w-sm mb-8 font-light">
                Preservando la tradición del juego, la historia y el
                conocimiento para las generaciones venideras.
              </p>
            </div>

            <div>
              <h4 className="font-display text-primary tracking-widest uppercase text-sm mb-6">
                Secciones
              </h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-foreground/70 hover:text-primary transition-colors text-sm uppercase tracking-wider"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-primary tracking-widest uppercase text-sm mb-6">
                Contacto
              </h4>
              <ul className="space-y-4 text-sm text-foreground/70 font-light">
                <li>Roma, Antigua República</li>
                <li>Mensajes: senado@pactolvdico.com</li>
                <li>Palomas Mensajeras: Aceptadas</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest text-foreground/40">
            <p>
              &copy; {new Date().getFullYear()} El Pacto Lvdico. Todos los
              derechos reservados.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                Privacidad
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Términos
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
