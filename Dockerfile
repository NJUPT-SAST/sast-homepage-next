# syntax=docker/dockerfile:1.7

# Production Docker image for this Next.js app.
#
# Uses Next.js standalone output to produce a minimal runtime image (~100 MB
# instead of ~500 MB).  The standalone server.js bundles only the dependencies
# it actually imports, so the prod-deps stage is no longer needed.
#
# Recommended build/run path:
#   docker compose up -d --build
#
# Direct Docker build:
#   docker build --secret id=app_env,src=.env -t sast-homepage-next .

# ---------------------------------------------------------------------------
# Stage 1 – install all dependencies (needed by the builder)
# ---------------------------------------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------------------------------------------------------------------------
# Stage 2 – build the Next.js app (standalone output)
# ---------------------------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# .env is mounted as a BuildKit secret because /activities fetches Lark
# calendar data during `next build`.
RUN --mount=type=secret,id=app_env,target=/app/.env,required=true npm run build

# ---------------------------------------------------------------------------
# Stage 3 – minimal runtime image
# ---------------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# standalone/ contains server.js + an auto-traced minimal node_modules tree.
COPY --from=builder /app/.next/standalone ./

# Static files are NOT bundled into standalone — copy them explicitly.
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Ensure the non-root user owns everything so Next.js can write ISR / cache.
RUN chown -R node:node /app
USER node

EXPOSE 3000

CMD ["node", "server.js"]
