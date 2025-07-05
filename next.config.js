/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    // Résoudre les problèmes de modules avec Privy
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Configuration pour les modules ESM
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
  // Configuration pour les variables d'environnement
  env: {
    NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
    NEXT_PUBLIC_SELF_CERAMIC_API_URL: process.env.NEXT_PUBLIC_SELF_CERAMIC_API_URL,
  },
  // Configuration pour HTTPS local
  server: {
    https: process.env.HTTPS === 'true' ? {
      key: process.env.SSL_KEY_FILE,
      cert: process.env.SSL_CRT_FILE,
    } : false,
  },
};

module.exports = nextConfig; 