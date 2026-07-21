# Tasks: React-to-Astro Migration

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 500–600 (net additions; ~520 deleted, ~960 added) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (Setup+Layout) → PR 2 (Home+PillarCard) → PR 3 (Educacion+SEO) |
| Delivery strategy | single-pr |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Setup, cleanup, Layout shell | PR 1 | `astro build` 0 errors | `astro dev` renders Layout with nav/footer | Config + Layout.astro only; pages revert to default |
| 2 | Home page + PillarCard + assets | PR 2 | `astro build` + `astro dev` renders hero+pillars | Visit `/#mesa` scrolls to section | index.astro + PillarCard.astro + public/images/ |
| 3 | Educacion collection + pages + SEO | PR 3 | `astro build` + `/educacion/inane` renders all sections | Visit `/educacion` lists entry; `/educacion/inane` shows full article | educacion pages + content.config.ts + robots.txt + sitemap |

---

## Phase 1: Setup & Cleanup

- [x] 1.1 **T-001** Install dependencies — run `npm install tailwindcss @astrojs/sitemap` to add Tailwind v4 engine + sitemap generator. **Files:** `package.json`. **Est:** ~3 lines changed. **Dep:** none. **Done:** `npm ls tailwindcss` shows installed.
- [x] 1.2 **T-002** Update `astro.config.mjs` — add `@tailwindcss/vite` plugin via Vite config + `sitemap()` integration. Use `astro.config.mjs` Vite plugin approach (not `@astrojs/tailwind`). **Files:** `astro.config.mjs`. **Est:** ~12 lines changed. **Dep:** T-001. **Done:** `astro build` doesn't crash on Tailwind import.
- [x] 1.3 **T-003** Delete dead React files — remove `src/main.tsx`, `src/vite-env.d.ts`, `src/pages/Home.tsx`, `src/pages/Educacion.tsx`, `src/components/Layout.tsx`. Also delete `reactToMigrate/index.html`. **Files:** 5 files deleted. **Est:** -522 lines. **Dep:** none. **Done:** `ls src/**/*.tsx` returns empty.
- [x] 1.4 **T-004** Download 6 Unsplash images to `public/images/` — hero-colosseum.jpg, pillar-mesa.jpg, pillar-rol.jpg, pillar-literatura.jpg, pillar-educacion.jpg, quote-texture.jpg. Use `curl` or `wget` with Unsplash source URLs from explore.md. **Files:** `public/images/*.jpg` (6 new). **Est:** 0 code lines (binary assets). **Dep:** none. **Done:** all 6 files exist in `public/images/`.

## Phase 2: Layout

