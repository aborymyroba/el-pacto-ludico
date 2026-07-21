# Specification: React-to-Astro Migration

> **Change**: react-to-astro-migration | **Type**: Hybrid (Engram + OpenSpec)
> **No existing specs** — all requirements are NEW full specs, not deltas.

---

## 1. Layout (`src/layouts/Layout.astro`)

### Requirement: LAYOUT-001 — HTML Shell Structure

The system SHALL render `<html lang="es">` with `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, and a `<title>` element receiving per-page title via props.

#### Scenario: Layout renders with correct language

- GIVEN a page uses `Layout.astro` with `title="Test | El Pacto Lvdico"`
- WHEN the HTML is rendered
- THEN the `<html>` element has `lang="es"`
- AND `<title>` contains the provided title string

#### Scenario: Layout renders with default props

- GIVEN `Layout.astro` receives no `ogImage` prop
- WHEN the page renders
- THEN `og:image` defaults to `/images/hero-colosseum.jpg`

### Requirement: LAYOUT-002 — Navigation Bar

The system SHALL render a fixed `<nav>` with logo (CircleDollarSign SVG), site name "El Pacto Lvdico", and four desktop links: "Juegos de mesa" (`/#mesa`), "Juegos de Rol" (`/#rol`), "Literatura" (`/#literatura`), "Educación" (`/educacion`). On mobile (`md:hidden`), a hamburger button SHALL toggle the mobile menu.

#### Scenario: Desktop nav shows all four links

- GIVEN viewport width ≥ 768px
- WHEN the page loads
- THEN four nav links are visible
- AND the hamburger button is hidden

#### Scenario: Mobile nav shows hamburger

- GIVEN viewport width < 768px
- WHEN the page loads
- THEN only logo and hamburger button are visible in the nav bar

### Requirement: LAYOUT-003 — Mobile Menu Overlay

The system SHALL render a fullscreen overlay (`fixed inset-0 bg-background/95 backdrop-blur-xl`) with centered vertical nav links. The overlay transitions with `translate-y-0` (open) vs `-translate-y-full` (closed) over 500ms. Clicking any link SHALL close the overlay.

#### Scenario: Mobile menu opens on hamburger click

- GIVEN viewport < 768px and menu is closed
- WHEN user taps the hamburger button
- THEN the overlay transitions to `translate-y-0`
- AND all four nav links are visible centered

#### Scenario: Mobile menu closes on link click

- GIVEN the mobile menu is open
- WHEN user taps any nav link
- THEN the overlay transitions to `-translate-y-full`

### Requirement: LAYOUT-004 — Footer

The system SHALL render a `<footer>` with: logo + "El Pacto Lvdico" heading, tagline "Preservando la tradición del juego, la historia y el conocimiento para las generaciones venideras.", Secciones column (same 4 nav links), Contacto column ("Roma, Antigua República", "senado@pactolvdico.com", "Palomas Mensajeras: Aceptadas"), copyright line with dynamic `new Date().getFullYear()`, and "Privacidad" / "Términos" placeholder links (`href="#"`).

#### Scenario: Footer displays current year

- GIVEN the page renders in year 2026
- WHEN the footer is visible
- THEN copyright text contains "2026"

#### Scenario: Footer links are placeholders

- GIVEN the page renders
- WHEN user clicks "Privacidad" or "Términos"
- THEN no navigation occurs (href="#")

### Requirement: LAYOUT-005 — Scroll-Based Nav Styling

The system SHALL apply `bg-background/95 backdrop-blur-md border-border py-4 shadow-lg` to the nav when `window.scrollY > 20`, and `bg-transparent border-transparent py-6` otherwise. Implementation: vanilla JS `<script>` tag with `addEventListener('scroll')`.

#### Scenario: Nav styles change on scroll

- GIVEN the page loads at scroll position 0
- WHEN user scrolls past 20px
- THEN the nav background becomes semi-transparent with blur

#### Scenario: Nav styles revert on scroll to top

- GIVEN the nav is in scrolled state
- WHEN user scrolls back to top
- THEN the nav becomes fully transparent

---

