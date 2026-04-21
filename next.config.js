/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.lightworkerranch.com',
      },
    ],
  },
  // We remove the eslint block since it's causing a warning
};

module.exports = nextConfig;