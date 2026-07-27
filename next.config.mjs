// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Note: async redirects() are not supported with output: 'export'.
  // We handle the / to /en redirect in Apache .htaccess instead.
};

export default nextConfig;