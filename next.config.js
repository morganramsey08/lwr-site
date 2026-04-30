const path = require('path');

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
  sassOptions: {
    /* Combined into one clean array */
    includePaths: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'src/assets/styles')
    ],
  },
};

module.exports = nextConfig;