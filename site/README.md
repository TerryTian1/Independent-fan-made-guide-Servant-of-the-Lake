# Servant of the Lake Guide — 本地运行说明

这是项目的本地网站源码目录。首版是 Next.js App Router + TypeScript 静态站，可构建为 `out/` 并在后续部署到 Cloudflare Pages。

## 本地打开

```bash
cd "/Users/faithtx/Documents/ChatGPT/热词游戏站/site"
pnpm install
pnpm dev
```

浏览器打开：`http://localhost:3000`

## 交付前检查

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

`pnpm build` 成功后，Cloudflare 可用的静态文件位于 `site/out/`。

## 核心文件

| 文件 | 用途 |
|---|---|
| `src/content/site-data.ts` | 9 个核心页面、5 个顶部导航、19 个关键词归属和 SEO 文案 |
| `src/content/guide-content.ts` | 三天 24 个任务、24 个可错过成就、5 类谜题和代码 |
| `src/components/guide-page.tsx` | 全站攻略页通用布局 |
| `src/components/reveal-blocks.tsx` | 提示、完整答案和剧透折叠 |
| `src/components/content-lists.tsx` | 任务、谜题、成就清单 |
| `src/app/globals.css` | 深色视觉、绿色主色、桌面/移动端响应式布局 |
| `src/app/sitemap.ts` | 9 个核心 URL 的 sitemap |
| `src/app/robots.ts` | 搜索引擎抓取规则 |
| `src/__tests__/` | 页面、导航、关键词、内容数量及折叠交互测试 |

## 页面结构

- `/`
- `/walkthrough/`
- `/walkthrough/day-1/`
- `/walkthrough/day-2/`
- `/walkthrough/day-3/`
- `/walkthrough/versions/`
- `/achievements/`
- `/puzzles/`
- `/secrets-endings/`

## Cloudflare 预留配置

本轮不执行部署。后续批准后，Cloudflare Pages 配置为：

- Root Directory：`site`
- Framework preset：`Next.js (Static HTML Export)`
- Build command：`pnpm build`
- Build output directory：`out`
- Environment variable：`NEXT_PUBLIC_SITE_URL=https://正式域名`

站点不使用 Vercel 专有运行时功能，不包含数据库、登录、广告或统计脚本。
