import configPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
};

const withPWA = configPWA({
  dest: 'public',
  disable:
    process.env.NODE_ENV === 'development' ? process.env.DISABLE_PWA : false,
  register: true,
  skipWaiting: true,
});

export default withPWA(nextConfig);
