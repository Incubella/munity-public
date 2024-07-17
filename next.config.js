// next.config.js
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "munitydatabucket.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "gateway.pinata.cloud",
      },
    ],
  },

  // async redirects() {
  //     return [
  //       {
  //         source: '/',
  //         destination: '/main',
  //         has: [
  //           {
  //             type: 'host',
  //             value: 'app.munity.ai',
  //           },
  //         ],
  //         permanent: true,
  //       },
  //     ];
  //   },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "/main", // Serve the explore page
  //       has: [{ type: "host", value: "app.munity.ai" }],
  //     },
  //     {
  //       source: "/",
  //       destination: "/settings", // Serve the create page
  //       has: [{ type: "host", value: "create.munity.ai" }],
  //     },
  //   ];
  // },
};
