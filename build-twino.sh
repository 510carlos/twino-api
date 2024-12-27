#!/bin/bash

# Ensure .env.prod exists
if [ ! -f ./apps/twino/.env.prod ]; then
    echo "Error: ./apps/twino/.env.prod file not found!"
    exit 1
fi

# Extract required variables
MONGODB_URI=$(grep ^MONGODB_URI ./apps/twino/.env.prod | cut -d '=' -f2)
NEXT_PUBLIC_URL=$(grep ^NEXT_PUBLIC_URL ./apps/twino/.env.prod | cut -d '=' -f2)

# Check if variables are empty
if [ -z "$MONGODB_URI" ] || [ -z "$NEXT_PUBLIC_URL" ]; then
    echo "Error: Required variables MONGODB_URI or NEXT_PUBLIC_URL not found in .env.prod"
    exit 1
fi

# Log progress
echo "Building Docker image for Twino application with:"
echo "  MONGODB_URI=$MONGODB_URI"
echo "  NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL"

# Build the Docker image
if docker build -f ./apps/twino/Dockerfile \
  --build-arg MONGODB_URI="$MONGODB_URI" \
  --build-arg NEXT_PUBLIC_URL="$NEXT_PUBLIC_URL" \
  -t twino .; then
    echo "Docker image built successfully!"
else
    echo "Error: Docker build failed."
    exit 1
fi
