#!/bin/bash

# Variables
IMAGE_NAME="twino"
DOCKERFILE_PATH="./apps/twino/Dockerfile"
CONTEXT_DIR="."  # Use root directory for build context
ENV_FILE="./apps/twino/.env.prod"
PLATFORMS="linux/amd64,linux/arm64"  # Platforms for multi-architecture builds
REGISTRY_URL="172.31.201.38:50000"  # Default to local registry, override with argument

# # Ensure Docker and Buildx are installed
# if ! command -v docker &> /dev/null && ! command -v Docker &> /dev/null; then
#     echo "Error: Docker is not installed or not in PATH."
#     exit 1
# fi


# if ! docker buildx version &> /dev/null; then
#     echo "Error: Docker Buildx is not installed or not configured."
#     exit 1
# fi

# Ensure .env.prod exists
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: Environment file not found at $ENV_FILE"
    exit 1
fi

# Extract required environment variables
MONGODB_URI=$(grep ^MONGODB_URI "$ENV_FILE" | cut -d '=' -f2)
NEXT_PUBLIC_URL=$(grep ^NEXT_PUBLIC_URL "$ENV_FILE" | cut -d '=' -f2)

# Check if variables are valid
if [ -z "$MONGODB_URI" ] || [ -z "$NEXT_PUBLIC_URL" ]; then
    echo "Error: Required variables MONGODB_URI or NEXT_PUBLIC_URL not found in $ENV_FILE"
    exit 1
fi

# Log build process
echo "Building multi-architecture Docker image..."
echo "  MONGODB_URI=$MONGODB_URI"
echo "  NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL"
echo "  Platforms: $PLATFORMS"
echo "  Registry: $REGISTRY_URL"

# Build and push the multi-architecture image
docker buildx build --platform "$PLATFORMS" \
  -f "$DOCKERFILE_PATH" \
  --build-arg MONGODB_URI="$MONGODB_URI" \
  --build-arg NEXT_PUBLIC_URL="$NEXT_PUBLIC_URL" \
  -t "$REGISTRY_URL/$IMAGE_NAME" \
  --push "$CONTEXT_DIR"

# Check if the build and push were successful
if [ $? -ne 0 ]; then
    echo "Error: Docker build and push failed. Check your Dockerfile and Buildx setup."
    exit 1
fi

echo "Multi-architecture Docker image built and pushed successfully to $REGISTRY_URL/$IMAGE_NAME"

# Optional: Notify the user about pulling on Raspberry Pi
echo "To pull the image on your Raspberry Pi, run:"
echo "docker pull $REGISTRY_URL/$IMAGE_NAME"
