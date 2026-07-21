import {
  BookOpen,
  Dices,
  Library,
  Sword,
  ChevronRight,
  CircleDollarSign,
} from "lucide-react"
import { useEffect } from "react"
import { useLocation } from "react-router"

export function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [hash])

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-10" />
          <img
            src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2000&auto=format&fit=crop"
            alt="Roman Colosseum"
            className="w-full h-full object-cover object-center opacity-40 grayscale-[20%]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] text-primary">
                Uniendo Mundos
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 tracking-tight">
              <span className="block text-foreground">El Pacto</span>
              <span className="block text-primary italic">Lvdico</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-10 max-w-lg font-light">
              Explora las fronteras de la imaginación a través de los juegos de
              mesa, la narrativa de rol, la literatura clásica y la educación
              lúdica.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#explorar"
                className="px-8 py-4 bg-primary text-primary-foreground font-display tracking-widest uppercase text-sm font-semibold hover:bg-white hover:text-primary-foreground transition-colors duration-300 flex items-center gap-2"
              >
                Descubrir <ChevronRight size={16} />
              </a>
              <a
                href="#nosotros"
                className="px-8 py-4 border border-border text-foreground font-display tracking-widest uppercase text-sm hover:border-primary hover:text-primary transition-colors duration-300"
              >
                La Orden
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Areas */}
      <section id="explorar" className="py-32 relative z-10 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="font-display text-3xl md:text-5xl mb-6 text-foreground">
              Los Cuatro Pilares
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
            <p className="text-foreground/70 text-lg font-light leading-relaxed">
              Nuestro pacto se sostiene sobre cuatro disciplinas fundamentales,
              cada una diseñada para enriquecer la mente y el espíritu.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PillarCard
              id="mesa"
              title="Juegos de Mesa"
              icon={Dices}
              description="Estrategia, táctica y convivencia. Una colección curada de experiencias sobre el tablero."
              image="https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=800&auto=format&fit=crop"
            />
            <PillarCard
              id="rol"
              title="Juegos de Rol"
              icon={Sword}
              description="Narrativa compartida. Forja tu propio destino en mundos de fantasía, ciencia ficción y misterio."
              image="https://images.unsplash.com/photo-1708863827400-00a5c21c10f7?q=80&w=800&auto=format&fit=crop"
            />
            <PillarCard
              id="literatura"
              title="Literatura"
              icon={BookOpen}
              description="Las crónicas del pasado y ficciones del futuro. Textos que inspiran nuestras aventuras."
              image="https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=800&auto=format&fit=crop"
            />
            <PillarCard
              id="educacion"
              title="Educación"
              icon={Library}
              description="El juego como herramienta de aprendizaje. Talleres, seminarios y academias lúdicas."
              image="https://images.unsplash.com/photo-1569759276108-31b8e7e43e7b?q=80&w=800&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Quote / Interstitial */}
      <section className="py-32 relative border-y border-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1603199766980-fdd4ac568a11?q=80&w=2000&auto=format&fit=crop"
            alt="Roman Architecture Texture"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <CircleDollarSign
            size={48}
            className="text-primary mx-auto mb-8 opacity-50"
            strokeWidth={1}
          />
          <blockquote className="font-display text-3xl md:text-5xl leading-tight text-foreground mb-8">
            "En la mesa de juego, como en el senado, se revelan los verdaderos
            temperamentos de los hombres."
          </blockquote>
          <cite className="text-primary tracking-[0.3em] uppercase text-sm font-display not-italic">
            — El Primer Edicto
          </cite>
        </div>
      </section>
    </>
  )
}

function PillarCard({
  id,
  title,
  description,
  icon: Icon,
  image,
}: {
  id: string
  title: string
  description: string
  icon: React.ElementType
  image: string
}) {
  return (
    <div
      id={id}
      className="group relative bg-card border border-border overflow-hidden flex flex-col h-[480px] transition-colors duration-500 hover:border-primary/50 scroll-mt-32"
    >
      <div className="h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 grayscale-[50%] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
      </div>

      <div className="p-8 flex-1 flex flex-col relative z-20 -mt-8">
        <div className="w-12 h-12 bg-background border border-border flex items-center justify-center rounded-full mb-6 text-primary shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300">
          <Icon size={20} />
        </div>
        <h3 className="font-display text-2xl text-foreground mb-4">{title}</h3>
        <p className="text-foreground/60 leading-relaxed font-light mb-6 flex-1 text-sm">
          {description}
        </p>
        <a
          href={id === "educacion" ? "/educacion" : `/#${id}`}
          className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-widest font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        >
          Explorar <ChevronRight size={14} />
        </a>
      </div>
    </div>
  )
}
