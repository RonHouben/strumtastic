/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  transpilePackages: ['ui', 'audio-engine'],
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
};

module.exports = nextConfig;
