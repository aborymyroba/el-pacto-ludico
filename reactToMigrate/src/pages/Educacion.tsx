import { BookOpenText, Quote, ChevronRight, XCircle, CheckCircle2, Swords, History, BookMarked, BrainCircuit, Sparkles } from "lucide-react"

const ENTRY = {
  entryNumber: 5,
  word: "Inane",
  pronunciation: "/i-NA-ne/",
  grammarCategory: "adjetivo (invariable en cuanto al género: un argumento inane, una discusión inane).",
  meaning: [
    "Inane significa vacío de contenido, de sentido, de sustancia o de valor intelectual.",
    "No describe algo simplemente aburrido o malo; señala que carece de verdadera entidad."
  ],
  valueAdd: {
    comparisons: [
      "La conversación fue tonta.",
      "La conversación fue superficial.",
      "La conversación fue inútil."
    ],
    explanation: "Cada una comunica algo distinto. Ahora observa:\n\n«La conversación fue inane.»\n\nAquí no afirmas solo que fue superficial o poco interesante. Dices que carecía de contenido significativo, que no produjo ninguna idea digna de conservar."
  },
  etymology: {
    root: "Proviene del latín inanis, que significa: «vacío», «hueco», «desprovisto de contenido».",
    verb: "De esa misma raíz procede el verbo latino inanire: vaciar.",
    conclusion: "La imagen es muy poderosa. No es que algo sea malo. Es que está vacío."
  },
  lexicalFamily: [
    {
      word: "Inanidad",
      type: "sustantivo",
      desc: "Estado o cualidad de lo inane.",
      example: "La inanidad del debate terminó por cansar al público."
    },
    {
      word: "Inanemente",
      type: "adverbio",
      desc: "Existe, aunque es muy poco frecuente. En la práctica, suele preferirse otra construcción.",
      example: "Respondió inanemente, repitiendo lugares comunes."
    }
  ],
  verbs: {
    desc: "No existe «inanar» ni «inanecer». Cuando queremos expresar la idea usamos perífrasis:",
    list: [
      "quedar vacío de contenido",
      "vaciar de significado",
      "despojar de sustancia"
    ]
  },
  collocations: [
    "discusión inane",
    "polémica inane",
    "argumento inane",
    "discurso inane",
    "retórica inane",
    "crítica inane",
    "conversación inane"
  ],
  rival: {
    word: "Superficial",
    rivalDesc: "Puede significar: poco profundo, ligero, insuficiente. Pero todavía puede contener alguna idea.",
    mainDesc: "Va un paso más allá. Implica que no hay verdadero contenido.",
    conclusion: "Una conferencia puede ser superficial. Otra puede ser directamente inane."
  },
  mistakes: [
    {
      mistake: "Usarla como sinónimo de «aburrido».",
      correction: "No necesariamente. Un programa de televisión puede ser muy entretenido y, sin embargo, perfectamente inane."
    },
    {
      mistake: "Confundirla con «vacío» en sentido físico.",
      correction: "No. Siempre se refiere al contenido intelectual, moral, argumentativo o simbólico."
    }
  ],
  examples: [
    { context: "Conversación cotidiana", text: "Prefiero una conversación breve pero sustanciosa antes que dos horas de charla inane." },
    { context: "Ensayo", text: "La discusión pública suele degradarse cuando el intercambio de razones es sustituido por una retórica inane." },
    { context: "Contexto institucional", text: "Un proceso participativo pierde legitimidad cuando se convierte en un ejercicio inane, incapaz de influir en las decisiones." },
    { context: "Literatura", text: "Las palabras llenaban la habitación, pero todas parecían inanes, como ecos de ideas que nunca habían llegado a existir." }
  ],
  whyKeep: {
    intro: "Porque vivimos rodeados de información. Y uno de los mayores desafíos contemporáneos consiste en distinguir entre lo complejo, lo falso, lo superficial y lo inane.",
    contrast: "No todo lo superficial es inane. No todo lo inane es superficial.",
    conclusion: "Cuando incorporas esta palabra, ganas una categoría crítica muy útil para analizar conversaciones, discursos, artículos o incluso tus propios textos."
  },
  observation: "Creo que esta palabra conecta muy bien con tu interés por la precisión. Imagina dos críticas distintas:\n\n«Ese informe es malo.»\n\n«Ese informe resulta inane.»\n\nLa segunda no juzga únicamente la calidad. Identifica el problema: la ausencia de contenido significativo. Es una crítica más analítica y, por tanto, más útil.",
  memorablePhrase: "La elocuencia puede impresionar; el contenido convence. Cuando falta este último, el discurso se vuelve inane."
}

