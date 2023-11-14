/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.imgur.com','placeimg.com','www.comercialbenavides.net'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;