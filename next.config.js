/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NASA_API_KEY: process.env.NASA_API_KEY,
    },
    images: {
        domains: ['mars.jpl.nasa.gov', 'mars.nasa.gov'],
    },
};

module.exports = nextConfig