## 2. Home Page (`src/pages/index.astro`)

### Requirement: HOME-001 — Hero Section

The system SHALL render a full-viewport hero section with: background image (`/images/hero-colosseum.jpg`), gradient overlay (`from-background/40 via-background/80 to-background`), badge "Uniendo Mundos" with pulsing dot, title `<h1>` with "El Pacto" (foreground) + "Lvdico" (primary italic), subtitle paragraph, and two CTA buttons ("Descubrir" primary + "La Orden" outline).

#### Scenario: Hero renders all elements

- GIVEN the home page loads
- WHEN the hero section is visible
- THEN the h1 contains "El Pacto" and "Lvdico"
- AND badge text reads "Uniendo Mundos"
- AND both CTA buttons are present

### Requirement: HOME-002 — Los Cuatro Pilares Section

The system SHALL render a section with id `explorar` containing: heading "Los Cuatro Pilares", decorative `w-16 h-1 bg-primary` bar, subtitle paragraph, and a 4-column responsive grid of `PillarCard` components with props: mesa, rol, literatura, educacion.

#### Scenario: Four pillar cards render in grid

- GIVEN the home page loads
- WHEN user scrolls to the Pilares section
- THEN four PillarCard components are visible in a grid layout

### Requirement: HOME-003 — Quote/Interstitial Section

The system SHALL render a blockquote section with: background texture image (`/images/quote-texture.jpg`, opacity 10%), CircleDollarSign icon (size 48), quote text "En la mesa de juego, como en el senado, se revelan los verdaderos temperamentos de los hombres.", and citation "— El Primer Edicto".

#### Scenario: Quote section renders with background

- GIVEN the home page loads
- WHEN the quote section is visible
- THEN the blockquote text is present
- AND the background texture image is rendered

### Requirement: HOME-004 — Hash-Scroll Behavior

The system SHALL implement vanilla JS to scroll to a target element on `DOMContentLoaded` when `location.hash` is present. Implementation: `setTimeout` with `scrollIntoView({ behavior: 'smooth' })`.

#### Scenario: Page scrolls to hash on load

- GIVEN user navigates to `/#mesa`
- WHEN the page loads
- THEN the page scrolls smoothly to the element with id `mesa`

---

## 3. PillarCard Component (`src/components/PillarCard.astro`)

### Requirement: CARD-001 — Card Rendering

The system SHALL render a card component with props: `id`, `title`, `description`, `icon` (SVG string), `image` (URL), `href` (optional). Card layout: image container (h-48, grayscale-50%, hover:grayscale-0, scale-110), icon circle, `<h3>` title, description paragraph, "Explorar" link with ChevronRight icon (opacity-0 → 100 on hover).

#### Scenario: Card renders all props

- GIVEN PillarCard receives `title="Juegos de Mesa"`, `id="mesa"`, `icon={svg}`
- WHEN rendered
- THEN the card shows the image, icon, title, description, and "Explorar" link

#### Scenario: Card educacion links to /educacion

- GIVEN PillarCard receives `id="educacion"`
- WHEN rendered
- THEN the "Explorar" link href is `/educacion`

#### Scenario: Card non-educacion links to hash

- GIVEN PillarCard receives `id="mesa"`
- WHEN rendered
- THEN the "Explorar" link href is `/#mesa`

---

## 4. Educacion View Page (`src/pages/educacion.astro`)

### Requirement: EDU-VIEW-001 — Entry Listing

The system SHALL query the `educacion` Content Collection, render a page header ("Arsenal de Precisión Lingüística"), and list all entries as cards showing: entry number, word, pronunciation, category, and brief meaning. Each card links to `/educacion/{slug}`.

#### Scenario: Inane entry appears in listing

- GIVEN the Content Collection contains `inane.md`
- WHEN the educacion page loads
- THEN a card shows "Inane", "Entrada #5", pronunciation "/i-NA-ne/"
- AND the card links to `/educacion/inane`

#### Scenario: Empty collection renders gracefully

- GIVEN the Content Collection has no entries
- WHEN the educacion page loads
- THEN the page header renders
- AND a message indicates no entries exist

