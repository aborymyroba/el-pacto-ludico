# Memoria del proceso — El Pacto Lúdico

Fecha de la última actualización: 12 de agosto de 2026.
Este documento preserva el estado del proyecto, las decisiones tomadas y lo que queda pendiente para retomarlo con continuidad.

## Contexto

- **Sitio:** https://el-pacto-ludico.web.app — Firebase Hosting + Firestore (comentarios).
- **Stack:** Astro 7, Tailwind 4, Firebase. Repo: `aborymyroba/el-pacto-ludico` (rama `master`).
- **Roles (regla del proyecto):** este proceso es solo de implementación técnica. Todo copy final y contenido editorial lo provee el creador.
- **Identidad:** sombrilla única «El Pacto Lúdico» (la Orden): juegos de mesa, rol, educación y el Arsenal de Precisión Lingüística.
- **Marca visual romana:** se escribe «Lúdico» con U; la V romana («Lvdico») se usa **solo** en wordmarks visuales (logo, hero, nav/footer). En texto corrido y metadatos siempre «Lúdico».
- **Cadencia:** publicación semanal los viernes; hoy es activo el Arsenal. Mesa y rol están pausados y se retomarán.

## Decisiones tomadas

- Todo bajo una sola sombrilla (no un proyecto aparte para lo lingüístico).
- **RSS descartado.** Comunidad vía **canal de WhatsApp** (el grupo no se promueve en la web; solo funciona con gente que tiene el contacto).
- **Newsletter diferido.** Gmail solo no sirve para newsletters; el canal cubre el rol del aviso del viernes.
- Bloque de home «Última publicación» **genérico**: muestra la más reciente de cualquier sección, no solo dos.
- Botón del hero «La Orden» conduce a la sección `#nosotros` (presentación en la home).

## Todo lo desplegado (en producción)

### Fase A — Cimientos y marca
- Marca normalizada: «Lúdico» en títulos, metadatos, JSON-LD, alt y copyright; «Lvdico» solo en lo visual.
- Secciones reales `#mesa` y `#rol` en la home (placeholder «Contenido en preparación»).
- Campo `fecha` en las entregas y mostrada en el listado y en cada entrada.
- Página `404`, `og:locale` → `es_CO`, fechas de comentarios → `es-CO`.

### Fase B — Base de serie y comunidad
- Campo `fecha` en los Ecos (schema + `itaca.md` = 31/07/2026), mostrada en el listado y en la página (se conserva `autor · anio` del poema).
- Navegación anterior/siguiente en cada entrega del Arsenal.
- Listado de entregas con extracto + fecha + contador («X entregas publicadas»).
- Acceso al canal de WhatsApp:
  - Componente reutilizable `WhatsAppCta` (botón «Únete al canal de WhatsApp» + botón «Compartir» con `wa.me`).
  - Presente al cierre de cada entrega y eco, en un bloque de la home (con el texto del creador) y como enlace en el footer.
  - **Canal:** `https://whatsapp.com/channel/0029VbCpKhm4o7qDlKVpYo3I`
  - Mensaje de compartir (arma solo título + enlace): «Comprender la realidad con mayor claridad, nombrarla con mayor exactitud y comunicarla con mayor honestidad. {título}: {enlace}»

### Fase C — Home que vive
- Bloque **«Última publicación»** automático: muestra la publicación más reciente de cualquier sección (etiqueta, palabra/título, fecha, extracto, botón «Leer»). Se actualiza en cada deploy sin tocarse a mano.
- Sección **Presentación** (`#nosotros`) con el texto de presentación del creador → imagen `maldon.webp` (Juegos Maldón, optimizada de 2.5 MB a 130 KB) → texto de Juegos Maldón. Botón hero «La Orden» reparado.
- Ajuste posterior: titular display grande y párrafos en columna angosta (`max-w-2xl`, `leading-loose`, `text-pretty`) para legibilidad.
- Ajuste final (12/08): párrafos a todo el ancho del contenedor (igual que la imagen), con `text-pretty` (contra palabras huérfanas al final de línea) y `hyphens-auto` (quiebres limpios en español).

## Commits de referencia

| Commit | Contenido |
|---|---|
| `c3f995c` | Fase A |
| `acc6146` | Fecha en Ecos, base de serie y canal WhatsApp |
| `580aa55` | Fase C: última publicación + presentación |
| `b83743c` | Ajustes de presentación |

## Notas técnicas útiles

- **Fecha en content collections:** el frontmatter YAML parsea `2026-07-24` como `Date`. El schema usa `z.coerce.date()` y `formatDate` (en `src/lib/format.ts`) reconstruye la fecha local desde componentes UTC para evitar el corrimiento de huso (Bogotá, -5).
- **`src/lib/publicaciones.ts`** centraliza todas las publicaciones (hoy `entregas` y `ecos`) con etiqueta, fecha, extracto y ruta. Al agregar una sección nueva, se registra allí y el bloque de la home la reconoce sola.
- **`src/lib/extract.ts`** extrae el primer párrafo del markdown (sin sintaxis, truncado ~180 caracteres).
- **`src/lib/constantes.ts`** guarda `CANAL_WHATSAPP`.
- **Deploy:** `npm run build` → `npx firebase-tools deploy` → commit + push. Si un paso falla, detener.
- **Dev local:** `astro dev --background` (ver `astro dev status/logs/stop`).

## Pendiente

- **Fase D — Constelaciones:** página del Arsenal («Próximamente» hoy). Red de palabras conectadas (paroxismo ↔ aquilatar ↔ preterir). Es el diferenciador editorial.
- **Fase E — Moderación de comentarios:** hoy cualquiera puede escribir a Firestore; agregar reglas anti-spam/moderación.
- **Contenido real de `#mesa` y `#rol`:** lo provee el creador (hoy placeholder).
- **Posteriores:** QR del canal para eventos, medir clics al botón del canal, enlaces a redes sociales nuevas, newsletter (cuando haya demanda).

## Copy provisto por el creador (no perder)

- **Presentación (bloque 1):** «Como iremos descubriendo, los juegos no son únicamente cosa de niños. Han acompañado al ser humano desde las primeras civilizaciones y, a lo largo de la historia, han servido como herramientas de aprendizaje dentro de entornos definidos por reglas y objetivos. Pero jugar es mucho más que entretenerse: es explorar posibilidades, asumir retos, imaginar, aprender y relacionarnos con los demás.»
- **Presentación (bloque 2):** «Jugar no es evadirse de la vida, sino una forma particular de vivirla. Podemos hacerlo moviendo piezas, asumiendo personajes, resolviendo problemas o explorando las posibilidades del lenguaje. Siempre hay en el juego algo que nos entretiene, algo que nos enseña y, sobre todo, algo que amplía nuestra manera de mirar y comprender el mundo.»
- **Presentación (bloque 3, Juegos Maldón):** «Conocimos esta frase a través de Juegos Maldón, donde aparece como una de las ideas que inspiraron su proyecto. La encuentro especialmente apropiada para este lugar: porque jugar no pertenece a una edad determinada. Es una forma de explorar, aprender, crear, compartir y mantener abierta nuestra manera de mirar el mundo.»
- **Bloque home del canal:** «Sigamos construyendo conocimiento, únete al canal y no te pierdas ninguna publicación.»