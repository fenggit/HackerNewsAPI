#!/usr/bin/env node
/**
 * Wrangler 命令包装器
 * 将 wrangler 命令转换为 wrangler pages 命令
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PROJECT_NAME = 'hackernews-api';
const BUILD_DIR = '.next';

// 获取所有命令行参数
const args = process.argv.slice(2);
const command = args[0]; // 第一个参数是子命令

// 处理不同的 wrangler 子命令
if (command === 'deploy') {
  // wrangler deploy -> wrangler pages deploy
  const pagesArgs = args.slice(1); // 移除 'deploy'
  const command = `npx wrangler pages deploy ${BUILD_DIR} --project-name=${PROJECT_NAME} ${pagesArgs.join(' ')}`;
  try {
    console.log('Converting wrangler deploy to wrangler pages deploy...');
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error('Deployment failed:', error.message);
    process.exit(1);
  }
} else if (command === 'versions' && args[1] === 'upload') {
  // wrangler versions upload -> wrangler pages versions upload
  const pagesArgs = args.slice(2); // 移除 'versions' 和 'upload'
  const command = `npx wrangler pages versions upload ${BUILD_DIR} --project-name=${PROJECT_NAME} ${pagesArgs.join(' ')}`;
  try {
    console.log('Converting wrangler versions upload to wrangler pages versions upload...');
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error('Version upload failed:', error.message);
    process.exit(1);
  }
} else {
  // 其他命令，直接传递给真实的 wrangler
  const command = `npx wrangler ${args.join(' ')}`;
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error('Command failed:', error.message);
    process.exit(1);
  }
}