---

## 5. Content Collection (`src/content/config.ts` + `src/content/educacion/inane.md`)

### Requirement: CC-001 — Schema Definition

The system SHALL define a Zod schema in `src/content/config.ts` for collection `educacion` with fields: `entrada` (number), `palabra` (string), `pronunciacion` (string), `categoria` (string), `significado` (string array).

#### Scenario: Valid entry passes schema validation

- GIVEN a markdown file with frontmatter: `entrada: 5`, `palabra: "Inane"`, `pronunciacion: "/i-NA-ne/"`, `categoria: "adjetivo"`, `significado: ["..."]`
- WHEN the Content Collection is queried
- THEN the entry is included in results

#### Scenario: Missing required field fails validation

- GIVEN a markdown file missing `palabra` in frontmatter
- WHEN the Content Collection is queried
- THEN a build error is raised

### Requirement: CC-002 — Inane Entry Content

The system SHALL contain `src/content/educacion/inane.md` with frontmatter matching the schema and markdown body containing all sections from the React `ENTRY` object: meaning, valueAdd (comparisons + explanation), etymology (root, verb, conclusion), lexicalFamily, verbs, collocations, rival, mistakes, examples, whyKeep, observation, memorablePhrase.

#### Scenario: Entry has all sections

- GIVEN the inane.md file
- WHEN parsed as Content Collection entry
- THEN frontmatter contains `entrada: 5`, `palabra: "Inane"`
- AND markdown body contains all 12 content sections

---

## 6. Entry Template (`src/pages/educacion/[slug].astro`)

### Requirement: ENTRY-001 — Dynamic Route Rendering

The system SHALL generate static pages from the `educacion` Content Collection via `getStaticPaths()`. Each page renders: header (entry number, word, pronunciation, category), Significado, ¿Qué aporta que no aporten otras palabras?, Etimología, Familia léxica + verbos (2-column grid), Colocaciones, La palabra rival (comparison grid), Errores frecuentes, Ejemplos de uso, ¿Por qué conservar esta palabra?, and memorable phrase closing.

#### Scenario: Inane page renders all sections

- GIVEN the inane entry exists in the collection
- WHEN user navigates to `/educacion/inane`
- THEN all 12 sections are rendered with correct content

#### Scenario: Unknown slug returns 404

- GIVEN a slug `nonexistent` does not exist in the collection
- WHEN user navigates to `/educacion/nonexistent`
- THEN a 404 page is returned

### Requirement: ENTRY-002 — Section Layout and Styling

The system SHALL render each section using the exact Tailwind classes and structure from the React source: meaning paragraphs (first paragraph `text-2xl`), valueAdd in `bg-card/50` bordered card, etymology with blockquote (`border-l-4 border-primary`), lexical family in bordered cards, verb list with ChevronRight icons, collocations as rounded-full tags, rival in 2-column comparison grid, errors in `bg-[#1a1412]` with red accents, examples with left border accent, whyKeep with centered italic contrast phrase, and memorable phrase centered with horizontal rules.

---

## 7. Assets

### Requirement: ASSET-001 — Image Downloads

The system SHALL serve 6 images locally from `public/images/`: `hero-colosseum.jpg`, `pillar-mesa.jpg`, `pillar-rol.jpg`, `pillar-literatura.jpg`, `pillar-educacion.jpg`, `quote-texture.jpg`. All sourced from Unsplash.

#### Scenario: Images are accessible

- GIVEN images are in `public/images/`
- WHEN a page references `/images/hero-colosseum.jpg`
- THEN the image loads successfully (HTTP 200)

### Requirement: ASSET-002 — SVG Icons

The system SHALL provide 18 inline SVG icons: Menu, X, CircleDollarSign, BookOpen, Dices, Library, Sword, ChevronRight, BookOpenText, Quote, XCircle, CheckCircle2, Swords, History, BookMarked, BrainCircuit, Sparkles, + logo variant. Icons SHALL be extracted from Lucide's open-source SVG paths and inlined directly in components.

---

## 8. SEO

### Requirement: SEO-001 — Per-Page Metadata

