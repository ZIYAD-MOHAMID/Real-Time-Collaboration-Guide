/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client', 'prisma'],
  turbopack: {
    resolveAlias: {
      '@': './src',
    }
  },
  output: 'standalone', 
}

export default nextConfig
