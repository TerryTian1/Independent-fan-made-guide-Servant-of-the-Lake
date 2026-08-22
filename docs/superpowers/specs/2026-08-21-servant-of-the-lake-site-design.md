# Servant of the Lake 游戏攻略站设计规格（审核稿）

## 1. 目标

在现有研究项目中新增一个可本地运行、可静态导出、可部署的英文游戏攻略站。首版只建设 9 个高质量、可索引的核心页面，承接现有 19 个关键词，并保持顶部只有 5 个唯一导航目的地。

用户已批准开始本地版实施。当前执行边界是：创建网站代码、安装本地依赖、完成本地浏览器验收；不创建远程仓库、不执行云端部署。

## 2. 已有输入

- `homepage.json`：首页文案、SEO 元数据、页脚和 CTA。
- `keywords.json`：4 个分类、19 个最终关键词。
- `关键词.md`：关键词筛选、合并和过滤记录。
- `关键词素材.md`：官方事实、三天 24 章节、成就、谜题、秘密结局、视频和来源分级。
- `favicon_io/`：完整 Favicon 文件。
- `outputs/.../Servant_of_the_Lake_关键词清单与页面矩阵.xlsx`：关键词和页面规划存档。

当前目录没有网站源码、`package.json`、依赖锁文件或已提交的 Git 历史，因此按新站架构处理。

## 3. 方案比较

### 方案 A：原创静态站（推荐）

在 `site/` 中使用 Next.js App Router、TypeScript、Tailwind CSS 和本地 MDX，从现有素材重新设计页面，不复制单一竞品的 DOM、代码和文案。

优点：版权风险最低；结构最贴合 9 页矩阵；SEO、性能、移动端和无障碍可以从第一天纳入；长期更新成本最低。缺点：首轮实现时间比直接复制略长。

### 方案 B：Codex 复制竞品后重构

复制一个参考站的视觉和结构，再替换成当前项目内容。

优点：首屏和组件搭建快。缺点：容易继承无用依赖、错误语义、竞品追踪代码和不匹配的页面层级；仍需大幅重构才能满足 9 页矩阵，最终节省有限。

### 方案 C：same.new 生成后接管代码

先生成可下载前端，再由 Codex 清理和填充。

优点：适合快速探索视觉方向。缺点：生成结果不稳定，代码边界和可维护性不可控，还需要额外清理；不适合作为内容站正式代码的唯一基础。

### 决策

采用方案 A。方案 B、C 只可作为视觉探索，不进入生产源码。

## 4. 技术架构

- 应用目录：`site/`，与根目录研究资料隔离。
- 框架：Next.js App Router。
- 语言：TypeScript，启用严格模式。
- 内容：本地 MDX；页面在构建期渲染，不依赖数据库或 CMS。
- 样式：Tailwind CSS + CSS 变量。
- 构建：静态导出，`output: "export"`、`trailingSlash: true`。
- 图片：全部放在 `site/public/`；预先压缩，不热链竞品图片；静态导出下关闭 Next 默认图片优化。
- 测试：Vitest、Testing Library、Playwright、axe。
- 包管理：pnpm，并提交 `pnpm-lock.yaml`。
- 部署：用户指定 Cloudflare。首版继续使用 Next.js 静态导出，产物目录为 `site/out/`，后续可按 Cloudflare Pages 的 `Next.js (Static HTML Export)` 预设部署。本轮只生成并验收本地产物，不连接 Cloudflare 账号。

首版不使用服务端数据库、登录、评论、搜索 API、Server Actions、ISR 或在线 CMS。

## 5. 信息架构

### 9 个可索引核心页面