- [x] 2.1 **T-005** Create SVG icon constants — define inline SVG markup for all 18 icons (Menu, X, CircleDollarSign, BookOpen, Dices, Library, Sword, ChevronRight, BookOpenText, Quote, XCircle, CheckCircle2, Swords, History, BookMarked, BrainCircuit, Sparkles, logo). Place as a shared constants or inline where used. **Files:** `src/components/Icons.astro` (new). **Est:** ~90 lines. **Dep:** none. **Done:** component exports all icon names with correct SVG paths from Lucide.
- [x] 2.2 **T-006** Create `src/layouts/Layout.astro` — full HTML shell: `<html lang="es">`, `<head>` with charset, viewport, per-page `<title>`, `<meta description>`, canonical URL, OG tags (title, description, image, url, type, locale `es_AR`, site_name), Twitter Card (`summary_large_image`). Props interface: `title`, `description`, `ogImage?`, `ogType?`. Include `<slot />` in `<main>`. **Files:** `src/layouts/Layout.astro` (new). **Est:** ~60 lines. **Dep:** none. **Done:** `astro build` renders valid HTML with `<html lang="es">`.
- [x] 2.3 **T-007** Add nav to Layout.astro — fixed `<nav>` with logo (CircleDollarSign SVG), "El Pacto Lvdico" text, 4 desktop links (Juegos de mesa → `/#mesa`, Juegos de Rol → `/#rol`, Literatura → `/#literatura`, Educación → `/educacion`), mobile hamburger button. **Files:** `src/layouts/Layout.astro`. **Est:** ~40 lines. **Dep:** T-005, T-006. **Done:** desktop shows 4 links; mobile shows hamburger.
- [x] 2.4 **T-008** Add mobile menu overlay to Layout.astro — fullscreen `fixed inset-0 bg-background/95 backdrop-blur-xl` overlay with centered nav links, `translate-y-0` / `-translate-y-full` transition. Nav links close menu on click. **Files:** `src/layouts/Layout.astro`. **Est:** ~20 lines. **Dep:** T-007. **Done:** hamburger toggles overlay on mobile viewport.
- [x] 2.5 **T-009** Add footer to Layout.astro — logo + heading, tagline, Secciones column (same 4 links), Contacto column (Roma, email, Palomas), copyright with `new Date().getFullYear()`, Privacidad/Términos placeholder links. **Files:** `src/layouts/Layout.astro`. **Est:** ~45 lines. **Dep:** T-005. **Done:** footer renders with current year.
- [x] 2.6 **T-010** Add vanilla JS scripts to Layout.astro — (1) scroll listener toggles nav classes when `scrollY > 20`, (2) mobile menu toggle via click handler, (3) hash-scroll on DOMContentLoaded with 100ms setTimeout + `scrollIntoView`. All inline `<script>` tags. **Files:** `src/layouts/Layout.astro`. **Est:** ~35 lines. **Dep:** T-007, T-008. **Done:** scroll past 20px changes nav background; mobile menu toggles; `/#mesa` scrolls to section on page load.

## Phase 3: Home Page

- [x] 3.1 **T-011** Create `src/components/PillarCard.astro` — accepts props: `id`, `title`, `description`, `icon` (SVG string), `image`, `href?`. Renders card with image container (h-48, grayscale-50%, hover effects), icon circle, `<h3>`, description, "Explorar" link with ChevronRight (opacity transition). Educacion card → `/educacion`; others → `/#id`. **Files:** `src/components/PillarCard.astro` (new). **Est:** ~45 lines. **Dep:** T-005. **Done:** card renders all props; educacion links to `/educacion`.
- [x] 3.2 **T-012** Create `src/pages/index.astro` — replace default Astro scaffold. Hero section: background image (`/images/hero-colosseum.jpg`), gradient overlay, badge "Uniendo Mundos" with pulsing dot, h1 "El Pacto" + "Lvdico", subtitle, two CTAs. **Files:** `src/pages/index.astro`. **Est:** ~50 lines. **Dep:** T-006 (Layout). **Done:** hero renders with all elements visible.
- [x] 3.3 **T-013** Add Pilares section to index.astro — id `explorar`, heading "Los Cuatro Pilares", decorative bar, subtitle, 4-column responsive grid with 4 PillarCard instances (mesa, rol, literatura, educacion) using local images. **Files:** `src/pages/index.astro`. **Est:** ~35 lines. **Dep:** T-011, T-012. **Done:** 4 cards render in grid; each has unique image.
- [x] 3.4 **T-014** Add quote section to index.astro — blockquote with background texture (`/images/quote-texture.jpg`, opacity 10%), CircleDollarSign icon, quote text, citation "— El Primer Edicto". **Files:** `src/pages/index.astro`. **Est:** ~20 lines. **Dep:** T-012. **Done:** quote section renders with background image and text.

## Phase 4: Educacion (Content Collection + Pages)

