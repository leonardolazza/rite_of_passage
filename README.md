# 🏛️ Rite of Passage — Auditoría Técnica y Roadmap de Mejoras

> **Atelier Sonoro & Eventos Bespoke**  
> Diagnóstico de arquitectura, rendimiento, buenas prácticas y plan de modernización integral sin alterar la identidad de marca.

---

## 📋 Tabla de Contenidos

1. [Resumen Ejecutivo & Visión de la Marca](#-resumen-ejecutivo--visión-de-la-marca)
2. [Diagnóstico Técnico Detallado](#-diagnóstico-técnico-detallado)
   - [A. Gestión de Recursos y Optimización de Medios (Assets)](#a-gestión-de-recursos-y-optimización-de-medios-assets)
   - [B. Arquitectura Web, SSR / SSG y Meta-Framework](#b-arquitectura-web-ssr--ssg-y-meta-framework)
   - [C. Estructura de Datos, Tipado y Dominio](#c-estructura-de-datos-tipado-y-dominio)
   - [D. Modularidad, Subdivisión y Diseño de Componentes](#d-modularidad-subdivisión-y-diseño-de-componentes)
   - [E. Patrones de Diseño, Código Limpio y Corrección de Bugs](#e-patrones-de-diseño-código-limpio-y-corrección-de-bugs)
   - [F. Rendimiento Web y Core Web Vitals (LCP, CLS, INP)](#f-rendimiento-web-y-core-web-vitals-lcp-cls-inp)
   - [G. UX/UI, Atelier Sonoro y Accesibilidad (a11y)](#g-uxui-atelier-sonoro-y-accesibilidad-a11y)
   - [H. Estrategia de Testing y Calidad de Software](#h-estrategia-de-testing-y-calidad-de-software)
   - [I. SEO, Analítica y Seguridad](#i-seo-analítica-y-seguridad)
3. [✅ Master Checklist de Mejoras (Roadmap de Implementación)](#-master-checklist-de-mejoras-roadmap-de-implementación)
   - [Fase 0: Correcciones Críticas Inmediatas & Limpieza (P0)](#fase-0-correcciones-críticas-inmediatas--limpieza-p0)
   - [Fase 1: Optimización Extrema de Assets y Rendimiento (P0)](#fase-1-optimización-extrema-de-assets-y-rendimiento-p0)
   - [Fase 2: Estructura de Datos y Modelo de Dominio (P1)](#fase-2-estructura-de-datos-y-modelo-de-dominio-p1)
   - [Fase 3: Migración de Arquitectura a Meta-Framework (SSR/SSG) (P1)](#fase-3-migración-de-arquitectura-a-meta-framework-ssrssg-p1)
   - [Fase 4: Refactorización de UI/UX, Atelier Sonoro y A11y (P2)](#fase-4-refactorización-de-uiux-atelier-sonoro-y-a11y-p2)
   - [Fase 5: Testing, Automatización y Despliegue Continuo (P2)](#fase-5-testing-automatización-y-despliegue-continuo-p2)
4. [Flujo de Git y Merge](#-flujo-de-git-y-merge)

---

## 🎯 Resumen Ejecutivo & Visión de la Marca

**Rite of Passage** se presenta como una productora de sonido y atelier de vanguardia para eventos de alta gama (*bespoke*), galas exclusivas y experiencias inmersivas, destacando a artistas de primer nivel como el saxofonista y DJ **Joa Lamtzev**.

Su identidad visual y conceptual se apoya en tres pilares:
1. **Lujo Oscuro & Editorial:** Fondos oscuros (`#0c0c0e`), tipografía clásica con serifas decorativas (`Cinzel`, `Cormorant Garamond`) y sans modernas (`Plus Jakarta Sans`, `Outfit`).
2. **Simbología del Rito y el Fuego:** Acentos carmesí (`#c8262f`), partículas de brasas, riel de fuego animado y estética de umbral/iniciación.
3. **Artesanía Sonora & Curaduría:** Fusión de hardware analógico/clásico (Yamaha YAS-62) con tecnología contemporánea (Pioneer XDJ-RR, calibración acústica).

### 🔍 Diagnóstico General
Actualmente el proyecto es un sitio estático basado en dos archivos HTML independientes (`index.html` y `joah.html`), dos hojas de estilos desacopladas (`styles.css` y `joah.css`) y scripts inline. Aunque el concepto estético es potente y sofisticado, a nivel de **ingeniería de software presenta problemas críticos** que comprometen gravemente los tiempos de carga, la escalabilidad del catálogo, la experiencia en dispositivos móviles y la mantenibilidad del código:

* **Peso Desmedido del Repositorio y Carga Web:** El proyecto pesa **~311 MB**. Una sola carga inicial de `index.html` transfiere **más de 84 MB de datos** debido a un GIF de fondo de 27.8 MB y fotografías crudas de cámara réflex (de hasta 16.5 MB cada una).
* **Duplicación de Archivos y Espacio Muerto:** Existen **97 MB** en la carpeta `imagenes/` que son duplicados exactos no referenciados en ningún código.
* **Fallas de JavaScript en Producción:** Errores de referencia en tiempo de ejecución (funciones llamadas en atributos `onclick` que no existen en el script).
* **Consumo Ineficiente de CPU/GPU:** Animaciones de `<canvas>` y oyentes de scroll que se ejecutan de manera ininterrumpida sin comprobar si el usuario está viendo la sección.
* **Ausencia de Sonido:** Siendo una productora de arquitectura sonora, el visitante no puede escuchar ninguna muestra de audio directamente en la web.
* **Cero Pruebas y Tipado:** No hay tests unitarios, end-to-end, ni esquemas de validación de datos.

---

## 🔬 Diagnóstico Técnico Detallado

### A. Gestión de Recursos y Optimización de Medios (Assets)

#### Hallazgos Actuales:
1. **Póster de Video Gigante:** `index.html` carga como póster del video hero el archivo `assets/hero_fuego.gif`, con un peso de **27.82 MB**. Esto bloquea el ancho de banda del usuario antes de reproducir el video.
2. **Fotografías sin Compresión Web:** En la sección "Quiénes Somos" y en el Lightbox se usan imágenes como `escenario_5.jpg` (**16.52 MB**), `escenario_4.jpg` (**12.10 MB**) y `escenario_6.jpg` (**3.74 MB**). En `joah.html`, `joa_saxo_14.jpg` pesa **15.59 MB**.
3. **Archivos Muertos y Duplicados:**
   - La carpeta `imagenes/` (97 MB) tiene subcarpetas con nombres con espacios (`Imagenes joah/`, `imagenes_escenario/`) que duplican `assets/` y no son consumidas por ningún archivo.
   - Existe un video crudo `assets/_fuentes/video gif.mkv` (**15.75 MB**) subido al repositorio de producción.
4. **Falta de Formatos Modernos:** Todos los recursos son JPG, PNG o GIF tradicionales; no se utiliza WebP ni AVIF, lo que reduce el potencial de compresión entre un 60% y 85%.
5. **Falta de Imágenes Responsivas:** No se utiliza la etiqueta `<picture>` ni el atributo `srcset` con diferentes densidades y anchos de pantalla.

#### Propuestas de Mejora:
* **Conversión a WebP / AVIF:** Recomprimir todas las imágenes en lotes a WebP/AVIF con calidad 80-85%. Una imagen de 16 MB puede reducirse a menos de 250 KB sin pérdida perceptible.
* **Generación de Tamaños Responsivos:** Crear variantes (thumb: 400w, tablet: 800w, desktop: 1200w, full: 1920w).
* **Sustitución del Póster:** Reemplazar el GIF de 27.8 MB por un frame WebP optimizado de menos de 100 KB o un póster con gradiente CSS de carga instantánea.
* **Compresión de Video con FFmpeg:** Codificar `hero_video.mp4` en H.264/H.265 y AV1/WebM a 1080p con bitrate optimizado (CRF 26-28), reduciendo el tamaño de 21 MB a menos de 4-5 MB.
* **Eliminación y Limpieza del Repo:** Eliminar `imagenes/` y `assets/_fuentes/` del repositorio y agregarlos a `.gitignore`.

---

### B. Arquitectura Web, SSR / SSG y Meta-Framework

#### Hallazgos Actuales:
1. **Arquitectura Monolítica Estática:** Dos archivos HTML (`index.html` y `joah.html`) que duplican la cabecera, pie de página, meta tags y variables de estilo.
2. **Dificultad de Escalabilidad Multi-Artista:** Si Rite of Passage incorpora nuevos músicos o DJs, se debe clonar manualmente un archivo HTML entero (`artista2.html`), duplicando más de 300 líneas de código y estilos.
3. **Sin Capa de Servidor para Formularios:** El formulario de contacto (`#enquiry`) realiza una simulación en el frontend; no envía correos, ni se conecta con APIs de mensajería (Resend, SendGrid, WhatsApp Business API).

#### Propuestas de Mejora:
* **Adopción de Meta-Framework Moderno (Astro recomendado):**
  - **¿Por qué Astro?** Es ideal para sitios de portafolio y marcas de lujo orientadas a contenido. Ofrece **0 KB de JavaScript por defecto** (*Islands Architecture*), soporte nativo para SSR o SSG, renderizado ultrarrápido y optimización automática de imágenes con el componente `<Image />`.
  - **Alternativa (Next.js 15+ App Router):** Si a futuro se contempla un portal de clientes con login para coordinar riders técnicos, cotizaciones privadas o gestión de eventos en tiempo real.
* **Rutas Dinámicas:** Crear la ruta `/artistas/[slug]` para renderizar perfiles de artistas dinámicamente desde archivos Markdown, JSON o un Headless CMS (Sanity, Strapi o Decap).
* **API Endpoints Serverless:** Implementar `/api/contact` con validación en servidor, protección contra bots (Cloudflare Turnstile) y envío automatizado de correos transaccionales.

---

### C. Estructura de Datos, Tipado y Dominio

#### Hallazgos Actuales:
1. **Datos Embebidos en el DOM:**
   - La lista de 10 servicios está escrita a mano directamente en el HTML.
   - Las marcas, credenciales académicas y formatos de show están acoplados a la estructura visual.
2. **Duplicación de Constantes de Contacto:**
   - El teléfono `+54 9 291 407-4772`, el email `adm.riteofpassage@gmail.com` y los enlaces a redes sociales están repetidos en más de 8 lugares en ambos archivos HTML. Si cambia un número, hay riesgo de desactualización parcial.
3. **Falta de Tipos Fuertes:** No existe TypeScript en el proyecto. No hay interfaces de entidades (`Artist`, `Service`, `EventQuote`, `Testimonial`, `ShowFormat`).
4. **Ausencia de Datos Estructurados (Schema.org):** No hay microdatos JSON-LD que indiquen a Google que el sitio representa una `LocalBusiness` / `MusicGroup` / `EntertainmentBusiness` ni a `Joa Lamtzev` como `Person` / `MusicArtist`.

#### Propuestas de Mejora:
* **Centralización de Configuración:** Crear un archivo de configuración único (`src/data/siteConfig.ts`) con información de contacto, redes y metadatos globales.
* **Modelado con TypeScript e Interfaces:**
  ```typescript
  export interface ServiceItem {
    id: string;
    number: string;
    category: 'produccion' | 'artistas' | 'gestion';
    title: string;
    description: string;
  }

  export interface ShowFormat {
    id: string;
    number: string;
    title: string;
    tag: string;
    description: string;
    image: string;
    badgeStyle?: 'gold' | 'crimson';
  }

  export interface ArtistProfile {
    slug: string;
    name: string;
    role: string;
    subtitle: string;
    bio: string;
    quote: string;
    instruments: string[];
    gear: string[];
    credentials: string[];
    venues: string[];
    formats: ShowFormat[];
    gallery: string[];
    instagram: string;
  }
  ```
* **Esquemas JSON-LD:** Incorporar datos estructurados en el `<head>` para potenciar el SEO orgánico en Google.

---

### D. Modularidad, Subdivisión y Diseño de Componentes

#### Hallazgos Actuales:
1. **Hojas de Estilos Dispersas y Redundantes:**
   - `styles.css` tiene 1,250 líneas y `joah.css` tiene 872 líneas.
   - Ambos declaran variables `:root` con pequeñas discrepancias de color (`--crimson` vs `--crimson-main`, `--gold` vs `--gold-accent`).
   - Existen resets de CSS y fuentes duplicadas.
2. **Falta de Componentes Reutilizables:**
   - Cabecera y Navegación
   - Botón de WhatsApp flotante / insignia
   - Pie de página (Footer)
   - Visor Lightbox para imágenes
   - Tarjetas de formato y tarjetas de artista

#### Propuestas de Mejora:
* **Sistema de Diseño Unificado (Design Tokens):** Unificar paleta de colores, tipografías y espaciados en un único archivo de tokens (`src/styles/tokens.css` o configuración de Tailwind).
* **Desglose en Componentes Atómicos:**
  - `Header.astro` / `Navbar.astro` (con menú móvil colapsable)
  - `HeroVideo.astro` (con fallback responsivo y carga diferida)
  - `PhilosophyQuote.astro` (efecto brasas aislado)
  - `TimelineStory.astro` (riel interactivo)
  - `ServicesFilter.astro` (píldoras y filtrado dinámico)
  - `ArtistCard.astro` & `ArtistHero.astro`
  - `TechRider.astro` & `FormatCard.astro`
  - `AudioPlayer.astro` (reproductor de muestras sonoras)
  - `LightboxModal.astro`
  - `ContactForm.astro`
  - `Footer.astro`

---

### E. Patrones de Diseño, Código Limpio y Corrección de Bugs

#### Hallazgos Actuales:
1. **Bug Crítico en `joah.html` (Líneas 63-70):**
   Los botones de control del carrusel tienen el atributo `onclick="goToHeroSlide(0)"`, pero la función `goToHeroSlide` **no existe en ningún script**, arrojando `Uncaught ReferenceError` en la consola del navegador al hacer click. Además, las imágenes del carrusel no rotan automáticamente.
2. **Fuga de Rendimiento en Canvas (`teamCanvas` en `index.html`):**
   La función de partículas `animate()` ejecuta `requestAnimationFrame` de forma continua e indefinida, incluso cuando el usuario está en el Hero o en el pie de página, consumiendo ciclos de GPU/CPU de manera innecesaria.
3. **Throttling Ausente en Eventos de Scroll:**
   `window.addEventListener('scroll', updateStoryLine)` invoca `getBoundingClientRect()` en cada píxel de desplazamiento sin `requestAnimationFrame` ni desacelerador (*throttle*), provocando *layout thrashing*.
4. **Manejo Anticuado de Formularios:**
   Uso de `alert()` intrusivo ante errores de validación, en lugar de mensajes accesibles en línea integrados en la UI.
5. **Manipulación Insegura del DOM:**
   Mezcla de manipulación directa de estilos (`item.style.display = 'flex'`) con clases CSS, impidiendo transiciones fluidas de salida.

#### Propuestas de Mejora:
* **Observer de Visibilidad para Canvas:** Vincular el ciclo de renderizado del canvas a un `IntersectionObserver` para pausar la animación cuando no esté visible en pantalla.
* **Throttling / Debounce:** Utilizar `requestAnimationFrame` o `lodash.throttle` para oyentes de `scroll` y `resize`.
* **Módulo de Slideshow Autocontenido:** Programar un componente de carrusel accesible con soporte para navegación táctil (touch/swipe), transición por fundido (*crossfade*) y teclado.
* **Validación de Formularios con Notificaciones In-App:** Validaciones en tiempo real mediante estados visuales en los campos (`aria-invalid="true"`) y toast notifications no bloqueantes.

---

### F. Rendimiento Web y Core Web Vitals (LCP, CLS, INP)

#### Hallazgos Actuales:
1. **LCP (Largest Contentful Paint) Severamente Dañado:**
   - La descarga del póster del video (`hero_fuego.gif`, 27.8 MB) y del video (`hero_video.mp4`, 21 MB) retarda el LCP hasta más de 10-15 segundos en conexiones estándar o móviles.
2. **CLS (Cumulative Layout Shift) en Imágenes:**
   - Muchas etiquetas `<img>` carecen de atributos explícitos `width` y `height`, provocando saltos de diseño mientras se descargan las imágenes.
3. **Render Blocking:**
   - Carga síncrona de hojas de estilo pesadas y fuentes externas de Google Fonts sin optimización de `font-display: swap` en todas las variantes.

#### Propuestas de Mejora:
* **Estrategia de Carga del Hero:**
  - Cargar primero una imagen WebP ultraligera de alta calidad con `fetchpriority="high"`.
  - Inicializar el video solo tras el primer evento de interacción o cuando la conexión sea óptima (`navigator.connection.saveData === false`).
* **Atributos Dimensionales en Medios:** Asignar `width`, `height` y `aspect-ratio` a todas las imágenes y contenedores.
* **Lazy Loading Universal:** Incorporar `loading="lazy"` y `decoding="async"` en todas las imágenes por debajo del pliegue (*below the fold*).
* **Preconexión de Fuentes:** Implementar `<link rel="preconnect">` hacia `fonts.googleapis.com` y `fonts.gstatic.com` con autoalojamiento local de fuentes críticas (*self-hosted webfonts* con formato WOFF2) para evitar dependencias externas.

---

### G. UX/UI, Atelier Sonoro y Accesibilidad (a11y)

#### Hallazgos Actuales:
1. **La Paradoja del Sitio Silencioso:** Siendo una firma de arquitectura y curaduría sonora, la web no ofrece ninguna experiencia auditiva. El visitante no puede oír el saxofón de Joa Lamtzev ni las mezclas de DJ sin salir a YouTube o Instagram.
2. **Navegación Móvil Rígida:** En pantallas estrechas (<480px), la barra superior apila los enlaces o los desborda. Falta un menú hamburguesa de alta gama con apertura fluida y fondo difuminado.
3. **Falta de Botón de Contacto Flotante (WhatsApp CTA):** Gran parte de las contrataciones en Sudamérica y eventos privados se inician de forma inmediata por WhatsApp; actualmente el botón está relegado al final de la sección de contacto.
4. **Accesibilidad (WCAG 2.1 AA):**
   - El lightbox no atrapa el foco del teclado (*focus trap*) ni devuelve el foco al botón que lo abrió al cerrarse.
   - Ausencia total de soporte para usuarios con sensibilidad al movimiento (`@media (prefers-reduced-motion: reduce)`). Las partículas continuas y elementos flotantes pueden generar fatiga visual o mareos.
   - Textos dorados o tenues que pueden quedar por debajo de la relación de contraste mínima de 4.5:1 sobre ciertos degradados.

#### Propuestas de Mejora:
* **Reproductor de Audio Minimalista "Atelier Sound":**
  - Barra de audio discreta, fijada o integrada en la cabecera/sección, conmutador play/pause y selector de tracks breves (ej: *01 Saxophone Ambient*, *02 Deep House & Sax Live*, *03 Climax Set*).
  - Efecto de visualizador de onda sutil con CSS / Canvas.
* **Menú Móvil Fullscreen Editorial:** Drawer lateral o cortina translúcida con tipografía editorial grande, enlaces de navegación y acceso directo a WhatsApp.
* **Botonera Flotante Inteligente:** Botón flotante de WhatsApp con mensaje precargado (*"Hola, quisiera consultar disponibilidad para un evento bespoke..."*) que aparece tras scrollear más allá del Hero.
* **Soporte `prefers-reduced-motion`:** Desactivar o suavizar automáticamente las animaciones de flotación, brasas y transiciones 3D cuando el usuario tenga configurada la reducción de movimiento en su sistema operativo.
* **Modal Dialog Accesible:** Implementar `<dialog>` nativo de HTML5 con `showModal()`, bloqueo de scroll de fondo y soporte nativo de la tecla Escape.

---

### H. Estrategia de Testing y Calidad de Software

#### Hallazgos Actuales:
1. **0% de Cobertura de Pruebas:** No existe ningún archivo de prueba en todo el repositorio.
2. **Sin Linters ni Formateadores:** No hay configuración de ESLint, Prettier, Stylelint ni validación de HTML en el proyecto.
3. **Riesgo de Regresiones:** Cualquier cambio en el CSS o en las rutas relativas de assets puede romper el sitio sin alertas previas.

#### Propuestas de Mejora:
* **Pruebas Unitarias (Vitest):**
  - Validación del formato de email y campos obligatorios del formulario.
  - Comprobación de la integridad de los datos de servicios y artistas.
* **Pruebas de Integración y Componentes:**
  - Verificación del comportamiento del filtro de categorías (mostrar/ocultar elementos correspondientes).
  - Verificación de apertura y cierre del lightbox y carrusel.
* **Pruebas End-to-End (Playwright):**
  - Flujo completo de navegación: Home -> Click en Joa Lamtzev -> Explorar dossier -> Volver a Home.
  - Flujo de consulta: Completar formulario -> Verificación de pantalla de confirmación.
  - Detección visual de regresiones (Visual Regression Testing).
* **Automatización CI/CD:** GitHub Actions para correr linters, tests y auditoría automática con Lighthouse en cada Pull Request.

---

### I. SEO, Analítica y Seguridad

#### Hallazgos Actuales:
1. **Metadatos Open Graph Incompletos:** Al compartir el enlace en WhatsApp, iMessage, LinkedIn o Twitter, no hay tarjetas ricas completas con imagen de vista previa personalizada (`og:image`).
2. **Sin Robots.txt ni Sitemap:** No hay `sitemap.xml` para que los motores de búsqueda indexen de manera estructurada las páginas y medios.
3. **Seguridad y Enlaces Externos:** Enlaces con `target="_blank"` deben contar con `rel="noopener noreferrer"` de forma uniforme en todos los puntos para evitar ataques de *tabnabbing*.

#### Propuestas de Mejora:
* **Generación Automática de Sitemap & Robots:** Generar `sitemap.xml` y `robots.txt` orientados a indexar el atelier y sus artistas.
* **Tarjetas Sociales Open Graph & Twitter Cards:** Configurar imágenes de vista previa de 1200x630px en alta resolución con el logo y estética de marca.
* **Política de Seguridad de Contenido (CSP):** Establecer cabeceras de seguridad para mitigar XSS y scripts de terceros maliciosos.

---

## ✅ Master Checklist de Mejoras (Roadmap de Implementación)

### Fase 0: Correcciones Críticas Inmediatas & Limpieza (P0)
- [ ] **Resolver Bug de JavaScript en `joah.html`:** Implementar la función `goToHeroSlide` y el temporizador automático de crossfade en el carrusel de fotos de Joa.
- [ ] **Optimizar Oyente de Canvas:** Pausar el bucle `requestAnimationFrame` del canvas de partículas doradas (`teamCanvas`) cuando el elemento esté fuera del viewport utilizando `IntersectionObserver`.
- [ ] **Limpieza de Archivos Muertos del Repositorio:**
  - [ ] Eliminar la carpeta redundante `imagenes/` (~97 MB) preservando únicamente los assets en uso dentro de `assets/`.
  - [ ] Eliminar el video crudo de edición `assets/_fuentes/video gif.mkv` (~15.7 MB).
  - [ ] Actualizar `.gitignore` para prevenir la inclusión de archivos de video pesados sin procesar y carpetas de backup.
- [ ] **Eliminar o Reemplazar `hero_fuego.gif` (27.8 MB):**
  - [ ] Sustituir por una imagen estática WebP de alta compresión (<100 KB) como atributo `poster` del `<video>`.

---

### Fase 1: Optimización Extrema de Assets y Rendimiento (P0)
- [ ] **Pipeline de Procesamiento de Imágenes:**
  - [ ] Recomprimir las fotos gigantes de escenarios (`escenario_4.jpg`, `escenario_5.jpg`, `escenario_6.jpg`) reduciendo su tamaño de 16 MB a versiones WebP de <250 KB.
  - [ ] Optimizar las imágenes del dossier de Joa (`joa_saxo_14.jpg`, `joa_saxo_15.jpg`, etc.) a formato WebP/AVIF.
  - [ ] Establecer un estándar de nombres en minúsculas y sin espacios (`kebab-case`) para todos los recursos.
- [ ] **Compresión y Distribución del Hero Video:**
  - [ ] Recomprimir `hero_video.mp4` mediante FFmpeg aplicando perfiles web (CRF 27, audio AAC o silenciado, resolución 1080p y 720p).
  - [ ] Proveer versión alternativa WebM para navegadores compatibles.
- [ ] **Eliminación de Cumulative Layout Shift (CLS):**
  - [ ] Añadir atributos explícitos `width` y `height` a todas las etiquetas `<img>` del sitio.
  - [ ] Añadir `loading="lazy"` y `decoding="async"` a todas las imágenes secundarias.
- [ ] **Optimización de Tipografías Web:**
  - [ ] Descargar y alojar localmente los subconjuntos WOFF2 de `Cinzel Decorative`, `Cormorant Garamond` y `Plus Jakarta Sans`.
  - [ ] Añadir la regla CSS `font-display: swap` para evitar bloqueos de renderizado (*FOIT*).

---

### Fase 2: Estructura de Datos y Modelo de Dominio (P1)
- [ ] **Creación del Esquema de Configuración Global:**
  - [ ] Centralizar teléfonos, emails, direcciones, enlaces a Instagram y YouTube en un objeto maestro (`companyConfig`).
- [ ] **Modelado de Servicios y Formatos:**
  - [ ] Extraer el listado de 10 servicios a un archivo de datos estructurado (`services.json` o `services.ts`).
  - [ ] Extraer las credenciales, marcas clientes y formatos de show a estructuras de datos reutilizables.
- [ ] **Modelado de Artistas para Escalabilidad:**
  - [ ] Crear la interfaz `Artist` que permita incorporar fácilmente a futuros artistas de Rite of Passage sin reescribir código HTML.
- [ ] **Inyección de Metadatos y Schema.org (JSON-LD):**
  - [ ] Configurar esquema `LocalBusiness` / `MusicGroup` en la página principal.
  - [ ] Configurar esquema `Person` / `MusicArtist` en la página de Joa Lamtzev.

---

### Fase 3: Migración de Arquitectura a Meta-Framework (SSR/SSG) (P1)
- [ ] **Configuración del Entorno de Proyecto:**
  - [ ] Inicializar proyecto moderno con **Astro** (o Next.js) y TypeScript.
  - [ ] Configurar variables de entorno y reglas de empaquetado.
- [ ] **Estandarización de Estilos y Tokens de Diseño:**
  - [ ] Unificar `styles.css` y `joah.css` en una arquitectura de tokens CSS única (`colors`, `spacing`, `typography`, `shadows`).
- [ ] **Creación del Layout Base y Componentes Compartidos:**
  - [ ] Layout principal (`BaseLayout.astro`) con inyección de metadatos SEO y fuentes.
  - [ ] Componente `Header` interactivo y unificado.
  - [ ] Componente `Footer` editorial unificado.
  - [ ] Componente `WhatsAppBadge` persistente.
- [ ] **Implementación de Rutas Dinámicas:**
  - [ ] Página de inicio (`/`).
  - [ ] Rutas de artistas (`/artistas/[slug]`), convirtiendo la ficha de Joa en el primer registro dinámico.
- [ ] **Endpoint para Formulario de Contacto:**
  - [ ] Crear API route (`/api/contact`) que procese y valide las solicitudes de cotización.
  - [ ] Integrar proveedor transaccional (Resend / SendGrid / webhook hacia CRM o WhatsApp API).

---

### Fase 4: Refactorización de UI/UX, Atelier Sonoro y A11y (P2)
- [ ] **Incorporación del Reproductor Sonoro "Atelier Sound":**
  - [ ] Diseñar reproductor minimalista flotante o embebido en cabecera para preescuchar piezas de saxofón y sets de DJ.
  - [ ] Añadir selector de pistas y animación de onda sonora sincronizada con el estado de reproducción.
- [ ] **Menú Móvil Editorial:**
  - [ ] Diseñar menú drawer responsivo de lujo con efecto glassmorphism para teléfonos y tablets.
- [ ] **Accesibilidad y Microinteracciones:**
  - [ ] Implementar soporte de `@media (prefers-reduced-motion: reduce)` para apagar animaciones de brasas y partículas en usuarios que lo requieran.
  - [ ] Migrar el visor de fotos a elemento accesible `<dialog>` con trampa de foco y navegación por teclado.
  - [ ] Reemplazar llamadas `alert()` en formularios por mensajes de validación contextuales.

---

### Fase 5: Testing, Automatización y Despliegue Continuo (P2)
- [ ] **Configuración de Linters y Formateadores:**
  - [ ] Configurar ESLint con reglas estrictas de TypeScript y a11y.
  - [ ] Configurar Prettier para orden consistente de código.
- [ ] **Implementación de Tests Unitarios (Vitest):**
  - [ ] Testear validación de correos y campos del formulario de contacto.
  - [ ] Testear transformaciones de datos y renderizado condicional de servicios.
- [ ] **Implementación de Tests End-to-End (Playwright):**
  - [ ] Test de flujo de navegación entre Home y dossier de artistas.
  - [ ] Test de filtrado de servicios por categorías.
  - [ ] Test de apertura, navegación y cierre del modal lightbox.
  - [ ] Test de envío satisfactorio del formulario.
- [ ] **Pipeline de CI/CD (GitHub Actions):**
  - [ ] Configurar workflow automático en Pull Requests que ejecute validación de tipos, tests y auditoría de Core Web Vitals con Lighthouse CI.

---

## 🌿 Flujo de Git y Merge

Todo este diagnóstico y hoja de ruta ha sido preparado en una rama dedicada:

```bash
# Rama de trabajo actual
feature/improvements-checklist

# Para revisar los cambios en cualquier momento:
git status
git log -n 5 --oneline

# Para mergear a la rama principal cuando estés listo:
git checkout main
git merge feature/improvements-checklist
git push origin main
```

---

*Documento elaborado desde la perspectiva de Senior Developer para el equipo de desarrollo y producción de **Rite of Passage**.*
