// next.config.js


/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de las imágenes
  images: {
    // Lista de dominios permitidos para cargar imágenes externas
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Dominio de Google para imágenes de perfil
        port: '',
        pathname: '**', // Permite cualquier ruta dentro de ese dominio
      },
    ],
  },
};

export default nextConfig;