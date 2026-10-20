# Rite of Passage — Atelier Bespoke & Vanguardia Sonora

Sitio web oficial y plataforma digital de **Rite of Passage**, productora de arquitectura sonora, curaduría musical y diseño de experiencias para eventos de lujo y alta gama.

El proyecto ha sido completamente modernizado, modularizado y optimizado utilizando **Astro 5** y **TypeScript**, manteniendo una fidelidad estética y visual 100% idéntica (pixel-perfect) al diseño original.

---

## 🚀 Resumen de Mejoras Implementadas

### 1. Correcciones Críticas de Performance y Bugs (Paso 1)
- **Slider Táctil y Automático en Páginas de Artistas**: Se resolvió el error de referencia en JavaScript (`goToHeroSlide`) implementando un carrusel crossfade cinemático con soporte para interacción táctil (swipe en móviles) y autoplay con pausa en hover.
- **Canvas de Partículas con IntersectionObserver**: El sistema de partículas doradas en la sección de artistas ahora se pausa automáticamente cuando sale del viewport, reduciendo el consumo de CPU y batería a 0% cuando la sección no está en pantalla.
- **Hero Poster Ligero (-99.8% peso)**: Se sustituyó el poster GIF de 27.8 MB por un fotograma WebP optimizado de 46 KB, acelerando drásticamente el First Contentful Paint (FCP) y Largest Contentful Paint (LCP).

### 2. Optimización Masiva de Multimedia y Repositorio (Paso 2)
- **Compresión WebP Global (-94.8% peso total)**: Todas las imágenes de escenarios, artistas y fondos fueron convertidas por lotes a formato `.webp` de alta fidelidad, reduciendo el peso de activos de más de 100 MB a tan solo 5.2 MB.
- **Limpieza de Archivos Muertos**: Eliminación de archivos innecesarios de video crudo (.mkv de 50MB) y carpetas huérfanas.
- **Control de Versiones**: Configuración de `.gitignore` para excluir `node_modules/`, `dist/`, `.astro/` y temporales del sistema.

### 3. Experiencia Móvil & Conversión Comercial (Paso 4)
- **Mobile Drawer Navigation**: Menú lateral deslizable con estética *glassmorphism*, botón hamburguesa animado en tres fases, cierre accesible con tecla `Escape` o clic en el backdrop, y bloqueo de scroll en el fondo.
- **Validación Accesible y Puente WhatsApp**: Sustitución de los `alert()` invasivos por validación en línea de campos obligatorios, tarjeta de confirmación de propuesta y generación automática de enlace estructurado hacia WhatsApp para agilizar el contacto directo.

### 4. Arquitectura Modular con Astro 5
- **Modularización por Componentes**: El sitio ahora está dividido en componentes reutilizables y limpios en `src/components/`, separando estructura y lógica sin código duplicado.
- **Fidelidad Visual Píxel-Perfect**: Integración directa de las hojas de estilo completas (`public/styles.css` y `public/joah.css`) sin conflictos de scoping (`data-astro-cid`), preservando al 100% tipografías, colores, gradientes y animaciones.
- **Datos Centralizados en TypeScript (`src/data/`)**:
  - `siteConfig.ts`: Teléfonos, correos, descripciones y enlaces sociales.
  - `services.ts`: Catálogo de 10 servicios clasificados por categoría con tipado estricto.
  - `artists.ts`: Perfil de artistas (formatos de show, credentials, equipamiento, instagram) listo para escalar a más integrantes mediante rutas dinámicas `src/pages/artistas/[slug].astro`.

---

## 📁 Estructura del Proyecto

```text
rite-of-passage/
├── dist/                      # Compilación estática final lista para hosting
├── public/                    # Archivos estáticos servidos directamente
│   ├── assets/                # Imágenes WebP optimizadas, logos, videos
│   ├── styles.css             # Estilos globales de la página principal
│   └── joah.css               # Estilos globales de la sección editorial
├── src/
│   ├── components/            # Componentes modulares de Astro
│   │   ├── Header.astro       # Barra de navegación principal y editorial
│   │   ├── MobileDrawer.astro # Menú móvil tipo drawer
│   │   ├── Hero.astro         # Hero con video background y tipografía
│   │   ├── Philosophy.astro   # Cita de filosofía y partículas carmesí
│   │   ├── StoryTimeline.astro# Riel dinámico de fuego y quiénes somos
│   │   ├── ServicesSection.astro # Catálogo de servicios con filtros por categoría
│   │   ├── TeamSection.astro  # Sección de artistas con canvas animado
│   │   ├── SocialSection.astro# Redes oficiales (Instagram & YouTube)
│   │   ├── PullQuote.astro    # Cita destacada con background crossfade
│   │   ├── ContactSection.astro # Formulario validado y botón WhatsApp
│   │   ├── Footer.astro       # Pie de página general y editorial
│   │   └── Lightbox.astro     # Visor modal de imágenes en alta resolución
│   ├── data/                  # Fuentes de datos centralizadas en TypeScript
│   │   ├── siteConfig.ts      # Datos de contacto, teléfonos y redes
│   │   ├── services.ts        # Catálogo de servicios tipado
│   │   └── artists.ts         # Perfiles artísticos (Joa Lamtzev y futuros)
│   ├── layouts/
│   │   └── BaseLayout.astro   # Layout HTML maestro (meta, OG, estilos)
│   └── pages/
│       ├── index.astro        # Página de inicio
│       └── artistas/
│           └── [slug].astro   # Página dinámica editorial para artistas
├── astro.config.mjs           # Configuración de Astro
├── package.json               # Dependencias y scripts
├── tsconfig.json              # Configuración de TypeScript
└── README.md                  # Este archivo de documentación
```

---

## 🛠️ Comandos y Scripts Disponibles

En la terminal del proyecto, podés ejecutar:

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local en `http://localhost:4321`. |
| `npm run build` | Compila el sitio completo a HTML/CSS/JS estático dentro de `dist/`. |
| `npm run preview` | Levanta un servidor local para previsualizar el build estático de `dist/`. |

---

## 🌐 Despliegue en Producción

Dado que el proyecto utiliza el modo estático de Astro (`output: 'static'`), la carpeta `dist/` resultante de ejecutar `npm run build` puede alojarse en cualquier proveedor moderno sin requerir servidores Node.js activos:

- **Vercel** / **Netlify** / **Cloudflare Pages**
- **GitHub Pages**
- Servidores web tradicionales (**Apache**, **Nginx**, **cPanel**) subiendo directamente el contenido de `dist/`.
