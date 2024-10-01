/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*.googleusercontent.*'
      }
    ]
  }
};

export default nextConfig;
