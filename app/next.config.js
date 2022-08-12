/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
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
