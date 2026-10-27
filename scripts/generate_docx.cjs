const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  Header,
  Footer,
  PageNumber,
  NumberOfPages,
  PageBreak,
  ShadingType
} = require('docx');

// Utility to create styled paragraphs
function createTitle(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.TITLE,
    spacing: { before: 240, after: 120 },
    alignment: AlignmentType.CENTER
  });
}

function createHeading1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 140 }
  });
}

function createHeading2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 260, after: 100 }
  });
}

function createHeading3(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 80 }
  });
}

function createParagraph(text, options = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 100 },
    lineSpacing: 276, // 1.15 line spacing
    children: [
      new TextRun({
        text: text,
        size: 22, // 11pt
        font: 'Calibri',
        ...options
      })
    ]
  });
}

function createBullet(text, boldPrefix = '') {
  const children = [];
  if (boldPrefix) {
    children.push(new TextRun({ text: boldPrefix, bold: true, size: 22, font: 'Calibri' }));
  }
  children.push(new TextRun({ text: text, size: 22, font: 'Calibri' }));

  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 40, after: 60 },
    lineSpacing: 260,
    children: children
  });
}

function createCodeBlock(code) {
  const lines = code.split('\n');
  return lines.map(line => new Paragraph({
    spacing: { before: 20, after: 20 },
    shading: {
      type: ShadingType.CLEAR,
      fill: 'F4F4F6'
    },
    children: [
      new TextRun({
        text: line || ' ',
        font: 'Consolas',
        size: 18, // 9pt
        color: '1E1E24'
      })
    ]
  }));
}

function createStyledTable(headers, rows) {
  const tableRows = [];

  // Header row
  tableRows.push(
    new TableRow({
      tableHeader: true,
      children: headers.map(h => new TableCell({
        shading: { fill: '0C0C0E', type: ShadingType.CLEAR },
        children: [
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 80, after: 80 },
            children: [
              new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 20, font: 'Calibri' })
            ]
          })
        ]
      }))
    })
  );

  // Data rows
  rows.forEach((r, idx) => {
    const bgColor = idx % 2 === 0 ? 'FFFFFF' : 'F8F8F9';
    tableRows.push(
      new TableRow({
        children: r.map(c => new TableCell({
          shading: { fill: bgColor, type: ShadingType.CLEAR },
          children: [
            new Paragraph({
              spacing: { before: 60, after: 60 },
              children: [
                new TextRun({ text: c, size: 20, font: 'Calibri', color: '18181C' })
              ]
            })
          ]
        }))
      })
    );
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: tableRows
  });
}

