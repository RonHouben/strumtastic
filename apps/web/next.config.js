/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  output: 'standalone',
  experimental: {
    appDir: true,
    transpilePackages: ['ui', 'audio-engine'],
  },
};

module.exports = nextConfig;
