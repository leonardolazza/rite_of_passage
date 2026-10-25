export interface ShowFormat {
  number: string;
  title: string;
  pill?: string;
  pillStyle?: 'gold' | 'crimson';
  description: string;
  image: string;
  cta: string;
  waMessage: string;
}

export interface ArtistProfile {
  slug: string;
  name: string;
  role: string;
  tag: string;
  badge: string;
  avatar: string;
  headline: string;
  headlineEm: string;
  heroParagraph: string;
  quote: string;
  slideshow: string[];
  formats: ShowFormat[];
  manifestoBg: string;
  credentials: {
    educationTitle: string;
    education: string[];
    venuesTitle: string;
    venuesSubtitle: string;
    venues: string[];
    techRider: {
      title: string;
      description: string;
    };
  };
  instagram: {
    handle: string;
    url: string;
    headline: string;
    desc: string;
    stats: Array<{ val: string; lbl: string }>;
    mockupImage: string;
  };
}

export const artists: ArtistProfile[] = [
  {
    slug: 'joa-lamtzev',
    name: 'Joa Lamtzev',
    role: 'Saxofonista y DJ',
    tag: 'MÚSICO DE ATELIER',
    badge: 'MÚSICO DE ATELIER · RITE OF PASSAGE',
    avatar: '/assets/joah_5.jpg',
    headline: 'La elegancia del contemporáneo.',
    headlineEm: 'saxofón',
    heroParagraph: 'Joa Lamtzev esculpe la atmósfera de veladas exclusivas a través del saxofón. Una curaduría sonora impecable donde el virtuosismo clásico se entrelaza con la sofisticación moderna y los ritmos de vanguardia.',
    quote: 'Me gusta pensar que la música nos conecta más allá de las palabras; el saxofón es mi manera de hacer que esa conexión se sienta.',
    manifestoBg: '/assets/joah/joah_inicio.webp',
    slideshow: [
      '/assets/joah/joa_saxo_13.webp',
      '/assets/joah/joa_saxo_14.webp',
      '/assets/joah/joa_saxo_15.webp',
      '/assets/joah/joa_saxo_10.webp',
      '/assets/joah/joa_saxo_11.webp',
      '/assets/joah/joa_saxo_7.webp'
    ],
    formats: [
      {
        number: '01',
        title: 'Sax Live',
        description: 'Interpretaciones de saxofón en vivo diseñadas para acompañar distintos momentos del evento con elegancia y presencia.',
        image: '/assets/joah/joa_saxo_12.webp',
        cta: 'Consultar Formato Sax Live ↗',
        waMessage: 'Hola Joa / Rite of Passage, quisiera consultar disponibilidad para el formato *Sax Live*.'
      },
      {
        number: '02',
        title: 'DJ Set',
        pillStyle: 'crimson',
        description: 'Sesiones de electrónica con foco en el groove y la progresión en pista. Una selección precisa diseñada para marcar el pulso de la noche a través de transiciones sólidas y sonido vanguardista.',
        image: '/assets/joah/joa_saxo_16.webp',
        cta: 'Consultar Formato DJ Set ↗',
        waMessage: 'Hola Joa / Rite of Passage, quisiera consultar disponibilidad para el formato *DJ Set*.'
      },
      {
        number: '03',
        title: 'DJ Set Sax Live',
        description: 'Experiencia musical compuesta íntegramente a medida. Formación instrumental personalizada y ensamble exclusivo para la ocasión.',
        image: '/assets/joah/joa_saxo_17.webp',
        cta: 'Consultar Formato DJ Set Sax Live ↗',
        waMessage: 'Hola Joa / Rite of Passage, quisiera consultar disponibilidad para el formato *DJ Set Sax Live*.'
      }
    ],
    credentials: {
      educationTitle: 'Formación & Maestría',
      education: [
        'Conservatorio de Música de Bahía Blanca: Formación instrumental y académica avanzada.',
        'Masterclasses Internacionales: Juan Torres, Bernardo Monk, Stéphane Belmondo, Chicuelo.',
        'Mentores & Profesores: Sebastián De Amicis, Guillermo García, Rocío Migueles, Lucas Campo, Sebastián Moyano.',
        'Agrupaciones: Orquesta de Saxofones del Conservatorio, El Motín de Aranjuez, Umami, Malva.'
      ],
      venuesTitle: 'Marcas, Venues & Escenarios',
      venuesSubtitle: 'Presentaciones en eventos corporativos y hoteles de lujo de Sudamérica:',
      venues: [
        'Mastercard',
        'Dow Argentina',
        'Banco Macro',
        'Profertil',
        'Codimat',
        'Playa VIK (Punta del Este)',
        'Estancia VIK (José Ignacio)',
        'Bahía VIK',
        'Howard Johnson Resort',
        'Rock en Ría',
        'Festival del Camarón y Langostino'
      ],
      techRider: {
        title: 'Equipamiento Profesional de Alta Gama',
        description: 'Saxofón Alto Yamaha YAS-62 · Consola Pioneer XDJ-RR · Sistema in-ear e inalámbrico adaptable a cualquier escenario.'
      }
    },
    instagram: {
      handle: '@joa.saxx',
      url: 'https://instagram.com/joa.saxx',
      headline: 'Seguí la atmósfera de cada show en vivo',
      desc: 'Backstage de ensayos, registros de galas privadas en resorts de Sudamérica y nuevas exploraciones sonoras de saxofón contemporáneo.',
      stats: [
        { val: '+50K', lbl: 'Reproducciones' },
        { val: 'Live', lbl: 'Stories Semanales' },
        { val: 'VIP', lbl: 'Sets Exclusivos' }
      ],
      mockupImage: '/assets/joah/imagen_joah_instagram.webp'
    }
  }
];

export function getArtistBySlug(slug: string): ArtistProfile | undefined {
  return artists.find(a => a.slug === slug);
}
