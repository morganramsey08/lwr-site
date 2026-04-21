/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // We remove the timeout and other bloat to keep it simple for Turbopack
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.lightworkerranch.com',
      },
    ],
  },
};

module.exports = nextConfig;