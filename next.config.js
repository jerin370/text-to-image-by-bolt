/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  env: {
    FAL_KEY: process.env.FAL_KEY,
  },
};

module.exports = nextConfig;