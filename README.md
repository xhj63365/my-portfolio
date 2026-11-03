# Joexu 的作品集 · 文字与光影

基于 **Astro 5 + Tailwind CSS v4** 的个人静态作品集，包含「写作」与「摄影」两个内容集合，支持明暗主题切换。纯静态输出，可部署到 Cloudflare Pages、GitHub Pages、Vercel、Netlify 等任意静态托管。

## 快速开始

```bash
npm install      # 安装依赖
npm run dev      # 本地开发 http://localhost:4321
npm run build    # 生产构建，输出到 dist/
npm run preview  # 本地预览构建产物
```

> 要求 Node.js 18.17+（推荐 20/22 LTS）。`.gitignore` 已忽略 `node_modules/`、`dist/`、`.astro/`。

## 目录结构

```
my-portfolio/
├── astro.config.mjs          # Astro + Tailwind v4 配置
├── package.json
├── tsconfig.json
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署（可选）
├── public/
│   ├── favicon.svg
│   └── images/               # 摄影封面图（以 /images/xxx 引用）
└── src/
    ├── content.config.ts     # 写作 / 摄影内容集合 schema
    ├── layouts/Layout.astro  # 全局布局：导航、页脚、明暗切换
    ├── styles/global.css     # Tailwind 入口 + typography + 暗色选择器
    ├── content/writing/      # 写作 Markdown
    ├── content/photography/  # 摄影 Markdown（含 coverImage）
    └── pages/               # 首页、写作、摄影、关于、404
```

## 如何新增内容

### 写一篇文章

在 `src/content/writing/` 新建 `my-post.md`：

```markdown
---
title: "文章标题"
date: 2026-11-03
summary: "一句话摘要，展示在列表卡片上。"
tags:
  - 随笔
  - 生活
featured: true
---

正文 Markdown……
```

### 加一张照片

1. 图片放进 `public/images/`（如 `public/images/sea.jpg`）；
2. 在 `src/content/photography/` 新建 `sea.md`：

```markdown
---
title: "海边黄昏"
date: 2026-11-03
location: "厦门"
camera: "Sony A7M3 · 35mm f/1.4"
tags:
  - 风光
  - 黄昏
coverImage: "/images/sea.jpg"
featured: true
---

拍摄手记（可选正文）……
```

---

## 部署到 Cloudflare Pages（推荐，免费 CDN）

本项目是**纯静态站点**（Astro `output: static`），因此：

- **不需要** `@astrojs/cloudflare` adapter（它只用于服务端渲染 SSR）；
- Pages 站点运行在 `https://<项目名>.pages.dev` **根路径，不需要配置 `base`**，现有链接与图片直接可用；
- `dist/404.html` 会被 Pages 自动识别为 404 页面。

### 方式 C：连接 GitHub 仓库，push 自动部署（当前所用方式）

在 Cloudflare **Workers & Pages → Create → Pages → 连接到 Git 仓库**后，「设置构建和部署」按下面填：

| 表单项（中文界面） | 填写值 | 说明 |
|---|---|---|
| 项目名称 | `my-portfolio`（可自取） | 决定 `https://<项目名>.pages.dev` |
| 生产部门（生产分支） | `main` | 与本地分支一致即可 |
| 框架预设（Framework preset） | `没有` / None | 保留默认即可，不必选 Astro |
| **构建命令（Build command）** | `npm run build` | 云端执行生产构建 |
| **构建输出目录（Build output directory）** | `dist` | Astro 产物目录，**不要填 `/`** |
| 根目录（高级 / Root directory） | 留空 | 仓库根目录直接含 `package.json` 时留空；若源码在子文件夹才填子目录名 |
| 环境变量（高级，可选） | `NODE_VERSION` = `20` | 避免云端旧 Node 构建 Astro 5 失败，建议加上 |

填完点底部 **保存并部署（Save and Deploy）**。之后每次 `git push` 到 `main` 都会自动 `npm install` + `npm run build` 并发布。

> 前提：GitHub 仓库根目录已存在 `package.json`、`src/`、`public/`（`dist/` 不提交，由云端现场构建）。若构建日志报 `no such file package.json`，说明代码尚未成功 push 到 GitHub。

### 方式 A：网页直接上传（不依赖 Git）

```bash
npm run build        # 生成 dist/
```

Pages → **Direct upload（直接上传）** → 项目命名 → 把 **`dist` 文件夹整个**拖入 → Deploy。注意上传的是 `dist`，不是项目根目录。

### 方式 B：Wrangler 命令行上传

```bash
npm run build
npx wrangler pages deploy dist --project-name=my-portfolio
```

项目已配置快捷命令：

```bash
npm run pages:deploy     # 等价于先 build 再 wrangler pages deploy dist
```

首次 `npx wrangler` 会打开浏览器完成账号授权。

### 自定义域名

Pages 项目 → **Custom domains（自定义域）** → 添加域名，按提示在 DNS 加 CNAME 记录。

---

## 推送到 GitHub（只上传代码）

```bash
git init -b main
git config user.name "你的GitHub昵称"
git config user.email "你的GitHub邮箱"
git add .
git commit -m "init: Astro 作品集初始化"

# 先在 github.com/new 建空仓库（不要勾 README/.gitignore/license），再：
git remote add origin https://github.com/你的用户名/my-portfolio.git
git push -u origin main
```

> HTTPS 推送时 Password 处使用 Personal Access Token（勾选 `repo` 权限），不是登录密码。

## GitHub Pages 自动部署（可选）

项目已内置 `.github/workflows/deploy.yml`。仓库 **Settings → Pages → Source** 选 **GitHub Actions** 即可。注意：普通命名仓库需在 `astro.config.mjs` 设置 `base: '/仓库名'`；若仓库名为 `用户名.github.io` 则无需 `base`。

## 主题与样式说明

- **暗色模式**：给 `<html>` 加 `dark` 类切换；`global.css` 用 `@custom-variant dark` 让 `dark:` 跟随类名；主题脚本内联在 `<head>`，首帧不闪白。
- **Markdown 排版**：`@tailwindcss/typography` 通过 `@plugin` 注册，详情页用 `prose prose-stone dark:prose-invert`。

## 其他静态托管

Vercel / Netlify：构建命令 `npm run build`，输出目录 `dist`，同样无需 adapter 与 `base`。
