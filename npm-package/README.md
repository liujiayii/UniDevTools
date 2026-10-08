# @xiaodou/uni-devtools 发布说明

本目录存放 npm 包的描述文件与同步脚本，包内容即仓库根的 `src/devTools/`。

## 与上游（reborn-net/UniDevTools）的差异

1. `src/devTools/page` 组件内对 `core/`、`tools.vue` 的 **12 处相对引用改为包名绝对引用**
   （`@xiaodou/uni-devtools/core/...`），使页面落盘到业务项目 `src/devTools/page` 后，
   核心逻辑仍从 node_modules 中的 npm 包加载。
2. 新增 `package.json`（bin: `uni-devtools-sync`）与 `bin/uni-devtools-sync.mjs`。

## 打包发布流程

```bash
# 1. 组装发布目录（package.json + bin + 源码）
mkdir -p /tmp/pkg/bin
cp npm-package/package.json /tmp/pkg/
cp npm-package/bin/uni-devtools-sync.mjs /tmp/pkg/bin/
cp -r src/devTools/core src/devTools/page /tmp/pkg/
cp src/devTools/config.js src/devTools/index.js src/devTools/tools.vue /tmp/pkg/

# 2. 核对版本号后发布到公司私有源（publishConfig 已指向云效）
cd /tmp/pkg && npm publish
```

## 版本对应关系

| npm 版本 | 上游 tag | 改动 |
| -------- | -------- | ---- |
| 3.8.1    | v3.81    | 初次打包，未改源码 |
| 3.8.2    | v3.81    | 页面 core 引用改包路径、新增 sync 脚本 |

## 业务项目接入

```bash
pnpm add @xiaodou/uni-devtools   # 私有源
pnpm devtools:sync               # 页面落盘到 src/devTools/page（config.js 仅首次生成）
```

`main.ts` 引用包内入口与配置，页面路由 `devTools/page/index` 注册进分包（root: `devTools/page`）。
