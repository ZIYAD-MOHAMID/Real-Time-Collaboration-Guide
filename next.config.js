/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  serverExternalPackages: ["@prisma/client", "prisma"],
  turbopack: {
    resolveAlias: {
      "@": "./src",
    },
  },
  output: "standalone",
};

export default nextConfig;
