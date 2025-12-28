#!/bin/bash
# 部署脚本：将 wrangler deploy 映射到 wrangler pages deploy

# 获取项目名称（从 wrangler.toml 或环境变量）
PROJECT_NAME=${WRANGLER_PROJECT_NAME:-"hackernews-api"}
BUILD_DIR=${WRANGLER_BUILD_DIR:-".next"}

# 执行 Pages 部署
npx wrangler pages deploy "$BUILD_DIR" --project-name="$PROJECT_NAME" "$@"

