#!/usr/bin/env node
/**
 * Wrangler 部署包装器
 * 将 wrangler deploy 命令转换为 wrangler pages deploy
 */
const { execSync } = require('child_process');
const path = require('path');

const PROJECT_NAME = 'hackernews-api';
const BUILD_DIR = '.next';

// 获取所有命令行参数
const args = process.argv.slice(2);

// 构建 wrangler pages deploy 命令
const command = `npx wrangler pages deploy ${BUILD_DIR} --project-name=${PROJECT_NAME} ${args.join(' ')}`;

try {
  console.log('Converting wrangler deploy to wrangler pages deploy...');
  console.log(`Executing: ${command}`);
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}

