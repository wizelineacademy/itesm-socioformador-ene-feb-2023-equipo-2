/** @type {import('next').NextConfig} */
require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      'superagent-proxy': false
    };

    return config;
  },
  images: {
    domains: ['s.gravatar.com'],
  },
};