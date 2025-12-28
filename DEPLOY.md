# Cloudflare Pages 部署指南

参考官方文档：[Wrangler Commands](https://developers.cloudflare.com/workers/wrangler/commands/)

## ⚠️ 重要提示

根据 [Cloudflare 官方文档](https://developers.cloudflare.com/workers/wrangler/commands/#pages)，`wrangler pages deploy` 命令用于部署静态文件目录。

**Next.js 16 的 `.next` 目录不是静态文件目录**，它需要 Node.js 运行时环境。因此：

- **推荐使用方案一（Git 集成）**：Cloudflare Pages 原生支持 Next.js 16，通过 Git 集成可以自动处理构建和部署
- **CLI 部署**：目前 `@cloudflare/next-on-pages` 适配器仅支持 Next.js 14-15，不支持 Next.js 16

## 前置要求

1. Cloudflare 账户
2. GitHub 账户
3. 将代码推送到 GitHub 仓库

## 部署步骤

### 方案一：通过 Cloudflare Dashboard（推荐 ⭐）

根据 [Cloudflare 官方文档](https://developers.cloudflare.com/pages/get-started/)，这是**推荐的方式**，Cloudflare Pages 原生支持 Next.js 16，无需额外配置。

#### 首次创建项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** > **Pages**
3. 点击 **Create a project**
4. 选择 **Connect to Git**
5. 授权 Cloudflare 访问你的 GitHub/GitLab 账户
6. 选择你的仓库和分支
7. 配置构建设置（Cloudflare 会自动检测 Next.js）：
   - **Framework preset**: `Next.js`（自动检测）
   - **构建命令**: `npm run build`（自动配置）
   - **Build output directory**: Cloudflare 会自动处理
   - **Root directory**: `/` (项目根目录)
   - **Node.js version**: `20` 或更高版本（Next.js 16 需要 >= 20.9.0）
8. 点击 **Save and Deploy**

Cloudflare Pages 会自动：
- 检测 Next.js 框架
- 运行构建命令
- 处理 API 路由和动态路由
- 部署到 `*.pages.dev` 域名

#### 工作原理

根据 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/framework-guides/nextjs/)，Cloudflare Pages 原生支持 Next.js（包括 Next.js 16），通过 Git 集成时会自动：
- 使用正确的构建配置
- 处理动态路由和 API 路由
- 优化输出和性能

### 方案二：使用 Wrangler CLI（需要降级 Next.js）

⚠️ **注意**：此方案需要将 Next.js 降级到 15.x 版本，因为 `@cloudflare/next-on-pages` 目前不支持 Next.js 16。

如果你想使用 CLI 部署，需要：

1. **降级 Next.js 到 15.x**：
```bash
npm install next@^15.0.0
```

2. **安装适配器**：
```bash
npm install --save-dev @cloudflare/next-on-pages
```

3. **更新构建脚本**（在 `package.json` 中）：
```json
{
  "scripts": {
    "build": "next build",
    "pages:build": "npx @cloudflare/next-on-pages",
    "deploy": "npm run pages:build && wrangler pages deploy .vercel/output/static --project-name=hackernews-api"
  }
}
```

4. **部署**：
```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 构建并部署
npm run deploy
```

## 故障排除

### 问题：部署时出现 "An internal error occurred"

**可能原因**：
1. Next.js 16 与 `wrangler pages deploy` 不兼容
2. 构建输出目录不正确
3. Cloudflare 服务临时故障

**解决方法**：
1. **使用方案一（Git 集成）**：这是最可靠的方式
2. 如果必须使用 CLI，降级到 Next.js 15
3. 检查 Cloudflare 状态页面：https://www.cloudflarestatus.com/

### 问题：API 路由不工作

确保使用 Cloudflare Pages 的 Git 集成，它会自动处理 Next.js 的 API 路由。

## 注意事项

- **推荐使用 Git 集成**：** 最简单、最可靠，原生支持 Next.js 16
- Cloudflare Pages 会自动为你的项目分配一个 `*.pages.dev` 域名
- 你可以在 Cloudflare Dashboard 中配置自定义域名
- API 路由会自动处理，无需额外配置

## 环境变量

如果需要配置环境变量，可以在 Cloudflare Dashboard 的 Pages 项目设置中添加：
1. 进入项目设置
2. 选择 **Environment variables**
3. 添加变量（可以为生产、预览、开发环境分别配置）

