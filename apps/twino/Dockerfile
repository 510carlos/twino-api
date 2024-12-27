# Build stage
FROM node:20.18.1 AS buildcontainer

# Accept build-time arguments
ARG MONGODB_URI
ARG NEXT_PUBLIC_URL

# Set environment variables for build
ENV MONGODB_URI=${MONGODB_URI}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}

WORKDIR /app

COPY . ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm run build --filter ./apps/twino

# Runtime stage
FROM node:20.18.1

# Accept build-time arguments again for runtime
ARG MONGODB_URI
ARG NEXT_PUBLIC_URL

# Set runtime environment variables
ENV MONGODB_URI=${MONGODB_URI}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV BUILD_PHASE=false

# Copy necessary files from build stage
COPY --from=buildcontainer /app/node_modules /app/node_modules
COPY --from=buildcontainer /app/apps/twino /app/apps/twino

RUN npm install -g pnpm

WORKDIR /app/apps/twino
EXPOSE 3000

CMD ["pnpm", "start"]
