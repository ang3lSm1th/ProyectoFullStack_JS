#!/usr/bin/env bash
set -euo pipefail

pnpm install --frozen-lockfile --filter @portfolio/api...
pnpm --filter @portfolio/api build

if [ -n "${DATABASE_URL:-}" ]; then
  pnpm --filter @portfolio/api exec prisma migrate deploy
fi
