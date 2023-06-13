/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  transpilePackages: ['ui', 'audio-engine'],
  experimental: {
    appDir: true,
    typedRoutes: false,
    serverActions: true,
  },
};

module.exports = nextConfig;
