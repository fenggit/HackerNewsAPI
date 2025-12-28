/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages 配置
  // 参考官方文档: https://developers.cloudflare.com/workers/wrangler/commands/#pages
  // Next.js 16 推荐使用 Git 集成方式部署（Cloudflare Pages 原生支持）
}

module.exports = nextConfig

