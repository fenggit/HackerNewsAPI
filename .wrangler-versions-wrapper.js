#!/usr/bin/env node
/**
 * Wrangler 版本上传包装器
 * 将 wrangler versions upload 命令转换为 wrangler pages versions upload
 */
const { execSync } = require('child_process');

const PROJECT_NAME = 'hackernews-api';
const BUILD_DIR = '.next';

// 获取所有命令行参数
const args = process.argv.slice(2);

// 构建 wrangler pages versions upload 命令
const command = `npx wrangler pages versions upload ${BUILD_DIR} --project-name=${PROJECT_NAME} ${args.join(' ')}`;

try {
  console.log('Converting wrangler versions upload to wrangler pages versions upload...');
  console.log(`Executing: ${command}`);
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Version upload failed:', error.message);
  process.exit(1);
}

