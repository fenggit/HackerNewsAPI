# Cloudflare Pages 部署指南

## 前置要求

1. Cloudflare 账户
2. GitHub 账户
3. 将代码推送到 GitHub 仓库

## 部署步骤

### 方法一：通过 Cloudflare Dashboard

#### 配置说明

项目已配置支持以下命令格式：

- **构建命令**: `npm run build`
- **部署命令**: `npx wrangler deploy` 
- **版本命令**: `npx wrangler versions upload`

#### 首次创建项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** 部分
3. 点击 **Create a project**
4. 选择 **Connect to Git**
5. 授权 Cloudflare 访问你的 GitHub 账户
6. 选择你的仓库
7. 配置构建设置：
   - **Framework preset**: Next.js
   - **构建命令**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (项目根目录)
   - **Node.js version**: 20 (或更高版本，Next.js 16 需要 >= 20.9.0)
   - **部署命令**: `node .wrangler-deploy-wrapper.js`
   - **非生产分支部署命令**: `node .wrangler-versions-wrapper.js`（可选）

#### 工作原理

项目包含包装脚本，将 Workers 命令转换为 Pages 命令：
- `.wrangler-deploy-wrapper.js` - 将 `wrangler deploy` 转换为 `wrangler pages deploy .next --project-name=hackernews-api`
- `.wrangler-versions-wrapper.js` - 将 `wrangler versions upload` 转换为 `wrangler pages versions upload .next --project-name=hackernews-api`

**重要说明**：
- 虽然命令格式是 `npx wrangler deploy`，但在 Cloudflare Pages 构建环境中，需要使用 `node .wrangler-deploy-wrapper.js` 来执行正确的 Pages 部署
- 这些包装脚本会在 `npm install` 后自动设置执行权限
- 如果你希望使用 `npx wrangler deploy` 格式，可以在本地或 CI/CD 中配置别名

8. 点击 **Save and Deploy**

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

