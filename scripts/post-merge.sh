#!/usr/bin/env bash
set -e
pnpm install --frozen-lockfile
# Only run db push if DATABASE_URL is set (avoids failing on machines without DB access)
if [ -n "$DATABASE_URL" ]; then
  pnpm --filter @workspace/db push
fi
