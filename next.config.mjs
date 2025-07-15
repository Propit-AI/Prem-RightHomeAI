/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/chat/talk',
        destination: '/Zara',
        permanent: false, // Use true if this should be a permanent redirect
      },
    ];
  },
};

export default nextConfig;