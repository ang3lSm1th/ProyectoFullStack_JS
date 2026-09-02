# Intranet / CMS (Fase 2)

App **privada**, separada del portafolio público (`apps/web`).

## Responsabilidad

- Login admin (JWT)
- CRUD de proyectos y servicios
- Bandeja de leads / CRM ligero
- Disparar revalidación del cache del sitio público al publicar

## No va aquí

- Landing, SEO ni rutas visitables por clientes → `apps/web`

## API

Consume solo endpoints privados:

- `POST /api/v1/admin/auth/login`
- `/api/v1/admin/projects`, `/services`, `/leads`, …

El visitante **nunca** usa esta app ni necesita leer toda la base de datos para ver el portafolio.

Ver [docs/PLAN_DESARROLLO.md](../../docs/PLAN_DESARROLLO.md) — Fase 2.
