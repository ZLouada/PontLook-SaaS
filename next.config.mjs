// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true, // Returns 308 with Location: /en header
      },
    ];
  },
};

export default nextConfig;