The system SHALL render per-page `<title>` in format "{Page Title} | El Pacto Lvdico", `<meta name="description">`, `<link rel="canonical">`, Open Graph tags (title, description, image, url, type, locale `es_AR`, site_name), and Twitter Card (`summary_large_image`).

#### Scenario: Home page SEO

- GIVEN the home page renders
- WHEN the `<head>` is inspected
- THEN title is "El Pacto Lvdico — Juegos de Mesa, Rol, Literatura y Educación"
- AND OG type is "website"

#### Scenario: Entry page SEO

- GIVEN `/educacion/inane` renders
- WHEN the `<head>` is inspected
- THEN title contains "Inane" and "El Pacto Lvdico"
- AND OG type is "article"

### Requirement: SEO-002 — Structured Data

The system SHALL render JSON-LD: Organization schema on the home page (name, url, description, logo, contactPoint), Article schema on entry pages (headline, author, publisher, datePublished, inLanguage).

### Requirement: SEO-003 — Crawlability

The system SHALL provide `public/robots.txt` allowing all user-agents, reference sitemap at `https://pactolvdico.com/sitemap-index.xml`, and use `@astrojs/sitemap` integration for XML sitemap generation at build time.

### Requirement: SEO-004 — Semantic HTML

The system SHALL use proper landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`), single `<h1>` per page, sequential heading hierarchy, and descriptive `alt` text on all images.

---

## 9. Styling

### Requirement: STYLE-001 — Tailwind v4 Theme

The system SHALL use the existing `src/index.css` with Tailwind v4 CSS-first config (`@theme inline`). Theme tokens: `--font-display: Cinzel`, `--font-body: Lora`, colors: background `#120f0d`, foreground `#ece5d8`, primary `#f8eb68`, card `#1c1613`, border `#3b2c24`, accent `#6c1818`, secondary `#241c18`.

### Requirement: STYLE-002 — Animations

The system SHALL support: mobile menu `translate-y` transition (500ms), card hover `scale-110` image zoom + `grayscale-0` (700ms), nav `backdrop-blur-md` fade (500ms), hero badge `animate-pulse`, and scroll-based nav class toggle.

### Requirement: STYLE-003 — Responsive Breakpoints

The system SHALL use mobile-first responsive design: default (mobile), `md:` (768px — 2-col grids, desktop nav), `lg:` (1024px — 4-col pillar grid, hero layout).

---

## 10. Interactivity (Vanilla JS)

### Requirement: JS-001 — Scroll Detection

The system SHALL detect `window.scrollY > 20` via `addEventListener('scroll')` and toggle nav CSS classes accordingly. No React, no frameworks — plain `<script>` tag in Layout.

### Requirement: JS-002 — Mobile Menu Toggle

The system SHALL toggle mobile menu visibility by toggling a CSS class on a `<script>` click handler. Clicking a nav link inside the menu SHALL close it.

### Requirement: JS-003 — Hash Scroll on Load

The system SHALL listen for `DOMContentLoaded`, check `location.hash`, find the target element by ID, and call `scrollIntoView({ behavior: 'smooth' })` after a `setTimeout` for layout settlement.

### Requirement: JS-004 — Zero Framework Dependencies

The system SHALL NOT use React, React DOM, or any JavaScript framework. All interactivity MUST be implemented with vanilla JS in `<script>` tags.

#### Scenario: No React in package.json

- GIVEN the project is built
- WHEN `package.json` is inspected
- THEN neither `react` nor `react-dom` appear in dependencies

---

## Dependencies Matrix

| Spec | Depends On |
|------|-----------|
| LAYOUT-001..005 | STYLE-001, JS-001, JS-002, ASSET-002 |
| HOME-001..004 | LAYOUT-001, CARD-001, ASSET-001, JS-003 |
| CARD-001 | ASSET-001, ASSET-002 |
| EDU-VIEW-001 | CC-001, CC-002 |
| ENTRY-001..002 | CC-001, CC-002, ASSET-002 |
| SEO-001..004 | LAYOUT-001 |
| STYLE-001..003 | (standalone) |
| JS-001..004 | (standalone) |
