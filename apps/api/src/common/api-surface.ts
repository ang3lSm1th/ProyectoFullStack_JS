/**
 * Superficie pública de la API (visitantes del portafolio).
 * Fase 2+: todo lo administrativo vive bajo /api/v1/admin/* en módulos con JWT.
 */
export const PUBLIC_API_ROUTES = {
  health: 'GET /api/v1/health',
  projects: 'GET /api/v1/projects',
  services: 'GET /api/v1/services',
  contact: 'POST /api/v1/contact',
} as const;

/** Prefijo reservado para la intranet — no implementado hasta Fase 2. */
export const ADMIN_API_PREFIX = '/api/v1/admin';
