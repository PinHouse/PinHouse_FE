import type { NextConfig } from "next";
import type { Configuration, RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img1.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t1.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "t1.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "k.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        pathname: "/**",
      },
    ],
  },
  webpack(config: Configuration) {
    const fileLoaderRule = config.module?.rules?.find(
      (rule): rule is RuleSetRule =>
        typeof rule === "object" &&
        rule !== null &&
        "test" in rule &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg")
    );

    if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/;

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    } as RuleSetRule);

    return config;
  },
};

export default nextConfig;
