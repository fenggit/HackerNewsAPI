# Cloudflare Pages 部署指南

## 前置要求

1. Cloudflare 账户
2. GitHub 账户
3. 将代码推送到 GitHub 仓库

## 部署步骤

### 方法一：通过 Cloudflare Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** 部分
3. 点击 **Create a project**
4. 选择 **Connect to Git**
5. 授权 Cloudflare 访问你的 GitHub 账户
6. 选择你的仓库
7. 配置构建设置：
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (项目根目录)
   - **Node.js version**: 20 (或更高版本，Next.js 16 需要 >= 20.9.0)
   - **Deploy command**: 留空（Cloudflare Pages 会自动部署，不需要手动执行 deploy 命令）
8. 点击 **Save and Deploy**

⚠️ **重要提示**：如果配置了 Deploy command，请确保留空或删除。Cloudflare Pages 在构建完成后会自动部署，不需要手动执行 `wrangler deploy` 命令（那是用于 Workers 的，不是 Pages）。

### 方法二：使用 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署到 Cloudflare Pages
npx wrangler pages deploy .next --project-name=hackernews-api
```

## 注意事项

- Cloudflare Pages 会自动为你的项目分配一个 `*.pages.dev` 域名
- 你可以在 Cloudflare Dashboard 中配置自定义域名
- API 路由会自动处理，无需额外配置

## 环境变量

如果需要配置环境变量，可以在 Cloudflare Dashboard 的 Pages 项目设置中添加。

