# Multi-stage Dockerfile for GhostPay Backend

# ============================================
# Development Stage
# ============================================
FROM node:18-alpine AS development

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/database/package.json ./packages/database/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm db:generate

# Expose port
EXPOSE 4000

# Start development server
CMD ["pnpm", "dev:backend"]

# ============================================
# Build Stage
# ============================================
FROM node:18-alpine AS build

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/backend/package.json apps/backend/tsconfig.json ./apps/backend/
COPY packages/database/package.json ./packages/database/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm db:generate

# Build the application
RUN pnpm build:backend

# ============================================
# Production Stage
# ============================================
FROM node:18-alpine AS production

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/database/package.json ./packages/database/
COPY packages/shared/package.json ./packages/shared/

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built application
COPY --from=build /app/apps/backend/dist ./apps/backend/dist
COPY --from=build /app/packages/database/src/generated ./packages/database/src/generated

# Copy Prisma schema for migrations
COPY packages/database/prisma ./packages/database/prisma

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 4000

# Run database migrations and start server
CMD ["sh", "-c", "pnpm db:migrate:deploy && node apps/backend/dist/server.js"]