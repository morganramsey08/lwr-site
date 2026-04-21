/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      'admin.lightworkerranch.com', // This allows Vercel to show your WP images
      'secure.gravatar.com',
      '0.gravatar.com',
      '1.gravatar.com',
      '2.gravatar.com',
    ],
  },
}