/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client', 'prisma'],
  turbopack: {
    resolveAlias: {
      '@': './src',
    }
  },
}

export default nextConfig
