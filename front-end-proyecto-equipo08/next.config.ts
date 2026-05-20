/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        '*.github.dev',              // Permite cualquier subdominio de GitHub Codespaces
        'localhost:3000'             // Mantiene el acceso local por si acaso
      ],
    },
  },
};

export default nextConfig;