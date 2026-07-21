# Design: React-to-Astro Migration

## Technical Approach

Full static migration of 2-page React SPA to Astro 7.1.3 with zero React islands. Tailwind v4 via `@tailwindcss/vite` plugin (guaranteed v4 support). Content Collections for Educacion entries. All interactivity via inline vanilla JS `<script>` tags. SEO via Layout `<head>` props + JSON-LD + sitemap.

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|----------|---------|--------|-----------|
| Tailwind v4 integration | `@astrojs/tailwind` (v3-era), `@tailwindcss/vite` | `@tailwindcss/vite` | Direct Vite plugin, guaranteed v4 support, zero integration layer |
| SVG icons | `astro-icon` + Lucide, inline SVGs | Inline SVGs | 18 icons only, zero deps, works with static model |
| Content Collection config path | `src/content/config.ts` (legacy), `src/content.config.ts` | `src/content.config.ts` | Modern Astro convention since v5 |
| Image strategy | `<img>` local files, Astro `<Image>` | `<img>` in `public/` | Per proposal scope — no build-time optimization |
| Script architecture | Separate `.js` files, inline `<script>` | Inline in Layout | 3 small scripts (scroll, menu, hash), colocated with shell |
| Educacion data model | All in frontmatter, markdown-only | Structured frontmatter + prose markdown body | Complex nested data in frontmatter; observation + memorablePhrase as markdown prose |

## File Structure

```
src/
  pages/
    index.astro              # Home page
    educacion.astro          # Educacion listing page
    educacion/
      [slug].astro           # Dynamic entry template
  layouts/
    Layout.astro             # Shell: nav, footer, SEO head, scripts
  components/
    PillarCard.astro         # Reusable card component
  content.config.ts          # Content Collection schema
  content/
    educacion/
      inane.md               # First vocabulary entry
  index.css                  # Tailwind v4 theme (already exists, keep as-is)
public/
  images/
    hero-colosseum.jpg       # Hero background
    pillar-mesa.jpg          # Mesa pillar card
    pillar-rol.jpg           # Rol pillar card
    pillar-literatura.jpg    # Literatura pillar card
    pillar-educacion.jpg     # Educacion pillar card
    quote-texture.jpg        # Quote section background
  robots.txt                 # Allow all + sitemap ref
```

**Files to delete:** `src/main.tsx`, `src/vite-env.d.ts`, `src/pages/Home.tsx`, `src/pages/Educacion.tsx`, `src/components/Layout.tsx`

## Layout Architecture (`Layout.astro`)

**Props interface:**
```ts
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
}
```

**Head injection:** Per-page `title`, `description`, `ogImage` (default: `/images/hero-colosseum.jpg`), `ogType` (default: `website`). Canonical URL from `Astro.url.href`. Twitter Card `summary_large_image`. JSON-LD rendered via `<script type="application/ld+json">` — Layout receives an optional `jsonLd` prop or pages inject their own.

**Nav:** Fixed `<nav>` with 4 links. Scroll listener in `<script>` toggles classes on `#main-nav` when `scrollY > 20`. Mobile hamburger toggles `#mobile-menu` between `translate-y-0` and `-translate-y-full`.

**Scripts (all inline in Layout):**
1. **Scroll detection:** `addEventListener('scroll')` → toggle `.nav-scrolled` class
2. **Mobile menu:** hamburger click toggles `#mobile-menu` visibility, link clicks close it
3. **Hash scroll:** `DOMContentLoaded` → `setTimeout` 100ms → `scrollIntoView({ behavior: 'smooth' })`

## Content Collection Schema

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const educacion = defineCollection({
  type: 'content',
  schema: z.object({
    entrada: z.number(),
    palabra: z.string(),
    pronunciacion: z.string(),
    categoria: z.string(),
    meaning: z.array(z.string()),
    valueAdd: z.object({
      comparisons: z.array(z.string()),
      explanation: z.string(),
    }),
    etymology: z.object({
      root: z.string(),
      verb: z.string(),
      conclusion: z.string(),
    }),
    lexicalFamily: z.array(z.object({
      word: z.string(),
      type: z.string(),
      desc: z.string(),
      example: z.string().optional(),
    })),
    verbs: z.object({
      desc: z.string(),
      list: z.array(z.string()),
    }),
    collocations: z.array(z.string()),
    rival: z.object({
      word: z.string(),
      rivalDesc: z.string(),
      mainDesc: z.string(),
      conclusion: z.string(),
    }),
    mistakes: z.array(z.object({
      mistake: z.string(),
      correction: z.string(),
    })),
    examples: z.array(z.object({
      context: z.string(),
      text: z.string(),
    })),
    whyKeep: z.object({
      intro: z.string(),
      contrast: z.string(),
      conclusion: z.string(),
    }),
  }),
});

export const collections = { educacion };
```

**Markdown body** contains: `observation` section + `memorablePhrase` section as prose. Template renders `<Content />` between structured sections.

## Data Flow

```
inane.md frontmatter → getCollection('educacion') → educacion.astro (listing)
                     → getStaticPaths() → [slug].astro (entry page)
                                          ├── frontmatter fields → template sections
                                          └── render(entry) → <Content /> (prose body)
```

Page metadata: Layout `title`/`description` props set in each page's frontmatter block.

## Dependency Changes

| Action | Package | Reason |
|--------|---------|--------|
| Add | `@tailwindcss/vite` | Tailwind v4 Vite plugin |
| Add | `tailwindcss` | CSS engine |
| Add | `@astrojs/sitemap` | XML sitemap generation |
| Keep | `astro` ^7.1.3 | Framework |
| Keep | `@esbuild/win32-x64` | Build toolchain |
| Remove | None from current | No React deps to remove (never added) |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No data migration required. Single-phase: delete dead React files, create Layout + pages + components + content collection. Verify with `astro build`.

## Open Questions

- None — all decisions resolved by existing proposal/spec constraints.
