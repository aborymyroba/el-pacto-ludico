# Exploration: React-to-Astro Migration with Full SEO

## 1. Migration Scope — Complete Mapping

### Route Mapping (React Router → Astro File-Based Routing)

| React Route | File | Astro Equivalent | Path |
|---|---|---|---|
| `/` (index) | `Home.tsx` | `index.astro` | `src/pages/index.astro` |
| `/educacion` | `Educacion.tsx` | `educacion.astro` | `src/pages/educacion.astro` |

### Component Mapping

| React Component | Type | Astro Equivalent | Notes |
|---|---|---|---|
| `Layout.tsx` | Shell (nav + footer + outlet) | `src/layouts/Layout.astro` | `<slot />` replaces `<Outlet />` |
| `Home.tsx` | Page | `src/pages/index.astro` | No React needed — pure static HTML |
| `Educacion.tsx` | Page (data-driven) | `src/pages/educacion.astro` | Inline `ENTRY` object → frontmatter data |
| `PillarCard` (in Home.tsx) | Sub-component | `src/components/PillarCard.astro` | Reusable Astro component |

### Behavior Mapping

| React Pattern | Astro Equivalent | Complexity |
|---|---|---|
| `useState(false)` for scroll detection | Vanilla `<script>` with `addEventListener('scroll')` | Low |
| `useState(false)` for mobile menu | Vanilla `<script>` with class toggle | Low |
| `useEffect` for hash scroll-to | `<script>` with `DOMContentLoaded` + `scrollIntoView` | Low |
| `useLocation()` for active nav | Astro `Astro.url.pathname` in frontmatter | Low |
| `new Date().getFullYear()` in footer | `new Date().getFullYear()` in `.astro` frontmatter | Trivial |
| React Router `<Link>` / `<a>` | Standard `<a href="...">` | Trivial |

### Dependencies to REMOVE

- `react` / `react-dom` — not needed
- `react-router` — replaced by file-based routing
- `lucide-react` — replaced by inline SVGs or `astro-icon`
- `@vitejs/plugin-react` — not needed
- `@tailwindcss/vite` — Astro has its own Tailwind integration

### Dependencies to ADD

- `@astrojs/tailwind` — Tailwind v4 integration
- `tailwindcss` (v4) — CSS engine
- `astro-icon` (optional) — for Lucide icons, OR inline SVGs
- `@astrojs/sitemap` — XML sitemap generation
- `sharp` — image optimization (Astro peer dep)

## 2. SEO Plan — Per-Page Strategy

### Critical: Figma Config Conflict

The React source's `.figma/make/site.json` has `"robots": { "index": false }`. This was Figma Make's default — it MUST be overridden to `index: true` for the production Astro site.

### Global SEO (Layout.astro `<head>`)

```html
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Per-page (override via frontmatter props) -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={Astro.url.href} />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={Astro.url.href} />
  <meta property="og:locale" content="es_AR" />
  <meta property="og:site_name" content="El Pacto Lvdico" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</head>
```

### Per-Page SEO Metadata

| Page | Title | Description | OG Image | Structured Data |
|---|---|---|---|---|
| `/` (Home) | `El Pacto Lvdico — Juegos de Mesa, Rol, Literatura y Educación` | `Explora las fronteras de la imaginación a través de los juegos de mesa, la narrativa de rol, la literatura clásica y la educación lúdica.` | `/images/og-home.jpg` (Colosseum) | `Organization` JSON-LD |
| `/educacion` | `Inane — Arsenal de Precisión Lingüística · Entrada #5 — El Pacto Lvdico` | `Descubre el significado, etimología y uso preciso de "inane": vacío de contenido, de sentido, de sustancia.` | `/images/og-educacion.jpg` | `Article` JSON-LD |

### JSON-LD Structured Data

**Home page — Organization:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "El Pacto Lvdico",
  "url": "https://pactolvdico.com",
  "description": "Preservando la tradición del juego, la historia y el conocimiento para las generaciones venideras.",
  "logo": "https://pactolvdico.com/favicon.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "senado@pactolvdico.com",
    "contactType": "customer service"
  }
}
```

**Educacion page — Article:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Inane — Arsenal de Precisión Lingüística",
  "author": { "@type": "Organization", "name": "El Pacto Lvdico" },
  "publisher": { "@type": "Organization", "name": "El Pacto Lvdico" },
  "datePublished": "2025-01-01",
  "inLanguage": "es",
  "description": "Significado, etimología y uso preciso de inane."
}
```

### Additional SEO Files