| 编号 | URL | 页面职责 | 关键词 |
|---|---|---|---|
| 1 | `/` | 首页和全站入口 | 品牌词，不堆叠全部长尾词 |
| 2 | `/walkthrough/` | 完整流程分类页 | walkthrough、hint |
| 3 | `/walkthrough/day-1/` | Day 1 九个任务 | day 1 |
| 4 | `/walkthrough/day-2/` | Day 2 八个任务 | day 2 |
| 5 | `/walkthrough/day-3/` | Day 3 七个任务 | day 3 |
| 6 | `/walkthrough/versions/` | Demo 与 Lite | lite walkthrough、demo walkthrough |
| 7 | `/achievements/` | 49 成就与隐藏成就 | 4 个 achievements 关键词 |
| 8 | `/puzzles/` | 五类谜题答案 | 5 个 puzzle 关键词 |
| 9 | `/secrets-endings/` | 秘密、结局和彩蛋 | 3 个 secrets/endings 关键词 |

### 顶部 5 个唯一目的地

1. Home
2. Walkthrough
3. Achievements
4. Puzzles
5. Secrets & Endings

Logo 可链接 Home，但不增加第六个唯一目的地。Day 1、Day 2、Day 3 和 Versions 只出现在 Walkthrough 分类页及站内相关链接中，不直接塞进顶部菜单。

### 工具页面

- `/privacy/`
- `/terms/`
- `/404.html`

Privacy 和 Terms 服务于页脚与合规，设置 `noindex`，不计入 9 个 SEO 核心页面，也不进入顶部导航。

## 6. 视觉设计

- 默认主题：深色，不实现主题切换。
- 背景：近黑灰；正文：高对比浅灰；卡片：略亮于背景。
- 主色：`hsl(152 60% 48%)`；浅色强调：`hsl(152 60% 58%)`。
- 气质：Rusty Lake 的诡秘、克制和旧宅感，但不复制官方或竞品的商标化布局。
- 字体：系统无衬线正文；标题可使用本地托管、许可证清晰的展示字体。
- Hero：游戏名、2–3 句介绍、4 个事实数据、3 个 CTA、官方视频入口。
- 内容页：面包屑、H1、更新时间、快速答案、粘性目录、正文、提示/答案折叠、来源、相关页面。
- 移动端：单栏；目录折叠；表格可横向滚动；触控区域至少 44×44 px。

## 7. 组件边界

### 站点级

- `SiteHeader`：Logo、5 个目的地、移动菜单。
- `SiteFooter`：免责声明、官方链接、Privacy、Terms。
- `Breadcrumbs`：可见面包屑和 BreadcrumbList JSON-LD 共用数据。
- `PageShell`：统一正文宽度、主栏和目录栏布局。

### 内容级

- `TableOfContents`：从显式章节数据渲染，避免运行时扫描 DOM。
- `QuickAnswer`：首屏直接回答搜索问题。
- `HintSteps`：Hint 1、Hint 2、Full Solution 三级渐进揭示。
- `SpoilerBlock`：结局、角色身份和剧情内容二次确认。
- `PuzzleCard`：章节、提示、完整答案、相关流程链接。
- `AchievementChecklist`：按 Day 分组，不把状态写入服务端。
- `SourceList`：按官方、攻略、社区显示来源等级。
- `RelatedGuides`：由路由注册表生成站内链接。

每个组件只负责一种内容表达，MDX 不直接实现布局逻辑。

## 8. 内容数据流

1. 根目录研究文件保留不动，作为原始资料和审计记录。
2. 实施时将 `homepage.json`、`keywords.json` 的站点所需数据复制到 `site/src/content/data/`，此后站点版本成为运行时数据。
3. `page-registry.ts` 定义 9 个核心页面的 slug、标题、描述、关键词、分类、优先级、更新时间和相关页面。
4. 每个内容页使用一个 MDX 文件；路由文件只负责元数据和调用统一 `GuidePage` 模板。
5. 构建前运行内容校验：9 个路由、19 个关键词、元数据长度、唯一 canonical、内部链接和来源字段。
6. 构建生成静态 HTML、`sitemap.xml`、`robots.txt`、manifest 和 404 页面。

## 9. 内容质量规则

