## Use the official Node.js image as the base image
#FROM node:18-alpine3.17 AS builder
#
## Set the working directory
#WORKDIR /app
#
#ENV NEXT_PUBLIC_APP_NAME="HuryDev"
#ENV NEXT_PUBLIC_URL="hurydev.com"
#ENV NEXT_PUBLIC_ONLINE_SRV_URI="http://backend-service/api/v1"
#ENV NEXT_PUBLIC_ONLINE_WS_URI="http://backend-service:8080"
#
## Copy package.json and package-lock.json
#COPY package*.json ./
#
## Install dependencies
#RUN npm install
#
## Copy the rest of the application code
#COPY . .
#
## Build the Next.js app
#RUN npm run build
#
## Use an official Nginx image to serve the build
#FROM nginx:alpine
#
## Copy the built app from the previous stage
#COPY --from=builder /app/.next /usr/share/nginx/html
#
## Copy custom Nginx configuration
#COPY nginx.conf /etc/nginx/conf.d/default.conf
## Expose the port on which the app will run
#EXPOSE 80
#
## Start Nginx
#CMD ["nginx", "-g", "daemon off;"]
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm install


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build
# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NEXT_PUBLIC_APP_NAME="HuryDev"
ENV NEXT_PUBLIC_URL="hurydev.com"
ENV NEXT_PUBLIC_ONLINE_SRV_URI="http://backend-service/api/v1"
ENV NEXT_PUBLIC_ONLINE_WS_URI="http://backend-service:8080"
#
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
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
#COPY nginx.conf /etc/nginx/conf.d/default.conf
USER nextjs

EXPOSE 80

ENV PORT 80

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js