- `public/robots.txt` — `User-agent: *` / `Allow: /` / `Sitemap: https://pactolvdico.com/sitemap-index.xml`
- `@astrojs/sitemap` integration — auto-generates XML sitemap at build time
- Semantic HTML: proper `<header>`, `<main>`, `<nav>`, `<footer>`, `<article>` landmarks
- Heading hierarchy: single `<h1>` per page, sequential `<h2>`→`<h3>`
- All images need descriptive `alt` text (already present in React source)

## 3. Asset Plan

### Images (6 Unsplash URLs → local)

| Usage | Current URL | Local Path | Notes |
|---|---|---|---|
| Hero background | `photo-1552832230-c0197dd311b5` | `public/images/hero-colosseum.jpg` | Full-width, 2000px |
| Mesa pillar | `photo-1605142859862-978be7eba909` | `public/images/pillar-mesa.jpg` | Card, 800px |
| Rol pillar | `photo-1708863827400-00a5c21c10f7` | `public/images/pillar-rol.jpg` | Card, 800px |
| Literatura pillar | `photo-1491841573634-28140fc7ced7` | `public/images/pillar-literatura.jpg` | Card, 800px |
| Educacion pillar | `photo-1569759276108-31b8e7e43e7b` | `public/images/pillar-educacion.jpg` | Card, 800px |
| Quote background | `photo-1603199766980-fdd4ac568a11` | `public/images/quote-texture.jpg` | Full-width, 2000px |

**Decision needed**: Astro `<Image>` component vs plain `<img>` for Unsplash CDN.
- **Local `<img>`** (simpler, no build step, CDN already optimized): recommended for this project since Unsplash already serves optimized images with `?w=` params.
- **Astro `<Image>`** (build-time optimization, WebP conversion): better for self-hosted images but adds build complexity.

**Recommendation**: Keep `<img>` tags with local files in `public/images/`. The Unsplash CDN URLs already include optimization params. For future self-hosted images, switch to Astro `<Image>`.

### Fonts (already loaded via Google Fonts CSS)

Current `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap')` works fine in Astro.

**Option A**: Keep Google Fonts CDN import (current, simplest)
**Option B**: Self-host fonts for better performance (download .woff2 to `public/fonts/`)

**Recommendation**: Keep Google Fonts CDN for now — it's cached, fast, and the site is small. Self-hosting is a future optimization.

### Icons (Lucide React → alternatives)

React uses: `Menu`, `X`, `CircleDollarSign`, `BookOpen`, `Dices`, `Library`, `Sword`, `ChevronRight`, `BookOpenText`, `Quote`, `XCircle`, `CheckCircle2`, `Swords`, `History`, `BookMarked`, `BrainCircuit`, `Sparkles`

**Options**:
1. **Inline SVGs** (zero deps, full control) — recommended. Extract the specific SVG paths from Lucide and inline them directly.
2. **`astro-icon` + Lucide** — adds a dependency but auto-resolves.
3. **SVG sprite sheet** — create `public/icons.svg` with `<symbol>` definitions.

**Recommendation**: Option 1 — inline SVGs. Only 18 unique icons needed, all from Lucide's open-source set. Zero runtime cost, works perfectly with Astro's static model.

## 4. Technical Decisions

### Decision 1: Tailwind v4 Setup

