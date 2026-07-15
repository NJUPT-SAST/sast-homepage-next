# syntax=docker/dockerfile:1.7

# Production Docker image for this Next.js app.
#
# Recommended build/run path:
#   docker compose up -d --build
#
# Direct Docker build is also possible, but because /activities fetches
# Lark data during Next.js build, pass .env as a BuildKit secret:
#   docker build --secret id=app_env,src=.env -t sast-homepage-next .

# Install all dependencies inside Docker. This stage creates /app/node_modules
# from package-lock.json; it does not copy node_modules from the cloned repo.
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the Next.js app using the dependencies installed in the deps stage.
FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# The app imports server-side Lark helpers from /activities during build.
# Mount .env at /app/.env so Next.js loads it with its normal env-file parser.
# This avoids sourcing .env through sh, which can mangle secrets containing shell characters.
RUN --mount=type=secret,id=app_env,target=/app/.env,required=true npm run build

# Install production-only dependencies inside Docker for the final image.
FROM node:22-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Runtime image: copy only production dependencies, built Next output, and public assets.
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY package.json package-lock.json ./
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Allow the non-root node user to read the app and write ISR/cache files.
RUN chown -R node:node /app
USER node

EXPOSE 3000

CMD ["npm", "run", "start"]
