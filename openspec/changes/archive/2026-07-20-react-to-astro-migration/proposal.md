# Proposal: React-to-Astro Migration

## Intent

Migrate the 2-page React SPA (`reactToMigrate/`) to a fully static Astro site with zero React islands, serving locally-hosted images and full SEO. The Educacion section will use Astro Content Collections for vocabulary entries, enabling a view page listing entries and individual entry pages via dynamic routes.

## Scope

### In Scope
- Layout shell (`Layout.astro`) with nav, footer, mobile menu, SEO `<head>`
- Home page (hero, 4 PillarCards, quote section, CTA)
- Educacion view page (`educacion.astro`) listing all vocabulary entries
- Content Collection setup for Educacion entries with schema definition
- Entry template page (`[slug].astro`) rendering individual entries
- Migration of "Inane" entry to `.md` format with frontmatter
- `PillarCard.astro` reusable component
- 6 Unsplash images downloaded to `public/images/`
- 18 inline SVG icons (migrated from `lucide-react`)
- Full SEO: per-page meta, OG tags, Twitter cards, canonical URLs, JSON-LD, sitemap, robots.txt
- Tailwind v4 CSS (copy from React, zero config changes needed)
- Vanilla JS for scroll detection, mobile menu, hash-scroll-to

### Out of Scope
- React integration / islands
- Real privacy/terms pages (placeholder `href="#"`)
- Real hero CTA destinations
- Testing infrastructure
- CI/CD setup
- Font self-hosting (keep Google Fonts CDN)
- Image optimization via Astro `<Image>` (use `<img>` with local files)
- Additional vocabulary entries beyond initial "Inane" migration

## Capabilities

### New Capabilities
- `educacion-content-collections`: Content Collection schema and entry template for vocabulary entries
- `educacion-view-page`: Index page listing all vocabulary entries with dynamic routing

### Modified Capabilities
None (first migration, no existing specs)

## Approach

| Phase | Description | Key Files |
|-------|-------------|-----------|
| 1. Setup | Configure Tailwind v4 via `@tailwindcss/vite`, install `@astrojs/sitemap`, delete dead React files | `astro.config.mjs`, `package.json`, `src/index.css` |
| 2. Layout | Create `Layout.astro` with `<html lang="es">`, SEO `<head>`, nav, mobile menu, footer | `src/layouts/Layout.astro` |
| 3a. Home | Convert `Home.tsx` → `index.astro`, extract `PillarCard.astro`, hash-scroll script | `src/pages/index.astro`, `src/components/PillarCard.astro` |
| 3b. Educacion View | Create `educacion.astro` listing page (dynamic from collection) | `src/pages/educacion.astro` |
| 4. Content Collection | Define schema in `src/content/config.ts`, create entry template `[slug].astro` | `src/content/config.ts`, `src/pages/educacion/[slug].astro` |
| 5. Migrate Entry | Convert "Inane" entry from React to `src/content/educacion/inane.md` with frontmatter | `src/content/educacion/inane.md` |
| 6. Assets | Download 6 Unsplash images, create 18 inline SVG icons | `public/images/*.jpg`, inline in components |
| 7. SEO | Per-page meta + JSON-LD, `public/robots.txt`, `@astrojs/sitemap` | `astro.config.mjs`, `public/robots.txt` |

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `astro.config.mjs` | Modified | Add Tailwind v4 plugin + sitemap integration |
| `package.json` | Modified | Add deps: `tailwindcss`, `@astrojs/sitemap`, `sharp`; rename to `elpactolvdico` |
| `src/layouts/` | New | `Layout.astro` — full shell with SEO head |
| `src/pages/` | Modified | `index.astro`, `educacion.astro`, `educacion/[slug].astro` |
| `src/content/` | New | `config.ts` (schema), `educacion/inane.md` (first entry) |
| `src/components/` | New | `PillarCard.astro` |
| `public/images/` | New | 6 downloaded Unsplash images |
| `public/robots.txt` | New | Allow all, point to sitemap |
| Dead React files | Removed | `src/main.tsx`, `src/vite-env.d.ts`, `src/pages/Home.tsx`, `src/pages/Educacion.tsx`, `src/components/Layout.tsx`, root `index.html` |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Tailwind v4 incompatible with Astro integration | Med | Use `@tailwindcss/vite` plugin directly; fall back to v3 if needed |
| Figma `robots: index: false` leaks to prod | High | Delete `.figma/` dir, add explicit `robots.txt` allowing all |
| Scroll-to-hash breaks (SPA → MPA) | Low | Vanilla JS `DOMContentLoaded` + `setTimeout` for layout settle |
| No OG images exist yet | Med | Use hero colosseum as default OG image for both pages |
| Content Collection schema evolution | Low | Define minimal schema now; extend later without breaking existing entries |

## Rollback Plan

Single PR → revert the merge commit. No database migrations, no env state. The Astro scaffolding is already in place; reverting restores the default `<h1>Astro</h1>` index page. Dead React files are recoverable from `reactToMigrate/`. Content Collection entries are simple `.md` files with no external dependencies.

## Dependencies

- `@tailwindcss/vite` (or `@astrojs/tailwind`) — Tailwind v4 Astro integration
- `@astrojs/sitemap` — XML sitemap generation
- `sharp` — Astro peer dep for image processing
- Astro Content Collections (built-in, no extra deps)

## Success Criteria

- [ ] `astro build` succeeds with 0 errors
- [ ] Both pages render identically to React source (visual parity)
- [ ] Zero React dependencies in `package.json`
- [ ] All 6 images served locally from `public/images/`
- [ ] SEO: Lighthouse SEO score ≥ 95
- [ ] Sitemap generated at `dist/sitemap-index.xml`
- [ ] `robots.txt` allows all crawlers
- [ ] Educacion view page lists "Inane" entry from Content Collection
- [ ] Entry template renders individual entry with all sections
