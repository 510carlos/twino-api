const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configurations that might exist ...
  webpack: (config) => {
    config.resolve.alias['@/trpc'] = path.resolve(__dirname, '../../packages/trpc/src');
    return config;
  },
};

module.exports = nextConfig;