export function Educacion() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-primary scale-150 transform translate-x-1/4 -translate-y-1/4">
          <path d="M50 0 C60 40 100 50 100 50 C60 60 50 100 50 100 C40 60 0 50 0 50 C40 40 50 0 50 0 Z" fill="currentColor" />
        </svg>
      </div>

      <article className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <header className="mb-16 text-center border-b border-border/50 pb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-border bg-card rounded-full mb-8">
            <BookOpenText size={16} className="text-primary" />
            <span className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground/80">
              Arsenal de Precisión Lingüística · Entrada #{ENTRY.entryNumber}
            </span>
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl text-primary mb-6 capitalize tracking-tight">
            {ENTRY.word}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 items-center font-display text-foreground/70">
            <span className="text-xl md:text-2xl italic bg-card px-4 py-1 rounded-sm border border-border">{ENTRY.pronunciation}</span>
            <span className="w-2 h-2 rounded-full bg-primary/50 hidden md:block" />
            <span className="text-sm md:text-base tracking-wider uppercase text-foreground/60">{ENTRY.grammarCategory}</span>
          </div>
        </header>

        {/* Content Body */}
        <div className="space-y-20 font-light text-lg md:text-xl text-foreground/80 leading-relaxed">
          
          {/* Significado */}
          <section>
            <h2 className="font-display text-3xl text-foreground mb-6 flex items-center gap-4">
              <BookMarked className="text-primary" size={28} /> Significado
            </h2>
            <div className="space-y-4">
              {ENTRY.meaning.map((text, i) => (
                <p key={i} className={i === 0 ? "text-2xl text-foreground font-normal leading-snug" : ""}>
                  {text}
                </p>
              ))}
            </div>
          </section>

          {/* Qué aporta */}
          <section className="bg-card/50 border border-border/50 p-8 md:p-10 rounded-sm">
            <h2 className="font-display text-2xl text-primary mb-6 flex items-center gap-3">
              <Sparkles size={24} /> ¿Qué aporta que no aporten otras palabras?
            </h2>
            <p className="mb-6">Piensa en estas frases:</p>
            <ul className="space-y-3 mb-8 pl-6 border-l-2 border-primary/30">
              {ENTRY.valueAdd.comparisons.map((comp, i) => (
                <li key={i} className="italic text-foreground/70">«{comp}»</li>
              ))}
            </ul>
            <div className="space-y-4 whitespace-pre-line text-foreground/90 font-medium">
              {ENTRY.valueAdd.explanation}
            </div>
          </section>

          {/* Etimología */}
          <section>
            <h2 className="font-display text-3xl text-foreground mb-6 flex items-center gap-4">
              <History className="text-primary" size={28} /> Etimología
            </h2>
            <div className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed">
              <p>{ENTRY.etymology.root}</p>
              <p>{ENTRY.etymology.verb}</p>
              <blockquote className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-sm not-italic mt-6">
                <p className="font-display text-xl text-foreground mb-0">{ENTRY.etymology.conclusion}</p>
              </blockquote>
            </div>
          </section>

          {/* Familia Léxica & Verbos */}
          <div className="grid md:grid-cols-2 gap-12">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Familia léxica</h2>
              <div className="space-y-6">
                {ENTRY.lexicalFamily.map((item, i) => (
                  <div key={i} className="bg-card border border-border p-5">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="font-display text-xl text-primary">{item.word}</h3>
                      <span className="text-xs uppercase tracking-widest text-foreground/50">{item.type}</span>
                    </div>
                    <p className="text-sm md:text-base mb-3">{item.desc}</p>
                    {item.example && (
                      <p className="text-sm italic text-foreground/60 border-l-2 border-border pl-3">«{item.example}»</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">¿Existe un verbo?</h2>
              <p className="mb-4 text-base">{ENTRY.verbs.desc}</p>
              <ul className="space-y-3">
                {ENTRY.verbs.list.map((verb, i) => (
                  <li key={i} className="flex items-center gap-3 text-base">
                    <ChevronRight size={16} className="text-primary" /> {verb}
                  </li>
                ))}
              </ul>

              <h2 className="font-display text-2xl text-foreground mb-4 mt-12">Colocaciones naturales</h2>
              <div className="flex flex-wrap gap-2">
                {ENTRY.collocations.map((col, i) => (
                  <span key={i} className="px-3 py-1 bg-card border border-border text-sm rounded-full">
                    {col}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* La Palabra Rival */}
          <section>
            <h2 className="font-display text-3xl text-foreground mb-8 flex items-center gap-4">
              <Swords className="text-primary" size={28} /> La palabra rival
            </h2>
            <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
              <div className="bg-background p-8 md:p-10">
                <h3 className="font-display text-2xl text-foreground/50 mb-4">{ENTRY.rival.word}</h3>
                <p className="text-base text-foreground/70">{ENTRY.rival.rivalDesc}</p>
              </div>
              <div className="bg-primary/5 p-8 md:p-10">
                <h3 className="font-display text-2xl text-primary mb-4">{ENTRY.word}</h3>
                <p className="text-base text-foreground/90 font-medium">{ENTRY.rival.mainDesc}</p>
              </div>
            </div>
            <p className="mt-6 text-center font-display text-xl text-foreground/80 italic">
              {ENTRY.rival.conclusion}
            </p>
          </section>

          {/* Errores Frecuentes */}
          <section className="bg-[#1a1412] p-8 md:p-10 border border-red-900/30">
            <h2 className="font-display text-2xl text-red-400 mb-8 flex items-center gap-3">
              <XCircle size={24} /> Errores frecuentes
            </h2>
            <div className="space-y-8">
              {ENTRY.mistakes.map((mistake, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <XCircle className="text-red-500/50 mt-1 shrink-0" size={20} />
                  <div>
                    <h3 className="text-foreground font-medium mb-2">{mistake.mistake}</h3>
                    <p className="text-base text-foreground/70">{mistake.correction}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ejemplos */}
          <section>
            <h2 className="font-display text-3xl text-foreground mb-8 flex items-center gap-4">
              <Quote className="text-primary" size={28} /> Ejemplos de uso
            </h2>
            <div className="grid gap-6">
              {ENTRY.examples.map((ex, i) => (
                <div key={i} className="bg-card p-6 border-l-2 border-primary/50 flex flex-col md:flex-row gap-4 md:items-center">
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold md:w-48 shrink-0">
                    {ex.context}
                  </span>
                  <p className="text-lg italic text-foreground/80">«{ex.text}»</p>
                </div>
              ))}
            </div>
          </section>

          {/* Reflexiones */}
          <section className="border-t border-border pt-16">
            <h2 className="font-display text-3xl text-foreground mb-6 flex items-center gap-4">
              <BrainCircuit className="text-primary" size={28} /> ¿Por qué conservar esta palabra?
            </h2>
            <div className="space-y-6">
              <p>{ENTRY.whyKeep.intro}</p>
              <p className="font-display text-xl text-primary italic text-center py-6">
                {ENTRY.whyKeep.contrast}
              </p>
              <p>{ENTRY.whyKeep.conclusion}</p>
            </div>

            <div className="mt-12 bg-card/30 p-8 border border-border/50">
              <h3 className="text-xs uppercase tracking-widest text-primary mb-4 font-semibold">Una observación interesante</h3>
              <p className="whitespace-pre-line text-base text-foreground/80 leading-relaxed">
                {ENTRY.observation}
              </p>
            </div>
          </section>

          {/* Frase memorable */}
          <section className="text-center py-20">
            <div className="w-16 h-px bg-primary/50 mx-auto mb-10" />
            <blockquote className="font-display text-3xl md:text-5xl text-foreground leading-tight max-w-4xl mx-auto">
              «{ENTRY.memorablePhrase}»
            </blockquote>
            <div className="w-16 h-px bg-primary/50 mx-auto mt-10" />
          </section>

        </div>
      </article>
    </div>
  )
}
