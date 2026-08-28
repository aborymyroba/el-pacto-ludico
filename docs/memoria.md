# Memoria del proceso — El Pacto Lúdico

Fecha de la última actualización: 28 de agosto de 2026.
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

### Entregas del Arsenal en producción

| # | Palabra | Fecha | Slug |
|---|---|---|---|
| I | Paroxismo | 2026-07-24 | `paroxismo` |
| II | Aquilatar | 2026-07-31 | `aquilatar` |
| III | Preterir | 2026-08-07 | `preterir` |
| IV | Aquiescencia | 2026-08-14 | `aquiescencia` |
| V | Elucidar | 2026-08-21 | `elucidar` |
| Interludio I | La devaluación de la palabra (El efecto Tû-Tû) | 2026-08-28 | `interludio-i` |

### Ecos en producción

| # | Voz | Fecha | Slug |
|---|---|---|---|
| I | Ítaca | 2026-07-31 | `itaca` |
| II | El territorio encogido (El peligro de la Neolengua) | 2026-08-28 | `el-territorio-encogido` |

### Interludios y publicaciones complementarias

- **Interludio I** (Arsenal): pequeña ruptura/paréntesis respecto a la cadencia de las entregas regulares. Se presenta con denominación «Interludio N» + título propio (no palabra suelta). Tras él se retoma la cadencia normal de entregas hasta el siguiente interludio (Interludio II previsto).
- **Eco II** (Educación): ensayo propio en prosa (no poema ajeno). No requiere autor/año ni versión catalana/selector de idioma, solo estética coherente con los Ecos.
- **Navegación cruzada:** ambas publicaciones se enlazan mutuamente desde su párrafo final (Interludio I ↔ Eco II). El párrafo final de cada entrega/eco se usa como puente hacia la otra sección.
- **Título del Interludio en la cabecera:** se muestra en 3 líneas («Interludio I» / «La devaluación de la palabra» / «(El efecto Tû-Tû)»), con la línea central forzada a una línea (`whitespace-nowrap`) y tamaños reducidos para armonizar. Las entregas regulares siguen mostrando solo la `palabra`.
- **Título del Eco II en la cabecera:** en 2 líneas («El territorio encogido» / «(El peligro de la Neolengua)»).
- **Detectar interludio vs entrega regular en `[slug].astro` del Arsenal:** si `titulo` empieza por «Interludio». Detectar ensayo vs poema en Ecos: si el título contiene «(».

### Envío al grupo (cada viernes)

- El aviso semanal del viernes va al **canal de WhatsApp** con el mensaje preparado por el creador (ver «Copy provisto» abajo). Es un texto de presentación de la(s) publicación(es) con los enlaces directos.
- **Logo para el mensaje:** el logo del sitio (moneda/escudo romano) es `public/images/coin.webp` (400×398 px, transparencia, 186 KB), también publicado en `https://el-pacto-ludico.web.app/images/coin.webp`. Se adjunta como imagen al inicio del mensaje del grupo (WhatsApp no muestra previsualización con varios enlaces). El `coin.ico` es solo favicon (64 px, no apto para mensajes).
- Para la entrega doble Interludio I + Eco II se usó un mensaje que conecta la devaluación y el recorte del pensamiento, referenciando a Alf Ross y Orwell, con ambos enlaces y cierre sobre la precisión lingüística.

### Fase C — Home que vive
- Bloque **«Última publicación»** automático: muestra la publicación más reciente de cualquier sección (etiqueta, palabra/título, fecha, extracto, botón «Leer»). Se actualiza en cada deploy sin tocarse a mano.
- Sección **Presentación** (`#nosotros`) con el texto de presentación del creador → imagen `maldon.webp` (Juegos Maldón, optimizada de 2.5 MB a 130 KB) → texto de Juegos Maldón. Botón hero «La Orden» reparado.
- Ajuste posterior: titular display grande y párrafos en columna angosta (`max-w-2xl`, `leading-loose`, `text-pretty`) para legibilidad.
- Ajuste final (12/08): párrafos a todo el ancho del contenedor (igual que la imagen), con `text-pretty` (contra palabras huérfanas al final de línea) y `hyphens-auto` (quiebres limpios en español).

## Recuperación post-pérdida (21/08/2026)

- **Contexto:** la máquina original de trabajo se perdió. Este directorio es un clon fresco de GitHub; la Entrega IV se creó y desplegó desde la máquina perdida sin quedar commiteada (producción quedó adelantada al repo).
- **Recuperado:** `src/content/entregas/aquiescencia.md` reconstruida con fidelidad total desde el sitio en producción (frontmatter + contenido íntegro). Auditoría byte a byte: las 12 páginas quedaron idénticas a producción.
- **Limpieza de assets (~29 MB):** eliminados de `public/images/` archivos de trabajo sin uso: `hero-colosseum.kra` (fuente de Krita), `hero-colosseum.png`, `.png~`, `.jpg~` y `pillar-{educacion,literatura,mesa,rol}.jpg` (sección antigua). Quedan solo los 4 archivos en uso + `coin.ico`.
- **Nuevo contexto de trabajo:** este repo es la única fuente de verdad. Regla: nada se considera publicado hasta estar committeado y pusheado.
- **Flujo para recuperar contenido futuro:** si existe en producción, dar la URL y reconstruir el `.md` desde ahí (los Ecos piden `numero`, `autor`, `anio`, `intro`, `catala`, `cierre` — todos extraíbles de la página publicada); si el creador tiene el texto, pegarlo e integrarlo al formato del proyecto.
- **Credenciales restablecidas en la máquina nueva:** Firebase login (`aborymyroba@gmail.com`) y push a GitHub con token clásico (permiso `repo`). **Ojo:** el creador tiene dos cuentas de GitHub — el repo es de `aborymyroba`; los tokens deben crearse con sesión iniciada como `aborymyroba` (el token hecho desde la otra cuenta, `fportizabg-glitch`, da 403 al pushear).

## Commits de referencia

| Commit | Contenido |
|---|---|
| `c3f995c` | Fase A |
| `acc6146` | Fecha en Ecos, base de serie y canal WhatsApp |
| `580aa55` | Fase C: última publicación + presentación |
| `b83743c` | Ajustes de presentación |
| `7895c4e` | Recuperación post-pérdida: Entrega IV + limpieza de assets |
| `f5399ef` | Entrega V Elucidar (incluye `.gitignore` para `firebase-debug.log`) |
| `35eec7b` | docs: memoria — Entrega V desplegada y credenciales restablecidas |
| `86bd89b` | deploy: Interludio I (Arsenal) y Eco II (Educación) con navegación cruzada |

## Notas técnicas útiles

- **Fecha en content collections:** el frontmatter YAML parsea `2026-07-24` como `Date`. El schema usa `z.coerce.date()` y `formatDate` (en `src/lib/format.ts`) reconstruye la fecha local desde componentes UTC para evitar el corrimiento de huso (Bogotá, -5).
- **Tailwind 4 escanea todo el proyecto** (salvo lo gitignoreado y binarios conocidos): archivos con extensiones raras (`.kra`, `.png~`) pueden generar clases fantasma en el CSS. Tras la limpieza de assets el hash del CSS cambió (desapareció una clase `.h-3` accidental, sin uso real). No alarmarse por cambios de hash del CSS entre builds.
- **`src/lib/publicaciones.ts`** centraliza todas las publicaciones (hoy `entregas` y `ecos`) con etiqueta, fecha, extracto y ruta. Al agregar una sección nueva, se registra allí y el bloque de la home la reconoce sola.
- **Esquema de `ecos` con campos opcionales:** `autor`, `anio`, `intro`, `catala` y `cierre` son opcionales, para admitir tanto poemas ajenos bilingües (Ítaca) como ensayos propios solo en español (Eco II). La página de detalle oculta autor/año, selector de idioma y bloque intro/cierre cuando no existen (y protege el script de idioma).
- **Extracto de ecos con fallback:** si el eco no tiene `intro`, `publicaciones.ts` extrae el extracto del `body` del markdown.
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

### Mensaje del grupo — entrega doble Interludio I + Eco II (28/08/2026)

> El lenguaje está vivo, pero a veces sufre de los mismos males que la economía. Esta semana hacemos un interludio en el Arsenal para conectar dos fenómenos de la misma categoría, pero con síntomas opuestos: la devaluación y el recorte del pensamiento.
> Para desenredar este nudo, nos apoyamos en las ideas de dos autores que analizan magistralmente estos procesos: el filósofo Alf Ross y el novelista George Orwell.
> Hemos preparado una entrega doble que conecta la lingüística, la filosofía y la educación, diseñada para leerse en un café de 5 minutos:
> 1. En Arsenal: La devaluación de la palabra (El efecto Tû-Tû). Cómo usamos palabras comodín que se inflan hasta quedar completamente huecas.
> 👉 https://el-pacto-ludico.web.app/arsenal/entregas/interludio-i/
> 2. En Educación: El territorio encogido (El peligro de la Neolengua). Cómo el desierto de nuestro vocabulario termina por achicar nuestra mente.
> 👉 https://el-pacto-ludico.web.app/educacion/ecos/el-territorio-encogido/
> Al final, la precisión lingüística no es un capricho elegante; es la única herramienta para evitar que nuestro mapa mental se borre.
> ¡Buena lectura y hasta la próxima!