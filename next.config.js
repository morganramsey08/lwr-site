/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 300, // This gives it 5 minutes instead of 1
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