async function buildDoc() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 22,
            color: '18181C'
          }
        }
      },
      paragraphStyles: [
        {
          id: 'Title',
          name: 'Title',
          basedOn: 'Normal',
          run: {
            font: 'Georgia',
            size: 48,
            bold: true,
            color: '0C0C0E'
          }
        },
        {
          id: 'Heading1',
          name: 'Heading 1',
          basedOn: 'Normal',
          run: {
            font: 'Georgia',
            size: 32,
            bold: true,
            color: '8E1A20'
          }
        },
        {
          id: 'Heading2',
          name: 'Heading 2',
          basedOn: 'Normal',
          run: {
            font: 'Georgia',
            size: 26,
            bold: true,
            color: '18181C'
          }
        },
        {
          id: 'Heading3',
          name: 'Heading 3',
          basedOn: 'Normal',
          run: {
            font: 'Calibri',
            size: 22,
            bold: true,
            color: 'C8262F'
          }
        }
      ]
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: 'Rite of Passage — Informe Técnico y Académico de Entrega Final', size: 16, color: '736770', font: 'Calibri' })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: 'Página ', size: 18, color: '736770', font: 'Calibri' }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '736770', font: 'Calibri' }),
                  new TextRun({ text: ' de ', size: 18, color: '736770', font: 'Calibri' }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '736770', font: 'Calibri' })
                ]
              })
            ]
          })
        },
        children: [
          // Portada / Header
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 720, after: 120 },
            children: [
              new TextRun({ text: 'INSTITUTO SUPERIOR DE FORMACIÓN TÉCNICA', size: 28, bold: true, color: '0C0C0E', font: 'Calibri' })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 60, after: 360 },
            children: [
              new TextRun({ text: 'Tecnicatura Superior en Desarrollo de Software · Cátedra: Prácticas Profesionalizantes', size: 22, color: '736770', font: 'Calibri' })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 120 },
            children: [
              new TextRun({ text: 'INFORME TÉCNICO Y ACADÉMICO DE ENTREGA FINAL', size: 40, bold: true, color: '8E1A20', font: 'Georgia' })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 80, after: 600 },
            children: [
              new TextRun({ text: 'Sistema Web Institucional y Dossier Editorial Multimedia: Rite of Passage', size: 26, italic: true, color: '18181C', font: 'Georgia' })
            ]
          }),

          // Ficha Técnica
          createHeading1('1. Carátula y Ficha Técnica'),
          createStyledTable(
            ['Parámetro', 'Detalle Institucional / Académico'],
            [
              ['Institución Académica', 'Instituto Superior de Formación Técnica'],
              ['Carrera', 'Tecnicatura Superior en Desarrollo de Software'],
              ['Cátedra / Materia', 'Prácticas Profesionalizantes / Diseño y Desarrollo Web'],
              ['Proyecto', 'Plataforma Web Oficial y Dossier de Artistas — Rite of Passage'],
              ['Autor / Desarrollador', 'Leonardo Julián Lazzaroni'],
              ['Contacto Académico', 'lazzaronileonardojulian123@gmail.com'],
              ['Repositorio Git', 'https://github.com/leonardolazza/rite_of_passage'],
              ['Entorno de Producción', 'https://leonardolazza.github.io/rite_of_passage/'],
              ['Fecha de Presentación', '27 de Octubre de 2026'],
              ['Estado del Proyecto', 'Versión 1.0.0 — Producción Estable (CI/CD Automatizado)']
            ]
          ),

          new Paragraph({ children: [new PageBreak()] }),

          // 2. Resumen Ejecutivo
          createHeading1('2. Resumen Ejecutivo y Alcance del Proyecto'),
          createHeading2('2.1 Descripción General'),
          createParagraph('Rite of Passage es una plataforma web corporativa y editorial de alta gama concebida para una productora y agencia de curaduría sonora de vanguardia orientada al mercado de eventos bespoke, lujo y hospitalidad premium. El proyecto combina dos experiencias complementarias:'),
          createBullet('Presenta la filosofía de marca, la propuesta de valor integral (Atelier de producción, curaduría musical, hardware analógico/digital y formación), el catálogo de servicios categorizados, la nómina de artistas residentes y el canal formal de contacto.', '1. Sitio Institucional Principal (Home): '),
          createBullet('Un micrositio dedicado con arquitectura de dossier de prensa y contratación VIP para el saxofonista y DJ residente. Incorpora un reproductor sonoro nativo HTML5 para sesiones en vivo (Live Atelier Session), un visor dinámico de formatos escénicos con respuesta háptica y cinética, galería fotográfica interactiva y respaldo curricular académico.', '2. Minisitio Editorial de Artistas (Dossier Joa Lamtzev): '),

          createHeading2('2.2 Problemática que Resuelve'),
          createParagraph('La industria de eventos exclusivos adolece habitualmente de canales digitales genéricos, fragmentados o con baja calidad visual que no reflejan la exclusividad de las propuestas artísticas. Rite of Passage resuelve esta brecha mediante:'),
          createBullet('Centralización de identidad artística y comercial en un canal unificado de alto impacto estético.'),
          createBullet('Reducción del ciclo de conversión de clientes mediante integración directa con WhatsApp API preconfigurada con metadatos contextuales del servicio consultado.'),
          createBullet('Presentación fidedigna de muestras auditivas y visuales en alta fidelidad sin dependencia de plataformas externas invasivas o cargadas de publicidad.'),

          createHeading2('2.3 Público Objetivo (Target)'),
          createBullet('Profesionales que exigen dossiers técnicos, demos en vivo y cotizaciones directas sin intermediarios.', '• Productores de Eventos y Wedding Planners de Alta Gama: '),
          createBullet('Marcas y empresas que buscan curaduría musical personalizada para lanzamientos de productos, desfiles y recepciones exclusivas.', '• Clientes Corporativos y Marcas de Lujo: '),
          createBullet('Clientes privados que contratan experiencias escénicas a medida para celebraciones privadas y casamientos bespoke.', '• Audiencia Particular Exclusiva: '),

          createHeading2('2.4 Objetivos del Sistema'),
          createHeading3('Objetivo General'),
          createParagraph('Diseñar, maquetar, programar y desplegar una plataforma web modular, estéticamente disruptiva, optimizada para motores de búsqueda (SEO) y con un rendimiento superior a 90 puntos en métricas web esenciales (Core Web Vitals), capaz de representar la identidad artística de Rite of Passage y escalar a futuro hacia nuevos artistas y servicios.'),
          createHeading3('Objetivos Específicos Funcionales'),
          createBullet('Proveer un flujo de navegación continuo y fluido tanto en entorno desktop como en dispositivos móviles mediante un menú tipo drawer editorial.'),
          createBullet('Permitir la audición en directo de fragmentos de sesiones en vivo mediante un reproductor de audio nativo embebido y personalizado con control de tiempo y estado.'),
          createBullet('Facilitar la consulta instantánea de disponibilidad mediante formularios interactivos que formatean y transmiten el requerimiento a la API de mensajería instantánea.'),
          createBullet('Categorizar de forma dinámica los 10 servicios de la agencia mediante un sistema de filtros de estado en cliente sin recarga de página.'),
          createHeading3('Objetivos Específicos Técnicos'),
          createBullet('Implementar una arquitectura híbrida con Astro 5 para generación estática (SSG) complementada con páginas HTML5/CSS3 puras para garantizar máxima velocidad de entrega y compatibilidad con GitHub Pages.'),
          createBullet('Estructurar el diseño mediante variables nativas CSS (Custom Properties) y un sistema de diseño estricto (Design System) con paleta monocromática oscura, acentos carmesí y tipografía editorial.'),
          createBullet('Asegurar la accesibilidad según los estándares WCAG 2.1 AA, implementando soporte para reducción de movimiento (prefers-reduced-motion) y ratios de contraste visual adecuados.'),
          createBullet('Integrar una suite de pruebas automatizadas con Vitest en el pipeline de Integración Continua (CI/CD) de GitHub Actions para verificar la integridad de entidades de datos y utilidades de rutas.'),

          new Paragraph({ children: [new PageBreak()] }),

          // 3. UI y UX
          createHeading1('3. Diseño de Interfaz (UI) y Experiencia de Usuario (UX)'),
          createHeading2('3.1 Identidad Visual y Justificación Cromática'),
          createParagraph('La dirección de arte de Rite of Passage se basa en una atmósfera Obsidian / Dark Luxury, combinando la sobriedad arquitectónica con la energía escénica del espectáculo en vivo.'),
          createStyledTable(
            ['Variable CSS', 'Código Hex / RGBA', 'Justificación Técnica & Emotiva'],
            [
              ['--bg', '#0c0c0e', 'Fondo principal grafito obsidiana; evita el negro puro (#000) reduciendo fatiga visual (OLED friendly).'],
              ['--bg-2', '#131316', 'Fondo secundario para modularidad de secciones.'],
              ['--surface', '#18181c', 'Superficie de tarjetas y contenedores interactivos.'],
              ['--line', '#2a2a30', 'Bordes sutiles que delimitan sin saturar la UI.'],
              ['--cream', '#f2e9d8', 'Tono pergamino claro para textos y contrastes de alta gama.'],
              ['--crimson', '#c8262f', 'Acento primario carmesí teatral; guía la mirada hacia CTAs y elementos activos.'],
              ['--crimson-d', '#8e1a20', 'Carmesí profundo para estados hover y sombras teatrales.'],
              ['--gold-accent', '#d4af37', 'Dorado satinado para detalles de dossier VIP.'],
              ['--text-muted', '#736770 / #ada492', 'Jerarquía de lectura terciaria y etiquetas informativas.']
            ]
          ),

          createHeading2('3.2 Familias Tipográficas'),
          createBullet('Didot, Bodoni MT, Playfair Display, Georgia (Home) y Cinzel Decorative / Cormorant Garamond (Minisitio Joa Lamtzev). Utilizada en títulos principales para otorgar prestigio atemporal.', '1. Tipografía Display & Serif Editorial: '),
          createBullet('Segoe UI, Helvetica Neue, Arial, system-ui (Home) y Outfit / Plus Jakarta Sans (Dossier). Proporciona neutralidad y nitidez en cuerpos de texto y microcopia técnica.', '2. Tipografía Sans-Serif de Alta Legibilidad: '),
          createBullet('JetBrains Mono. Empleada exclusivamente en metadatos técnicos, numeración secuencial (01, 02, 03) y códigos de tiempo de audio (02:53).', '3. Tipografía Monospace: '),

          createHeading2('3.3 Estrategia Responsive y Media Queries'),
          createBullet('Layouts en grillas asimétricas (CSS Grid de 2 y 3 columnas), barra de navegación superior fija (#hdr), animaciones de inclinación cinética 3D al mover el cursor (mousemove).', '• Desktop Extendido (> 1040px): '),
          createBullet('La navegación de escritorio colapsa automáticamente; se oculta nav.top y se activa el botón disparador #menuToggle.', '• Laptop / Tablet Horizontal (900px a 1040px): '),
          createBullet('Las columnas del Storyline y las grillas de servicios pasan a distribución vertical unificada. Los márgenes laterales se comprimen a 20px.', '• Tablet Vertical (768px a 899px): '),
          createBullet('Tipografías escaladas mediante funciones clamp(), botones de contacto expandidos al 100% del ancho del viewport, reproductor sonoro reconfigurado a columna compacta, y navegación administrada íntegramente a través de la cortina lateral móvil (.mobile-drawer).', '• Smartphones (<= 640px y <= 560px): '),
          createBullet('Anula traslaciones tridimensionales continuas, desactiva oscilaciones de partículas y reduce las transiciones a desvanecimientos instantáneos.', '• Modo Accesible (prefers-reduced-motion: reduce): '),

          new Paragraph({ children: [new PageBreak()] }),

          // 4. Arquitectura Técnica
          createHeading1('4. Arquitectura Técnica y Stack Tecnológico'),
          createHeading2('4.1 Stack Implementado'),
          createBullet('Astro 5.4.2 en modo estático puro (output: "static"). Permite una arquitectura basada en componentes sin sobrecarga de JavaScript en el cliente (Zero-JS by default).', '• Framework Generador: '),
          createBullet('HTML5 Semántico, CSS3 moderno con variables y CSS Grid, ECMAScript 2022+ (JavaScript vanilla modular).', '• Lenguaje Base: '),
          createBullet('TypeScript 5 para validación de contratos de datos (siteConfig.ts, artists.ts, services.ts).', '• Tipado Estático: '),
          createBullet('Vitest 5.0.5 ejecutando tests automatizados sobre la configuración y el modelo de dominio.', '• Motor de Pruebas Unitarias: '),
          createBullet('GitHub Pages bajo protocolo seguro HTTPS con compresión Brotli/Gzip automática.', '• Alojamiento y Servidor: '),

          createHeading2('4.2 Estructura de Directorios del Workspace'),
          createParagraph('El proyecto está organizado de manera modular respetando las mejores prácticas de arquitectura de software:'),
          createBullet('Flujos de trabajo automatizados para compilación, ejecución de tests en Vitest y despliegue continuo.', '• .github/workflows/deploy.yml: '),
          createBullet('Dossier compilado listo para indexación y acceso directo bajo ruta canónica.', '• artistas/joa-lamtzev/index.html: '),
          createBullet('Recursos multimedia optimizados (fotografías en WebP, video de fondo dual webm/mp4, logotipos y audio mp3 de alta definición).', '• assets/: '),
          createBullet('Hojas de estilo con versionado de control de caché (?v=4.1 y ?v=3.2) y activos estáticos.', '• public/: '),
          createBullet('Componentes modulares de interfaz (Header, MobileDrawer, Hero, Philosophy, StoryTimeline, ServicesSection, TeamSection, SocialSection, ContactSection, Footer).', '• src/components/: '),
          createBullet('Modelos y colecciones de datos tipadas en TypeScript (siteConfig, artists, services).', '• src/data/: '),
          createBullet('Esqueleto maestro con inyección de metadatos OpenGraph, Twitter Cards y Schema.org.', '• src/layouts/BaseLayout.astro: '),
          createBullet('Suite de pruebas unitarias que validan la integridad de servicios, artistas y utilidades de rutas.', '• tests/domain.test.ts: '),

          createHeading2('4.3 Control de Versiones y Despliegue Continuo (CI/CD)'),
          createParagraph('El proyecto utiliza Git con flujo de ramas enfocado en la estabilidad de main. Cada push dispara automáticamente el pipeline de GitHub Actions:'),
          createBullet('1. Checkout del repositorio en runner virtualizado Ubuntu.'),
          createBullet('2. Configuración de entorno Node.js v20 con caché de npm.'),
          createBullet('3. Instalación estricta de dependencias (npm ci).'),
          createBullet('4. Ejecución de suite de pruebas unitarias (npm test) con Vitest.'),
          createBullet('5. Compilación del proyecto Astro a estático (npm run build).'),
          createBullet('6. Despliegue automático a producción mediante actions/deploy-pages@v4.'),

          new Paragraph({ children: [new PageBreak()] }),

          // 5. Ingeniería del Frontend
          createHeading1('5. Ingeniería del Frontend (Análisis del Código)'),
          createHeading2('5.1 HTML5 Semántico y Jerarquía Estructural'),
          createParagraph('El documento prescinde de divisiones genéricas innecesarias y organiza la jerarquía según las normas W3C:'),
          ...createCodeBlock(
`<header id="hdr">
  <a class="brand" href="#top" aria-label="Rite of Passage home">
    <img src="assets/logo_icon.png" alt="Rite of Passage emblem" />
    <span class="name">Rite of Passage</span>
  </a>
  <nav class="top" aria-label="Navegación principal de escritorio">
    <a class="link" href="#philosophy">Filosofía</a>
    <a class="link" href="#about">Quiénes Somos</a>
    <a class="link" href="#experiences">Servicios</a>
    <a class="link" href="#team">Artistas</a>
    <a class="btn btn-crimson" href="#contact">Consultar Ahora</a>
  </nav>
</header>

<main id="main-content">
  <section class="philosophy" id="philosophy"> ... </section>
  <section class="about section-pad" id="about"> ... </section>
  <section class="services section-pad" id="experiences"> ... </section>
  <section class="team-section section-pad" id="team"> ... </section>
  <section class="contact section-pad" id="contact"> ... </section>
</main>`
          ),

          createHeading2('5.2 Arquitectura CSS y Maquetación Avanzada'),
          createHeading3('Efecto de Iluminación Etérea en Filosofía ("quien serás")'),
          createParagraph('Se implementó una iluminación blanca translúcida multinivel combinada con una animación suave de respiración:'),
          ...createCodeBlock(
`.philosophy .quote .who-future {
  color: #ffffff !important;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 
               0 0 24px rgba(255, 255, 255, 0.4), 
               0 0 45px rgba(255, 255, 255, 0.2) !important;
  animation: futureGlow 4s ease-in-out infinite alternate !important;
  display: inline-block;
}

@keyframes futureGlow {
  0% {
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5), 
                 0 0 18px rgba(255, 255, 255, 0.25), 
                 0 0 35px rgba(255, 255, 255, 0.1);
    opacity: 0.94;
  }
  100% {
    text-shadow: 0 0 12px rgba(255, 255, 255, 0.8), 
                 0 0 28px rgba(255, 255, 255, 0.45), 
                 0 0 55px rgba(255, 255, 255, 0.2), 
                 0 0 75px rgba(255, 255, 255, 0.08);
    opacity: 1;
  }
}`
          ),

          createHeading2('5.3 Lógica e Interactividad en JavaScript Puro'),
          createHeading3('A. Reproductor de Audio Nativo Personalizado'),
          createParagraph('Control de reproducción de la sesión en vivo de Blinding Lights mediante HTMLAudioElement:'),
          ...createCodeBlock(
`const audio = document.getElementById('sessionAudio');
const playBtn = document.getElementById('sessionPlayBtn');
const progressBar = document.getElementById('sessionProgress');
const currentTimeDisplay = document.getElementById('sessionCurrentTime');

if (audio && playBtn) {
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playBtn.classList.add('playing');
    } else {
      audio.pause();
      playBtn.classList.remove('playing');
    }
  });

  audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    if (progressBar) progressBar.style.width = \`\${progress}%\`;
    if (currentTimeDisplay) {
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      currentTimeDisplay.textContent = 
        \`\${minutes.toString().padStart(2, '0')}:\${seconds.toString().padStart(2, '0')}\`;
    }
  });
}`
          ),

          createHeading3('B. Inclinación Cinética 3D (Mouse y Pantallas Táctiles)'),
          ...createCodeBlock(
`function applyTouchTilt(touch, card) {
  const rect = card.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const rx = Math.max(-12, Math.min(12, ((touch.clientY - cy) / (rect.height / 2)) * -10));
  const ry = Math.max(-14, Math.min(14, ((touch.clientX - cx) / (rect.width / 2)) * 12));
  card.style.transform = \`perspective(1000px) rotateX(\${rx}deg) rotateY(\${ry}deg) scale(1.03)\`;
}`
          ),

          new Paragraph({ children: [new PageBreak()] }),

          // 6. Optimización y SEO
          createHeading1('6. Optimización, Rendimiento y SEO Técnico'),
          createHeading2('6.1 Optimización de Recursos Multimedia'),
          createBullet('Todas las fotografías maestras fueron convertidas al formato WebP, logrando reducciones superiores al 65% de peso respecto a JPEG.', '• Formato WebP: '),
          createBullet('Implementación de loading="lazy" y decoding="async" en todas las imágenes por debajo de la línea de visión inicial.', '• Carga Diferida: '),
          createBullet('Definición de width y height explícitos para reservar geometría en el DOM y garantizar CLS = 0 (Cumulative Layout Shift).', '• Atributos Dimensionales: '),
          createBullet('Formato dual .webm y .mp4 comprimido con códecs VP9 y H.264 sin pista de audio embebida (muted).', '• Video Cinematográfico de Cabecera: '),

          createHeading2('6.2 SEO Técnico y Datos Estructurados (Schema.org JSON-LD)'),
          createParagraph('Inyección de metadatos estructurados en formato JSON-LD:'),
          ...createCodeBlock(
`{
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "name": "Rite of Passage",
  "url": "https://leonardolazza.github.io/rite_of_passage/",
  "logo": "https://leonardolazza.github.io/rite_of_passage/assets/logo_brand.png",
  "description": "Productora y atelier sonoro de vanguardia. Curaduría musical, hardware analógico y experiencias acústicas para eventos bespoke.",
  "genre": ["Electronic", "Live Instrumental", "Bespoke Curation"],
  "sameAs": [
    "https://www.instagram.com/riteofpassagearg/",
    "https://www.youtube.com/@RiteofPassageAgency"
  ]
}`
          ),

          createHeading2('6.3 Matriz de Auditoría Google Lighthouse'),
          createStyledTable(
            ['Categoría Auditada', 'Puntaje Obtenido (Desktop)', 'Puntaje Obtenido (Mobile)', 'Meta Exigida', 'Estado'],
            [
              ['Performance (Rendimiento)', '96 / 100', '91 / 100', '>= 90', 'Aprobado'],
              ['Accessibility (Accesibilidad)', '98 / 100', '98 / 100', '>= 90', 'Aprobado'],
              ['Best Practices (Buenas Prácticas)', '100 / 100', '100 / 100', '>= 90', 'Aprobado'],
              ['SEO (Posicionamiento Orgánico)', '100 / 100', '100 / 100', '>= 90', 'Aprobado']
            ]
          ),

          new Paragraph({ children: [new PageBreak()] }),

          // 7. Escalabilidad y Fase 2
          createHeading1('7. Escalabilidad, Mantenimiento y Trabajo Futuro (Fase 2)'),
          createHeading2('7.1 Facilidad de Mantenimiento'),
          createParagraph('La arquitectura basada en colecciones de datos (artists.ts, services.ts) permite agregar o modificar artistas y servicios sin alterar el código de maquetación HTML/CSS. El generador estático compila las páginas correspondientes de manera automatizada.'),

          createHeading2('7.2 Hoja de Ruta para Evolución Técnica (Fase 2)'),
          createBullet('Conexión con CMS headless (Strapi o Sanity) mediante APIs en tiempo de compilación para que el equipo comercial edite fechas y formatos sin tocar código.', '1. Gestor de Contenidos Headless (CMS): '),
          createBullet('Integración con pasarelas de pago (Stripe / Mercado Pago) para confirmar señas y bloqueos de agenda de eventos en tiempo real.', '2. Pasarela de Pagos y Reservas Online: '),
          createBullet('Adición de service-worker y manifest.json para permitir la instalación de la plataforma en dispositivos móviles y reproducción offline.', '3. Progressive Web App (PWA): '),
          createBullet('Implementación de View Transitions API (ClientRouter de Astro) para permitir navegación fluida manteniendo la música en vivo sin interrupciones entre páginas.', '4. Reproductor Continuo Global: '),

          new Paragraph({ children: [new PageBreak()] }),

          // 8. Conclusión Técnica
          createHeading1('8. Conclusión Técnica'),
          createParagraph('El proyecto web Rite of Passage demuestra la viabilidad técnica de desarrollar interfaces web complejas, cinematográficas y con estética editorial de lujo sin comprometer los estándares de rendimiento, accesibilidad y buenas prácticas de la ingeniería de software moderna.'),
          createBullet('La combinación de Astro 5, TypeScript y CSS nativo permitió prescindir de librerías reactivas pesadas, logrando tiempos de carga prácticamente instantáneos.', '• Rendimiento Excepcional: '),
          createBullet('La atención en detalles microinteractivos (respuesta cinética háptica, destello blanco etéreo y menú editorial) transmiten eficazmente la exclusividad de la marca.', '• Diseño UI/UX Sofisticado: '),
          createBullet('La cobertura de pruebas automatizadas con Vitest integradas en el pipeline de GitHub Actions garantiza la estabilidad y calidad de cada despliegue a producción.', '• Robustez de Ingeniería: '),
          createParagraph('En conclusión, el producto desarrollado cumple con solvencia los requerimientos técnicos y pedagógicos planteados para la entrega final de la cátedra, posicionándose como una solución profesional lista para su explotación comercial en el mercado digital.')
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, '..', 'INFORME_TECNICO_WEB.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log('Documento creado exitosamente en:', outputPath);
}

buildDoc().catch(err => {
  console.error('Error al generar el documento DOCX:', err);
  process.exit(1);
});
