/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.ts/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "ts-loader",
          options: { transpileOnly: true },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
