/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@medonivo/ui',
    '@medonivo/design-tokens',
    '@medonivo/icons',
    '@medonivo/shared-types',
    '@medonivo/validation',
    '@medonivo/auth',
    '@medonivo/contracts',
    '@medonivo/api-client'
  ]
};

module.exports = nextConfig;
