/** @type {import('next').NextConfig} */
module.exports = {
  typescript: {
    // This allows the build to finish even if there are type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This prevents linting errors from stopping the build
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'admin.lightworkerranch.com',
      'secure.gravatar.com',
    ],
  },
}