- [x] 4.1 **T-015** Create Content Collection schema — `src/content.config.ts` with `educacion` collection using Zod schema: `entrada` (number), `palabra`, `pronunciacion`, `categoria` (strings), `meaning` (string[]), `valueAdd`, `etymology`, `lexicalFamily`, `verbs`, `collocations`, `rival`, `mistakes`, `examples`, `whyKeep` objects per design.md. **Files:** `src/content.config.ts` (new). **Est:** ~55 lines. **Dep:** none. **Done:** `astro build` validates schema without errors.
- [x] 4.2 **T-016** Create `src/content/educacion/inane.md` — frontmatter with all schema fields (entrada: 5, palabra: "Inane", etc.) + markdown body with observation and memorablePhrase sections. Extract all content from React `ENTRY` object. **Files:** `src/content/educacion/inane.md` (new). **Est:** ~90 lines. **Dep:** T-015. **Done:** file passes schema validation on build.
- [x] 4.3 **T-017** Create `src/pages/educacion.astro` — listing page using `getCollection('educacion')`. Header "Arsenal de Precisión Lingüística", cards for each entry showing number, word, pronunciation, category, brief meaning. Links to `/educacion/{slug}`. Empty state if no entries. **Files:** `src/pages/educacion.astro` (new). **Est:** ~50 lines. **Dep:** T-015, T-016. **Done:** page lists "Inane" entry card linking to `/educacion/inane`.
- [x] 4.4 **T-018** Create `src/pages/educacion/[slug].astro` — dynamic route with `getStaticPaths()`. Renders all 12 sections from React Educacion.tsx: header, Significado, ¿Qué aporta?, Etimología, Familia léxica + verbos (2-col grid), Colocaciones, La palabra rival (comparison grid), Errores frecuentes, Ejemplos de uso, ¿Por qué conservar?, observation, memorable phrase. Use `<Content />` for markdown body sections. Match exact Tailwind classes from React source. **Files:** `src/pages/educacion/[slug].astro` (new). **Est:** ~200 lines. **Dep:** T-015, T-016. **Done:** `/educacion/inane` renders all 12 sections with correct content.

## Phase 5: SEO

- [x] 5.1 **T-019** Add JSON-LD structured data — Organization schema on home page (name, url, description, logo, contactPoint), Article schema on entry pages (headline, author, publisher, datePublished, inLanguage). Render via `<script type="application/ld+json">` in each page. **Files:** `src/pages/index.astro`, `src/pages/educacion/[slug].astro`. **Est:** ~30 lines. **Dep:** T-012, T-018. **Done:** Lighthouse detects valid JSON-LD on both pages.
- [x] 5.2 **T-020** Create `public/robots.txt` — `User-agent: *`, `Allow: /`, `Sitemap: https://pactolvdico.com/sitemap-index.xml`. **Files:** `public/robots.txt` (new). **Est:** ~3 lines. **Dep:** none. **Done:** file exists and is valid.
- [x] 5.3 **T-021** Verify sitemap integration — confirm `@astrojs/sitemap` in astro.config.mjs generates `dist/sitemap-index.xml` on build. **Files:** `astro.config.mjs` (verify). **Est:** ~0 lines. **Dep:** T-002. **Done:** `astro build` produces `dist/sitemap-index.xml`.

## Phase 6: Polish & Verify

- [x] 6.1 **T-022** Content parity audit — diff every text string in generated pages against React source. Verify all 4 nav links, hero text, 4 pillar descriptions, quote text, footer text, educacion entry content all match exactly. **Files:** none (audit). **Est:** 0 lines. **Dep:** T-014, T-018. **Done:** zero text discrepancies.
- [x] 6.2 **T-023** Responsive design verification — test mobile (<768px), tablet (768–1024px), desktop (>1024px) for Layout nav, mobile menu, home hero, pillar grid, educacion sections. **Files:** none (manual test). **Est:** 0 lines. **Dep:** T-010, T-014, T-018. **Done:** all breakpoints render correctly.
- [x] 6.3 **T-024** Final build + SEO audit — run `astro build` (0 errors), verify sitemap in dist/, check robots.txt, verify all images load, run Lighthouse SEO score ≥ 95. **Files:** none (verification). **Est:** 0 lines. **Dep:** all prior tasks. **Done:** clean build, SEO ≥ 95.
- [x] 6.4 **T-025** Verify zero React dependencies — confirm `react`, `react-dom`, `react-router`, `lucide-react`, `@vitejs/plugin-react` are NOT in package.json dependencies. **Files:** `package.json` (verify). **Est:** 0 lines. **Dep:** T-003. **Done:** `npm ls react` returns not found.
