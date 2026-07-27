// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/ar',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/ar/:path*',
        destination: '/en/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;