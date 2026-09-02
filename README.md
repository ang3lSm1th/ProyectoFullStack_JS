# Portfolio Platform (marca personal → consultoría)

Monorepo fullstack: **Next.js** (MVVM) + **NestJS** (MVC modular) + **PostgreSQL**.

## Requisitos

- Node.js 20+
- pnpm 9 (`corepack enable` o `npm i -g pnpm@9`)
- Docker (para PostgreSQL local)

## Arranque rápido

```bash
# 1. Dependencias
pnpm install

# 2. Variables de entorno
cp .env.example .env
cp .env.example apps/api/.env
cp .env.example apps/web/.env.local

# 3. Base de datos (requiere Docker Desktop en marcha)
pnpm db:up

# 4. Desarrollo (web :3000 + api :3001)
pnpm dev
```

> Si Docker no está corriendo, `pnpm db:up` fallará. La Fase 0 (health + landing) igual funciona sin Postgres; la DB se usa desde Fase 1.

- Web: http://localhost:3000  
- API health: http://localhost:3001/api/v1/health  

## Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Web + API en paralelo |
| `pnpm dev:web` | Solo Next.js |
| `pnpm dev:api` | Solo NestJS |
| `pnpm build` | Build de ambos |
| `pnpm start` | Start producción local |
| `pnpm lint` | Lint |
| `pnpm db:up` / `pnpm db:down` | PostgreSQL Docker |
| `pnpm ports:free` | Libera puertos 3000/3001 (Windows) |

> En Windows, `Ctrl+C` a veces cierra solo la terminal y deja `node` vivo → `EADDRINUSE`. Usa `pnpm ports:free` y luego `pnpm dev`.

## PostgreSQL local (aprendizaje)

Ya usamos **PostgreSQL 17 nativo** en Windows + **pgAdmin 4**.

### Reparar / crear DB del proyecto (una vez, como Administrador)

1. Clic derecho en PowerShell → **Ejecutar como administrador**
2. Corre:

```powershell
cd D:\ProyectoFullStack_JS
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\setup-local-postgres.ps1
```

3. Acepta el UAC si aparece.

Eso restaura `pg_hba.conf`, crea usuario/DB `portfolio` y deja auth segura.

### Credenciales del proyecto

| Campo | Valor |
|-------|-------|
| Host | `localhost` |
| Puerto | `5432` |
| Base de datos | `portfolio` |
| Usuario | `portfolio` |
| Contraseña | `portfolio` |
| Superusuario (local) | `postgres` / `postgres` |

`DATABASE_URL` del `.env`:

`postgresql://portfolio:portfolio@localhost:5432/portfolio?schema=public`

### Probar por consola

```powershell
$env:Path = "C:\Program Files\PostgreSQL\17\bin;" + $env:Path
$env:PGPASSWORD = "portfolio"
psql -U portfolio -h localhost -d portfolio
```

Dentro de `psql`: `\dt` (tablas), `\q` (salir).

### Probar con pgAdmin

1. Abre **pgAdmin 4**
2. Register → Server
3. Name: `Local Portfolio`
4. Connection: Host `localhost`, Port `5432`, Database `portfolio`, Username `portfolio`, Password `portfolio`

## Fase 1 — comandos útiles (API)

```bash
cd apps/api
pnpm prisma:migrate   # crea/actualiza tablas
pnpm prisma:seed      # datos demo (servicios/proyectos)
pnpm dev              # API en :3001
```

Endpoints:
- `GET /api/v1/health`
- `GET /api/v1/projects`
- `GET /api/v1/services`
- `POST /api/v1/contact` `{ name, email, message }`

## Arquitectura (público vs intranet)

```
                    INTERNET
                       │
              ┌────────▼────────┐
              │  apps/web       │
              │  (portafolio)   │
              └────────┬────────┘
                       │ GET cacheado + POST /contact
                       ▼
              ┌─────────────────┐
              │   apps/api      │
              │   (NestJS)      │
              └────────┬────────┘
                       │
                       ▼
                ┌─────────────┐
                │ PostgreSQL  │
                └─────────────┘
                       ▲
                       │ /api/v1/admin/* (JWT)
              ┌────────┴────────┐
              │ apps/intranet   │  ← Fase 2, no mezclar con web
              │ (CMS / CRM)     │
              └─────────────────┘
```

- **Visitante:** landing cacheada; no necesita leer toda la DB.
- **Tú (admin):** intranet separada para CRUD y leads.

Reglas en `.cursor/rules/public-intranet-boundary.mdc`.

## Estructura

```
apps/web        → Portafolio público (views / viewmodels / models)
apps/api        → NestJS (módulos MVC; público + admin en fase 2)
apps/intranet   → CMS/CRM interno (Fase 2 — placeholder)
packages/shared → tipos compartidos
docs/           → plan de desarrollo
```

Plan completo: [docs/PLAN_DESARROLLO.md](docs/PLAN_DESARROLLO.md)
