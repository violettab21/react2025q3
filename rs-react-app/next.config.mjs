import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './.next',
  basePath: '/rs-react-app',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        port: '',
        pathname: '/api/character/avatar/**',
        search: '',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