- 每页只有一个 H1。
- title 45–60 个英文字符；description 140–160 个英文字符。
- 19 个关键词每个只指定一个主承接页面；允许自然出现，不允许机械重复。
- 每个攻略页包含 Quick Answer、可扫描步骤、至少 2 个相关内链和来源列表。
- Day 1/2/3 按官方 24 章节时间轴组织。
- Puzzles 明确区分 suitcase `374`、briefcase `281` 和隐藏盒 `6294`。
- Secrets 页面把游戏画面事实和社区理论分开。
- `You've Found Him!` 的 `3:05/4:05` 冲突在实机复核前不得写成唯一答案。
- 所有竞争对手内容必须重新组织和改写；不复制整段文字。
- 截图只允许使用自有实机、官方媒体包或获得许可的图片，并记录来源。
- 页面默认不显示结局身份和重大剧情剧透。

## 10. SEO 设计

- 使用 Next.js Metadata API 输出 title、description、canonical、Open Graph 和 Twitter Card。
- 使用文件约定或 Metadata API 接入 Favicon、manifest、robots 和 sitemap。
- 结构化数据只使用与页面真实内容一致的 `WebSite`、`BreadcrumbList` 和 `Article`；不伪造评分、评论、作者资历或不存在的 FAQ。
- 所有核心页面必须能从首页或分类页通过标准 `<a>` 链接访问。Google 官方开发者指南明确要求页面具有独立 URL、可抓取链接和 sitemap。
- canonical 的基础域名由 `NEXT_PUBLIC_SITE_URL` 提供；本地默认 `http://localhost:3000`，生产构建缺少正式域名时阻止发布任务继续。
- Privacy、Terms 设置 `noindex, follow`。

## 11. 统计、广告与外部服务

- 本地首版不加载 GA4、Plausible、Clarity 或广告脚本。
- 页面验收通过后，再通过环境变量启用一种主分析工具；GSC 通过 DNS 或 HTML 验证，不需要运行时 SDK。
- AdSense/Adsterra 不进入首版。只有在内容、隐私政策、CLS 和移动体验合格后再开独立任务。
- 所有第三方脚本启用前需要用户确认服务、ID、隐私文案和加载策略。

## 12. 错误与边界处理

- 不存在的路由返回自定义 404。
- MDX 缺少元数据、关键词重复分配、内部链接不存在或生产域名缺失时，构建前校验失败。
- 外部来源暂时不可用时不阻止本地渲染，但来源检查报告必须列出失败链接。
- 图片缺失时构建失败，不显示远程热链占位图。
- JS 被禁用时，正文、导航和答案内容仍保留在 HTML；只有折叠交互退化为原生 details/summary。

## 13. 验收标准

### 内容与结构

- 9 个核心页面全部可访问，无 404。
- 5 个顶部目的地在桌面和移动端一致。
- 19 个关键词全部且仅映射到一个主页面。
- 每页 title、description、H1、canonical、更新时间、来源和相关内链完整。

### 技术

- `pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm build` 全部通过。
- Playwright 在桌面和移动视口验证 9 个路由。
- 无浏览器控制台错误、无断裂内部链接、无缺失图片。
- 代表页面 Lighthouse：Performance ≥ 90、Accessibility ≥ 95、Best Practices ≥ 95、SEO ≥ 95。
- 375 px、768 px、1440 px 三个宽度无横向页面溢出；只有明确标记的表格容器允许横向滚动。

### 合规与可维护性

- 页脚明确说明是独立粉丝站，与 Rusty Lake 无隶属关系。
- 无竞品代码、竞品图片或大段竞品文案。
- 根目录研究资料保持原样；网站代码集中在 `site/`。
- 远程仓库和 Cloudflare 正式部署只在用户再次批准后创建。

## 14. 阶段门

1. 计划批准：允许创建 `site/` 和安装依赖。
2. 视觉骨架批准：首页和一篇内容页的桌面/移动截图通过后，才批量制作剩余页面。
3. 内容批准：9 页文案、谜题答案和剧透处理通过后，才做发布级 SEO。
4. 本地验收批准：所有核心页面、自动检查和本地浏览器检查通过后，当前实施任务即停止。
5. 远程操作批准：用户后续明确同意后，才创建远程仓库并部署到 Cloudflare。

## 15. 官方技术依据

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx)
- [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)
- [Next.js Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Next.js robots.txt](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Google SEO Guide for Developers](https://developers.google.com/search/docs/fundamentals/get-started-developers)
