---
name: frontend-data-fetching
description: Keep Next.js/React UIs fast and avoid excessive API requests. Use when fetching data, wiring ViewModels, TanStack Query, forms, lists, polling, or reviewing frontend network/performance behavior.
---

# Frontend — menos peticiones, más agilidad

Aplica en `apps/web` (MVVM): Views no hacen `fetch`; ViewModels/Models controlan red.

## Reglas

1. Preferir **Server Components / fetch en servidor** para datos de landing (proyectos, servicios).
2. En cliente: deduplicar, cachear y evitar waterfalls (paralelo con `Promise.all` cuando independizan).
3. No refetch en cada keystroke: debounce en búsqueda; submit solo en acciones explícitas.
4. Listas: una request paginada; no N+1 por ítem en el cliente.
5. Revalidar con criterio (ISR/tags/`revalidate`) en vez de polling agresivo.
6. Si usas TanStack Query: `staleTime` sensato; `enabled` solo cuando hay params válidos.
7. No spamear el API de contacto/leads: disable submit mientras `isLoading`.

## Checklist

- [ ] ¿Se puede resolver en SSR/SSG sin client fetch?
- [ ] ¿Hay requests duplicadas al montar?
- [ ] ¿Waterfalls evitables?
- [ ] ¿Loading/error sin reintentos infinitos?
