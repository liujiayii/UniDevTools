#!/usr/bin/env node
/**
 * uni-devtools-sync
 * 将 node_modules 中的 UniDevTools 调试页面同步到 uni-app 项目的 src/devTools/page 目录。
 *
 * 背景：uni-app 页面必须物理存在于项目 src 下才能注册进 pages.json（node_modules 中的页面
 * 无法被引用），而核心逻辑（core）与配置均已可直接从 npm 包 import，无需落盘。
 *
 * 同步策略：
 * - page/    每次覆盖同步（纯第三方调试 UI，业务不应修改）
 * - config.js 仅在不存在时复制（业务可定制的调试开关，覆盖会丢配置）
 *
 * 用法：在 uni-app 项目根目录执行 `pnpm devtools:sync`（或 npx uni-devtools-sync）。
 */
import { copyFileSync, cpSync, existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { version } = JSON.parse(readFileSync(join(pkgRoot, "package.json"), "utf-8"));
const cwd = process.cwd();
const target = join(cwd, "src", "devTools");

if (!existsSync(join(cwd, "src"))) {
  console.error(`[uni-devtools-sync] 未找到 src 目录，请在 uni-app 项目根目录执行本命令`);
  process.exit(1);
}

// 页面目录：覆盖式同步
cpSync(join(pkgRoot, "page"), join(target, "page"), { recursive: true, force: true });
console.log(`[uni-devtools-sync] page/ 已同步到 ${join(target, "page")}`);

// 配置文件：仅首次生成，避免覆盖业务定制
const configSrc = join(pkgRoot, "config.js");
const configDest = join(target, "config.js");
if (existsSync(configDest)) {
  console.log(`[uni-devtools-sync] config.js 已存在，跳过（保留业务定制，如需重置请手动删除后再同步）`);
} else {
  copyFileSync(configSrc, configDest);
  console.log(`[uni-devtools-sync] config.js 已生成到 ${configDest}`);
}

console.log(`[uni-devtools-sync] UniDevTools v${version} 同步完成`);