The React project uses Tailwind v4's CSS-first config with `@theme inline`. Astro's Tailwind integration needs investigation:
- `@astrojs/tailwind` may or may not support v4 yet
- Alternative: Use `@tailwindcss/vite` plugin directly in Astro (Astro supports Vite plugins)
- Alternative: Use Tailwind v4 via PostCSS (if Astro's built-in PostCSS works)

**Action needed**: Test which Tailwind v4 approach works with Astro 7.1.3.

### Decision 2: No React Islands Needed

Every "interactive" element in the React app maps cleanly to vanilla JS:
- Scroll detection: `addEventListener('scroll')` in a `<script>` tag
- Mobile menu toggle: `classList.toggle()` in a `<script>` tag
- Hash scroll-to: `scrollIntoView()` in a `<script>` tag

**Verdict**: This site needs ZERO React islands. It's 100% static HTML + vanilla JS.

### Decision 3: Data Architecture for Educacion

The `ENTRY` object in `Educacion.tsx` is hardcoded inline data. Options:
- **Keep inline** in `.astro` frontmatter (simplest, current structure is one article)
- **Move to Content Collection** (Astro's content layer) — better for future articles

**Recommendation**: Start inline (match current React behavior). When more articles are added, migrate to Astro Content Collections.

### Decision 4: Layout Props Pattern

Layout needs per-page `<title>`, `<meta description>`, etc. In Astro:

```astro
---
interface Props {
  title: string;
  description: string;
  ogImage?: string;
}
const { title, description, ogImage = '/images/og-default.jpg' } = Astro.props;
---
<html lang="es">
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
    ...
  </head>
  <body>
    <nav>...</nav>
    <main><slot /></main>
    <footer>...</footer>
  </body>
</html>
```

## 5. Risks and Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| Tailwind v4 not compatible with Astro's integration | Medium | Use `@tailwindcss/vite` plugin directly; fall back to Tailwind v3 if needed |
| Figma `robots: index: false` leaks to production | High | Delete `.figma/make/site.json`; add explicit `robots.txt` allowing all |
| Scroll-to-hash breaks on page load (SPA → MPA) | Low | Vanilla JS `DOMContentLoaded` handler with `setTimeout` for layout |
| No `og-image` assets exist yet | Medium | Use hero colosseum image as default OG image; create proper ones later |
| Google Fonts FOUT (flash of unstyled text) | Low | Add `font-display: swap` (already in Google Fonts URL) |
| Footer `new Date().getFullYear()` — React JSX → Astro | Trivial | Direct JS expression in `.astro` works identically |
| `src/` contains dead React `.tsx` files | Low | Delete them during migration (Layout.tsx, Home.tsx, Educacion.tsx, main.tsx, vite-env.d.ts) |

## 6. Estimated Complexity: LOW-MODERATE

**Reasoning:**
- Only 2 pages and 1 layout component to migrate
- No complex state management, no API calls, no auth
- No React islands needed — everything is vanilla JS
- Tailwind theme tokens transfer directly (same v4 CSS syntax)
- The main complexity is SEO setup (structured data, sitemap, OG tags)
- The HTML/CSS is already well-structured in the React source

**Estimated effort**: 2-3 hours of focused implementation

## 7. Recommended Approach — Phase-by-Phase

### Phase 1: Project Foundation (15 min)
1. Configure `astro.config.mjs` with Tailwind v4 (test `@tailwindcss/vite` or `@astrojs/tailwind`)
2. Install dependencies: `tailwindcss`, `@astrojs/sitemap`
3. Set up `src/index.css` (copy from React source — identical)
4. Delete dead React files: `src/main.tsx`, `src/vite-env.d.ts`, `src/components/Layout.tsx`, `src/pages/Home.tsx`, `src/pages/Educacion.tsx`
5. Delete root `index.html` (Vite entry point, not needed in Astro)

### Phase 2: Layout + Global SEO (30 min)
1. Create `src/layouts/Layout.astro` with:
   - Full `<head>` with per-page SEO props (title, description, OG, Twitter, canonical)
   - `<html lang="es">`
   - Nav (desktop + mobile) with vanilla JS scroll detection and mobile menu
   - Footer with current year
   - Structured data script tag (Organization for home, Article for educacion)
2. Create inline SVG icon components or a shared icon helper

### Phase 3: Home Page (30 min)
1. Convert `Home.tsx` → `src/pages/index.astro`
2. Extract `PillarCard` → `src/components/PillarCard.astro`
3. Copy all 6 images to `public/images/`
4. Add hash-scroll vanilla JS script
5. SEO: title, description, OG image, Organization JSON-LD

### Phase 4: Educacion Page (30 min)
1. Convert `Educacion.tsx` → `src/pages/educacion.astro`
2. Move `ENTRY` object to frontmatter
3. Convert JSX loops to `.map()` in Astro template syntax
4. SEO: title, description, OG image, Article JSON-LD

### Phase 5: SEO & Polish (30 min)
1. Create `public/robots.txt`
2. Configure `@astrojs/sitemap` in `astro.config.mjs`
3. Add favicon/apple-touch-icon references
4. Verify heading hierarchy (h1 → h2 → h3)
5. Verify all landmarks (nav, main, article, footer)
6. Test with Lighthouse for SEO score

### Phase 6: Cleanup (15 min)
1. Delete `reactToMigrate/` folder (or move to archive)
2. Delete `src/main.tsx`, `src/vite-env.d.ts`
3. Update `package.json` name from `astro-temp` to `elpactolvdico`
4. Final build test: `astro build` succeeds with 0 errors
5. Verify sitemap generation in `dist/`

## Current State Assessment

**Astro project state**: Scaffolding only. The `src/pages/index.astro` is the default Astro template (literally just `<h1>Astro</h1>`). No Tailwind configured, no components, no layouts.

**React source state**: Complete 2-page SPA with:
- Rich visual design (Roman theme, dark palette, serif fonts)
- 6 Unsplash images (external URLs)
- 18 unique Lucide icons
- Scroll-based nav styling
- Mobile menu with translate animation
- Hash-based scroll-to-section
- Hardcoded article data for "Inane" vocabulary entry

**Dead code in `src/`**: The React `.tsx` files were copied directly into the Astro `src/` but are completely inert — no React integration is configured in `astro.config.mjs`, no React dependencies in `package.json`. They serve as reference only.
