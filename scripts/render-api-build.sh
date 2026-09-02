#!/usr/bin/env bash
set -euo pipefail

# Render sets NODE_ENV=production; Prisma CLI and Nest CLI are devDependencies.
pnpm install --frozen-lockfile --filter @portfolio/api... --prod=false
pnpm --filter @portfolio/api exec prisma generate
pnpm --filter @portfolio/api exec nest build

if [ -n "${DATABASE_URL:-}" ]; then
  pnpm --filter @portfolio/api exec prisma migrate deploy
fi
