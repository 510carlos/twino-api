FROM node:20-slim AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.25.0 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build the Next.js app
RUN pnpm build

# Production image
FROM node:20-slim AS runner
RUN corepack enable && corepack prepare pnpm@10.25.0 --activate

WORKDIR /app

ENV NODE_ENV=production

# Copy built app
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
