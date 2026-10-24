export type ServiceCategory = 'produccion' | 'artistas' | 'gestion';

export interface ServiceItem {
  number: string;
  category: ServiceCategory;
  title: string;
  description: string;
  delay?: string;
}

export const serviceCategories = [
  { id: 'all', label: 'Todos (10)' },
  { id: 'produccion', label: 'Producción & Sonido' },
  { id: 'artistas', label: 'Desarrollo Artístico' },
  { id: 'gestion', label: 'Gestión Comercial' }
] as const;

export const services: ServiceItem[] = [
  {
    number: "01",
    category: "artistas",
    title: "Confección de Presskits",
    description: "Dossiers visuales y técnicos de alto impacto para artistas y presentaciones profesionales."
  },
  {
    number: "02",
    category: "produccion",
    title: "Contenido Audiovisual",
    description: "Producción audiovisual, sesiones sonoras y material promocional de alto impacto.",
    delay: "d1"
  },
  {
    number: "03",
    category: "gestion",
    title: "Contactos Comerciales",
    description: "Vinculación estratégica con marcas, sponsors y venues de primer nivel.",
    delay: "d2"
  },
  {
    number: "04",
    category: "gestion",
    title: "Gestión de Contratos",
    description: "Asesoramiento y redacción de acuerdos contractuales, riders y condiciones de actuación.",
    delay: "d3"
  },
  {
    number: "05",
    category: "artistas",
    title: "Booking y Manejo de Agenda",
    description: "Representación artística, coordinación de fechas y logística para presentaciones."
  },
  {
    number: "06",
    category: "artistas",
    title: "Promoción y Difusión",
    description: "Estrategias de posicionamiento en medios digitales, campañas de lanzamiento y prensa.",
    delay: "d1"
  },
  {
    number: "07",
    category: "produccion",
    title: "Espacio de Práctica y Alquiler de Cabina",
    description: "Cabinas acústicamente tratadas con equipamiento profesional para ensayos y grabaciones.",
    delay: "d2"
  },
  {
    number: "08",
    category: "artistas",
    title: "Escuela de DJs",
    description: "Formación especializada en mezcla, técnica vanguardista y selección musical (nivel inicial e intermedio).",
    delay: "d3"
  },
  {
    number: "09",
    category: "produccion",
    title: "Alquiler de Equipos de Audio & Sonido",
    description: "Consolas Pioneer DJ, sistemas de monitoreo profesional, subwoofers y racks de procesamiento de señal."
  },
  {
    number: "10",
    category: "produccion",
    title: "Montaje y Curaduría de Eventos",
    description: "Calibración acústica inmersiva y dirección artística para veladas exclusivas.",
    delay: "d1"
  }
];
