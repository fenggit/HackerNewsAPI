#!/bin/bash
# 版本上传脚本：将 wrangler versions upload 映射到 wrangler pages versions upload

# 获取项目名称
PROJECT_NAME=${WRANGLER_PROJECT_NAME:-"hackernews-api"}
BUILD_DIR=${WRANGLER_BUILD_DIR:-".next"}

# 执行 Pages 版本上传
npx wrangler pages versions upload "$BUILD_DIR" --project-name="$PROJECT_NAME" "$@"

