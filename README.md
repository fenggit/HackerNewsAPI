# HackerNews API

HackerNews API 代理服务，基于 Next.js 实现，提供所有 HackerNews API 端点的代理功能。

## 功能

1. ✅ 实现所有 [HackerNews API](https://github.com/HackerNews/API) 里面的 API，用于对外提供接口
2. ✅ 首页展示所有 API 的使用方式和传参数
3. ✅ 提供完整的 API 流程图和使用文档（见 [API_FLOW.md](./API_FLOW.md)）

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **TailwindCSS CDN** - 样式框架
- **Cloudflare Pages** - 部署平台

## 本地开发

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看首页。

## API 端点

所有 API 端点都遵循 HackerNews 官方 API 规范：

- `GET /api/v0/item/{id}` - 获取单个 item
- `GET /api/v0/user/{id}` - 获取用户信息
- `GET /api/v0/topstories` - 获取 Top Stories
- `GET /api/v0/newstories` - 获取 New Stories
- `GET /api/v0/beststories` - 获取 Best Stories
- `GET /api/v0/askstories` - 获取 Ask Stories
- `GET /api/v0/showstories` - 获取 Show Stories
- `GET /api/v0/jobstories` - 获取 Job Stories
- `GET /api/v0/updates` - 获取更新信息
- `GET /api/v0/maxitem` - 获取最大 item ID

访问首页查看详细的 API 文档和使用示例。

**📖 详细流程图和使用指南**: 查看 [API_FLOW.md](./API_FLOW.md) 了解完整的业务流程图、典型使用场景和代码示例。

## 部署到 Cloudflare Pages

1. 将代码推送到 GitHub 仓库
2. 在 Cloudflare Dashboard 中创建新的 Pages 项目
3. 连接 GitHub 仓库
4. 构建配置：
   - 构建命令: `npm run build`
   - 输出目录: `.next`
   - Node.js 版本: 20 (或更高版本，Next.js 16 需要 >= 20.9.0)
5. 部署完成后，使用 Cloudflare 提供的默认域名访问

## 项目结构

```
.
├── app/
│   ├── api/
│   │   └── v0/          # API 路由
│   ├── layout.tsx       # 根布局
│   ├── page.tsx         # 首页
│   └── globals.css     # 全局样式
├── package.json
├── tsconfig.json
├── next.config.js
└── wrangler.toml        # Cloudflare 配置
```

## 许可证

MIT
