/** @type {import('next').NextConfig} */
// module.exports = {
//   env: {
//     OPENAI_API_KEY: process.env.OPENAI_API_KEY,
//   },
// };
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
}


export default nextConfig