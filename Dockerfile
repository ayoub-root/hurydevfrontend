FROM node:18-alpine3.17 AS base

# Install dependencies only when needed
FROM base AS deps

WORKDIR /app

ENV ENV_NODE=production
# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm install


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NEXT_PUBLIC_APP_NAME="devWithX"
ENV NEXT_PUBLIC_URL="devwithx.com"
ENV NEXT_PUBLIC_ONLINE_SRV_URI="https://api.devwithx.com/api/v1"
ENV NEXT_PUBLIC_ONLINE_WS_URI="http://devwithx.com"
ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next ./


USER nextjs

EXPOSE 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" npm start