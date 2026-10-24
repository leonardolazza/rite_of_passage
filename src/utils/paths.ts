/**
 * Utilitario para normalizar rutas y assets con soporte de BASE_URL (GitHub Pages / Localhost)
 */
export function withBase(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('//') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('data:')
  ) {
    return path;
  }
  // Si es un ancla pura en la página actual (#contact, #top, etc.)
  if (path.startsWith('#')) {
    return path;
  }
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
