import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Changed from "standalone" to use default for Cloudflare Pages
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // 禁用 Next.js 热重载，由 nodemon 处理重编译
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    if (dev) {
      // 禁用 webpack 的热模块替换
      config.watchOptions = {
        ignored: ["**/*"], // 忽略所有文件变化
      };
    }
    return config;
  },
  eslint: {
    // 构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
  images: {
    // Cloudflare Pages doesn't support Next.js Image Optimization
    unoptimized: true,
  },
};

export default nextConfig;
