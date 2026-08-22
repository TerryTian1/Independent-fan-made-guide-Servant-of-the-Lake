# Servant of the Lake Game Guide Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在当前研究项目的 `site/` 子目录中建设一个可本地验收、可静态导出、包含 9 个高质量核心页面的 Servant of the Lake 英文攻略站。

**Architecture:** 根目录继续保存关键词、素材、Excel 和 Favicon 等研究资产；`site/` 是独立 Next.js App Router 应用。内容使用本地 MDX，页面在构建期生成静态 HTML；统一路由注册表驱动导航、元数据、sitemap、面包屑和相关链接。

**Tech Stack:** pnpm、Next.js App Router、React、TypeScript strict、Tailwind CSS、`@next/mdx`、Vitest、Testing Library、Playwright、`@axe-core/playwright`

**Spec:** `docs/superpowers/specs/2026-08-21-servant-of-the-lake-site-design.md`

## Global Constraints

- 用户已批准本地版执行：允许创建 `site/`、安装依赖、构建静态产物并在本地浏览器验收。
- 网站代码只能写入 `site/`；不得覆盖或移动根目录研究文件。
- 首版恰好包含 9 个可索引核心页面和 5 个顶部唯一目的地。
- 19 个关键词必须全部且仅分配给一个主承接页面。
- 默认深色主题，主色 `hsl(152 60% 48%)`，首版不做主题切换。
- 使用原创结构与文案，不复制竞品代码、图片或大段文字。
- 图片只允许来自自有实机、官方媒体资料或明确授权来源。
- `You've Found Him!` 的 `3:05/4:05` 冲突在实机复核前不得发布为唯一答案。
- 本地首版不加载广告、GA4、Plausible 或 Clarity。
- 本轮不创建或推送远程仓库，不连接 Cloudflare，不配置正式域名。后续部署统一使用 Cloudflare，不使用 Vercel。
- 当前实施优先级：核心路由、可读内容、站内导航、响应式布局、Favicon、基础 SEO 和本地浏览器可用性。媒体授权库、复杂结构化数据、Lighthouse 报告归档、广告和分析脚本均不得阻塞本地版交付。

---

## Planned File Structure

```text
site/
├── package.json
├── pnpm-lock.yaml
├── next.config.mjs
├── tsconfig.json
├── eslint.config.mjs
├── vitest.config.ts
├── playwright.config.ts
├── mdx-components.tsx
├── .env.example
├── public/
│   ├── favicon/
│   ├── images/
│   └── media-sources.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── manifest.ts
│   │   ├── walkthrough/
│   │   │   ├── page.tsx
│   │   │   ├── day-1/page.tsx
│   │   │   ├── day-2/page.tsx
│   │   │   ├── day-3/page.tsx
│   │   │   └── versions/page.tsx
│   │   ├── achievements/page.tsx
│   │   ├── puzzles/page.tsx
│   │   ├── secrets-endings/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── components/
│   │   ├── site/
│   │   ├── content/
│   │   └── home/
│   ├── content/
│   │   ├── data/
│   │   └── guides/
│   └── lib/
│       ├── page-registry.ts
│       ├── content-validation.ts
│       ├── metadata.ts
│       └── structured-data.ts
├── tests/
│   ├── content/
│   └── components/
└── e2e/
    ├── core-pages.spec.ts
    ├── navigation.spec.ts
    └── accessibility.spec.ts
```

---

### Task 0: Freeze sources and audit reference-site patterns

**Files:**
- Create: `site/verification/reference-board/`
- Create: `site/verification/reference-audit.md`

**Interfaces:**
- Consumes: the supplied Kotaku, Rusty Lake Fandom and AppUnwrapper references; official Rusty Lake/Steam pages; existing keyword and material files.
- Produces: a dated reference audit that informs the original visual system without copying a competitor implementation.

- [ ] **Step 1: Revalidate every reference in the local browser**

Open each approved source at desktop and mobile widths. Record final URL, HTTP/load result, page role, useful structure and access date. Exclude any 404, login wall, broken asset page or irrelevant result.

- [ ] **Step 2: Search the core query set for current independent guide patterns**

Use the brand query plus `walkthrough`, `achievements`, `puzzles`, `secrets` and `ending`. Ignore Steam, YouTube, Reddit and large publishers when identifying direct independent-site competitors; keep them only as facts, video or community sources.

- [ ] **Step 3: Build a pattern board from two to five distinct references**

Capture only review screenshots of navigation, hero hierarchy, category cards, table of contents, hint/solution reveal, achievement checklist, source block and related-guide links. Do not download competitor site code or republish these screenshots.

- [ ] **Step 4: Write an explicit borrow/avoid audit**

For each pattern, record `Borrow principle`, `Original implementation`, and `Avoid copying`. The audit must confirm that no single reference determines the site’s layout, text, imagery, HTML structure or tracking stack.

- [ ] **Step 5: Verify the frozen inputs**

Confirm that the audit references all 9 planned pages, all 5 top destinations and the content rules for codes, achievements and spoilers. Stop if live sources contradict the existing material; update the research file first instead of silently choosing one answer.

---

### Task 1: Scaffold the isolated static Next.js application

**Files:**
- Create: `site/` and the configuration files listed in Planned File Structure.
- Create: `site/.gitignore`
- Preserve: every existing file outside `site/`.

**Interfaces:**
- Consumes: approved design spec and the existing root project.
- Produces: a minimal static-export Next.js application with lint, typecheck, unit-test and browser-test scripts.

- [ ] **Step 1: Confirm the approval gate and clean target**

Run:

```bash
test ! -e site/package.json
git status --short
```

Expected: `site/package.json` does not exist; existing untracked research files remain visible and untouched.

- [ ] **Step 2: Create an isolated implementation branch**

Run:

```bash
git switch -c codex/servant-of-the-lake-site
git branch --show-current
```

Expected: current branch is `codex/servant-of-the-lake-site`. If the branch already exists, inspect it before switching instead of overwriting it.

- [ ] **Step 3: Scaffold inside `site/`**

Run:

```bash
pnpm dlx create-next-app@latest site --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --yes
cd site
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx remark-gfm rehype-slug rehype-autolink-headings
pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react playwright @axe-core/playwright
```

Expected: `site/package.json` and `site/pnpm-lock.yaml` exist; no root research file changes.

- [ ] **Step 4: Configure static export and MDX**

Create `site/next.config.mjs`:

```js
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
  },
})

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
```

- [ ] **Step 5: Add verification scripts**

Set these scripts in `site/package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "check": "pnpm lint && pnpm typecheck && pnpm test && pnpm build"
  }
}
```

- [ ] **Step 6: Verify the empty application**

Run:

```bash
cd site
pnpm lint
pnpm typecheck
pnpm build
test -f out/index.html
```

Expected: all commands exit 0 and `site/out/index.html` exists.

- [ ] **Step 7: Commit the scaffold**

```bash
git add site/package.json site/pnpm-lock.yaml site/next.config.mjs site/tsconfig.json site/eslint.config.mjs site/src site/public site/.gitignore
git commit -m "chore: scaffold static game guide site"
```

---

### Task 2: Define the 9-page registry and 19-keyword contract

**Files:**
- Create: `site/src/lib/page-registry.ts`
- Create: `site/src/lib/content-validation.ts`
- Create: `site/src/content/data/homepage.json`
- Create: `site/src/content/data/keywords.json`
- Create: `site/tests/content/page-registry.test.ts`
- Create: `site/tests/content/keyword-coverage.test.ts`

**Interfaces:**
- Consumes: root `homepage.json` and `keywords.json` copied once without changing their values.
- Produces: `CORE_PAGES`, `TOP_NAV`, `getPageByKey()`, `validateContentModel()`.

- [ ] **Step 1: Write failing registry tests**

Create `site/tests/content/page-registry.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { CORE_PAGES, TOP_NAV } from '@/lib/page-registry'

describe('page registry', () => {
  it('contains exactly nine indexable core pages', () => {
    expect(CORE_PAGES).toHaveLength(9)
    expect(new Set(CORE_PAGES.map((page) => page.path)).size).toBe(9)
  })

  it('contains exactly five unique top navigation destinations', () => {
    expect(TOP_NAV).toHaveLength(5)
    expect(new Set(TOP_NAV.map((item) => item.href)).size).toBe(5)
  })

  it('keeps metadata within the approved limits', () => {
    for (const page of CORE_PAGES) {
      expect(page.title.length).toBeGreaterThanOrEqual(45)
      expect(page.title.length).toBeLessThanOrEqual(60)
      expect(page.description.length).toBeGreaterThanOrEqual(140)
      expect(page.description.length).toBeLessThanOrEqual(160)
    }
  })
})
```

- [ ] **Step 2: Run the tests and confirm the expected failure**

Run: `cd site && pnpm test tests/content/page-registry.test.ts`

Expected: FAIL because `@/lib/page-registry` does not exist.

- [ ] **Step 3: Implement the registry types and exact metadata**

Define:

```ts
export type PageKey =
  | 'home'
  | 'walkthrough'
  | 'day-1'
  | 'day-2'
  | 'day-3'
  | 'versions'
  | 'achievements'
  | 'puzzles'
  | 'secrets-endings'

export interface PageDefinition {
  key: PageKey
  path: string
  title: string
  description: string
  category: 'Home' | 'Walkthrough' | 'Achievements' | 'Puzzles' | 'Secrets'
  keywords: readonly string[]
  updatedAt: '2026-08-21'
  priority: 'P1' | 'P2'
  related: readonly PageKey[]
}
```

Use these title/description pairs:

```ts
const metadataCopy = {
  home: {
    title: 'Servant of the Lake Wiki — Walkthrough & Achievements',
    description: 'Explore the Servant of the Lake wiki for a complete walkthrough, puzzle solutions, 49 achievements, hidden secrets, endings, and spoiler-aware help.',
  },
  walkthrough: {
    title: 'Servant of the Lake Walkthrough Guide — All 3 Days',
    description: 'Follow the complete Servant of the Lake walkthrough for Day 1, Day 2, and Day 3, with spoiler-light hints, task checklists, puzzles, and video times.',
  },
  'day-1': {
    title: 'Servant of the Lake Day 1 Walkthrough & Puzzles',
    description: 'Complete all nine Day 1 tasks in Servant of the Lake, from The Arrival to Searching the Attic, with puzzle answers and missable achievement warnings.',
  },
  'day-2': {
    title: 'Servant of the Lake Day 2 Walkthrough & Puzzles',
    description: 'Complete all eight Day 2 tasks in Servant of the Lake, including coffee, hunting, bathing, the cellar, suitcase code, and hidden achievements.',
  },
  'day-3': {
    title: 'Servant of the Lake Day 3 Walkthrough & Ending',
    description: 'Finish all seven Day 3 tasks in Servant of the Lake, solve the alchemy and dinner puzzles, find missable achievements, and reach The Departure.',
  },
  versions: {
    title: 'Servant of the Lake Demo & Lite Walkthrough Guide',
    description: 'Finish the free Servant of the Lake Demo and Lite preview with solutions for the cup, breakfast, berry, and exercise puzzles, plus version differences.',
  },
  achievements: {
    title: 'Servant of the Lake Achievements — Complete Guide',
    description: 'Unlock all 49 Servant of the Lake achievements with day-by-day missable checklists, Feeding the Cat help, locked achievement fixes, and secret clues.',
  },
  puzzles: {
    title: 'Servant of the Lake Puzzle Solutions, Hints & Codes',
    description: 'Solve the Servant of the Lake cup, exercise, berry, flowers, and suitcase puzzles with spoiler-light hints, full answers, and the correct codes.',
  },
  'secrets-endings': {
    title: 'Servant of the Lake Endings, Secrets & Easter Eggs',
    description: 'Understand the Servant of the Lake ending, unlock the hidden reveal, follow every secret letter, and find the Mr. Owl Easter egg with spoiler controls.',
  },
} as const
```

- [ ] **Step 4: Write the failing keyword coverage test**

Create `site/tests/content/keyword-coverage.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import keywords from '@/content/data/keywords.json'
import { CORE_PAGES } from '@/lib/page-registry'

describe('keyword coverage', () => {
  it('assigns all nineteen source keywords exactly once', () => {
    const source = keywords.categories.flatMap((category) => category.keywords)
    const assigned = CORE_PAGES.flatMap((page) => page.keywords)
    expect(source).toHaveLength(19)
    expect(new Set(source).size).toBe(19)
    expect([...assigned].sort()).toEqual([...source].sort())
  })
})
```

- [ ] **Step 5: Copy source JSON and assign every keyword**

Copy root JSON values to `site/src/content/data/`. Assign the 7 guide terms to Walkthrough/Day/Versions, 4 achievement terms to Achievements, 5 puzzle terms to Puzzles, and 3 secrets/endings terms to Secrets & Endings. Home receives no long-tail primary keyword.

- [ ] **Step 6: Run registry and coverage tests**

Run: `cd site && pnpm test tests/content/page-registry.test.ts tests/content/keyword-coverage.test.ts`

Expected: 5 tests PASS; 9 pages, 5 navigation destinations and 19 unique keyword assignments.

- [ ] **Step 7: Commit the content contract**

```bash
git add site/src/lib site/src/content/data site/tests/content
git commit -m "feat: define site routes and keyword ownership"
```

---

### Task 3: Build the global dark layout and five-destination navigation

**Files:**
- Modify: `site/src/app/layout.tsx`
- Modify: `site/src/app/globals.css`
- Create: `site/src/components/site/site-header.tsx`
- Create: `site/src/components/site/mobile-nav.tsx`
- Create: `site/src/components/site/site-footer.tsx`
- Create: `site/src/components/site/page-shell.tsx`
- Create: `site/tests/components/site-header.test.tsx`

**Interfaces:**
- Consumes: `TOP_NAV` from Task 2.
- Produces: shared header/footer/layout for every route.

- [ ] **Step 1: Write the failing header test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SiteHeader } from '@/components/site/site-header'

describe('SiteHeader', () => {
  it('renders exactly five unique navigation destinations', () => {
    render(<SiteHeader />)
    const links = screen.getAllByRole('link', { name: /home|walkthrough|achievements|puzzles|secrets/i })
    expect(new Set(links.map((link) => link.getAttribute('href'))).size).toBe(5)
  })
})
```

- [ ] **Step 2: Run the test and confirm failure**

Run: `cd site && pnpm test tests/components/site-header.test.tsx`

Expected: FAIL because `SiteHeader` does not exist.

- [ ] **Step 3: Implement design tokens**

Add these tokens to `globals.css`:

```css
:root {
  --background: 220 14% 7%;
  --surface: 220 12% 11%;
  --surface-raised: 220 11% 15%;
  --foreground: 210 20% 94%;
  --muted: 215 12% 68%;
  --border: 215 12% 22%;
  --nav-theme: 152 60% 48%;
  --nav-theme-light: 152 60% 58%;
  --danger: 4 78% 58%;
  color-scheme: dark;
}
```

Implement focus-visible outlines, reduced-motion handling, readable link underlines, responsive containers and table overflow wrappers.

- [ ] **Step 4: Implement desktop and mobile navigation**

Use semantic `<header>`, `<nav aria-label="Primary">`, standard Next `Link` elements, five unique destinations and a 44 px minimum mobile target. Mobile menu must close after navigation and on Escape.

- [ ] **Step 5: Implement footer and disclaimer**

Footer text must state that the site is an independent fan-made guide and is not affiliated with Rusty Lake. Include official Steam, Discord, YouTube and Servant’s Notes links plus Privacy and Terms.

- [ ] **Step 6: Run component tests and manual keyboard check**

Run:

```bash
cd site
pnpm test tests/components/site-header.test.tsx
pnpm dev
```

Expected: test PASS; Tab reaches every navigation item; Escape closes the mobile menu; no horizontal overflow at 375 px.

- [ ] **Step 7: Capture an internal shell snapshot**

Capture the temporary shell at 1440×1000 and 390×844 to catch navigation or responsive defects. This is an implementation check, not the user-facing visual approval gate; that gate occurs after the real homepage and Walkthrough hub exist.

- [ ] **Step 8: Commit the approved shell**

```bash
git add site/src/app site/src/components/site site/tests/components/site-header.test.tsx
git commit -m "feat: add dark responsive site shell"
```

---

### Task 4: Implement reusable guide, hint and spoiler components

**Files:**
- Create: `site/src/components/content/guide-page.tsx`
- Create: `site/src/components/content/breadcrumbs.tsx`
- Create: `site/src/components/content/table-of-contents.tsx`
- Create: `site/src/components/content/quick-answer.tsx`
- Create: `site/src/components/content/hint-steps.tsx`
- Create: `site/src/components/content/spoiler-block.tsx`
- Create: `site/src/components/content/puzzle-card.tsx`
- Create: `site/src/components/content/achievement-checklist.tsx`
- Create: `site/src/components/content/source-list.tsx`
- Create: `site/src/components/content/related-guides.tsx`
- Create: `site/mdx-components.tsx`
- Create: `site/tests/components/hint-steps.test.tsx`
- Create: `site/tests/components/spoiler-block.test.tsx`

**Interfaces:**
- Consumes: `PageDefinition`, explicit section arrays and source records.
- Produces: accessible MDX components used by all seven non-home content templates.

- [ ] **Step 1: Write failing progressive-hint tests**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { HintSteps } from '@/components/content/hint-steps'

describe('HintSteps', () => {
  it('reveals hints in order without exposing the full answer first', async () => {
    const user = userEvent.setup()
    render(<HintSteps hints={['Look at the stripes.', 'Order them by count.']} solution="1, 2, 3, 4, 5" />)
    expect(screen.queryByText('1, 2, 3, 4, 5')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Show Hint 1' }))
    expect(screen.getByText('Look at the stripes.')).toBeVisible()
    expect(screen.queryByText('1, 2, 3, 4, 5')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Write the spoiler test**

Assert that spoiler content is absent from the accessibility tree until the user activates `Reveal story spoiler`, then becomes visible and the control changes to `Hide story spoiler`.

- [ ] **Step 3: Run tests and confirm failure**

Run: `cd site && pnpm test tests/components/hint-steps.test.tsx tests/components/spoiler-block.test.tsx`

Expected: FAIL because both components are missing.

- [ ] **Step 4: Implement with native progressive enhancement**

Use `<details>` and `<summary>` where practical so content remains accessible without custom state. Use buttons only when sequential reveal requires state. Every reveal control must expose `aria-expanded` and an associated region.

- [ ] **Step 5: Register MDX components**

Map `h2`, `h3`, `table`, `a`, `QuickAnswer`, `HintSteps`, `SpoilerBlock`, `PuzzleCard`, `AchievementChecklist`, `SourceList` and `RelatedGuides` in `mdx-components.tsx`.

- [ ] **Step 6: Run component tests**

Run: `cd site && pnpm test tests/components`

Expected: all component tests PASS.

- [ ] **Step 7: Commit the content component system**

```bash
git add site/src/components/content site/mdx-components.tsx site/tests/components
git commit -m "feat: add accessible guide content components"
```

---

### Task 5: Build the homepage from the approved JSON

**Files:**
- Modify: `site/src/app/page.tsx`
- Create: `site/src/components/home/home-hero.tsx`
- Create: `site/src/components/home/start-here.tsx`
- Create: `site/src/components/home/about-game.tsx`
- Create: `site/src/components/home/final-cta.tsx`
- Create: `site/tests/components/homepage.test.tsx`

**Interfaces:**
- Consumes: `site/src/content/data/homepage.json` and home registry entry.
- Produces: a complete `/` page with Hero, Start Here, About Game and final CTA.

- [ ] **Step 1: Write the failing homepage test**

Test for one H1, the three main CTA labels, four Start Here cards, four hero stat strings, the fan-made disclaimer and links to Walkthrough, Puzzles and Achievements.

- [ ] **Step 2: Run the focused test**

Run: `cd site && pnpm test tests/components/homepage.test.tsx`

Expected: FAIL before homepage components exist.

- [ ] **Step 3: Implement homepage sections**

Render the existing JSON without changing factual values except data that has become stale. Replace the static review count with a dated label or a non-volatile fact before publishing. Keep the first viewport focused on game identity and navigation rather than keyword lists.

- [ ] **Step 4: Add official video and platform links**

Use the official trailer/watch URL as a normal link with thumbnail and accessible label. Do not autoplay or load a YouTube iframe before user interaction.

- [ ] **Step 5: Verify locally**

Run:

```bash
cd site
pnpm test tests/components/homepage.test.tsx
pnpm typecheck
```

Expected: PASS with no JSON type errors.

- [ ] **Step 6: Commit homepage**

```bash
git add site/src/app/page.tsx site/src/components/home site/tests/components/homepage.test.tsx
git commit -m "feat: build game guide homepage"
```

---

### Task 6: Build the Walkthrough hub and official 24-task timeline

**Files:**
- Create: `site/src/content/guides/walkthrough.mdx`
- Create: `site/src/app/walkthrough/page.tsx`
- Create: `site/src/components/content/task-timeline.tsx`
- Create: `site/tests/content/walkthrough.test.tsx`

**Interfaces:**
- Consumes: official timeline and Walkthrough material in root `关键词素材.md`.
- Produces: `/walkthrough/` with Day 1/2/3/Versions cards, 24 task anchors and quick puzzle links.

- [ ] **Step 1: Write a failing content test**

Assert the rendered page contains exactly 24 task names, links to the four child pages, links to the five puzzle anchors and a visible spoiler-light hint explanation.

- [ ] **Step 2: Confirm test failure**

Run: `cd site && pnpm test tests/content/walkthrough.test.tsx`

Expected: FAIL because content and route do not exist.

- [ ] **Step 3: Author the hub MDX**

Required sections:

```text
Quick Answer
Choose Your Day
Day 1 — 9 Tasks
Day 2 — 8 Tasks
Day 3 — 7 Tasks
Official 24-Task Video Timeline
I’m Stuck — Five Puzzle Shortcuts
Missable Achievements Warning
Demo & Lite Version Guide
Sources
```

Use the exact official start times already recorded in `关键词素材.md` and link each day to its dedicated page.

- [ ] **Step 4: Implement route metadata and template**

The route imports the registry entry and MDX, then renders `GuidePage`. Metadata comes from `buildPageMetadata(page)` created in the SEO task; until then export the registry title and description directly.

- [ ] **Step 5: Verify the two representative pages**

```bash
cd site
pnpm test tests/content/walkthrough.test.tsx
pnpm typecheck
pnpm build
pnpm dev
```

Capture `/` and `/walkthrough/` at 1440×1000 and 390×844. Verify typography, spacing, green accent, header, content hierarchy, cards, table of contents and mobile behavior.

- [ ] **Step 6: Visual approval checkpoint**

Present the four screenshots to the user and stop. Do not begin Day 1, Day 2, Day 3, Versions, Achievements, Puzzles or Secrets & Endings until the user approves the visual system.

- [ ] **Step 7: Commit the approved Walkthrough hub**

```bash
cd site
git add src/app/walkthrough/page.tsx src/content/guides/walkthrough.mdx src/components/content/task-timeline.tsx tests/content/walkthrough.test.tsx
git commit -m "feat: add complete walkthrough hub"
```

---

### Task 7: Author and verify the Day 1 page

**Files:**
- Create: `site/src/content/guides/day-1.mdx`
- Create: `site/src/app/walkthrough/day-1/page.tsx`
- Create: `site/tests/content/day-1.test.tsx`

**Interfaces:**
- Consumes: Day 1 section of `关键词素材.md`, official video and source list.
- Produces: `/walkthrough/day-1/` with nine task sections and missable achievement warnings.

- [ ] **Step 1: Write the failing Day 1 test**

Assert these headings exist once: The Arrival, Preparing Breakfast, Waking up Aldous, Preparing the Reception, Welcoming the Guests, Serving Tea, Opening the Reunion, The Night Watch, Searching the Attic.

- [ ] **Step 2: Confirm failure**

Run: `cd site && pnpm test tests/content/day-1.test.tsx`

Expected: FAIL before route and MDX exist.

- [ ] **Step 3: Author nine task sections**

Each section must include a short objective, ordered steps, inventory checkpoints, one missable achievement callout when applicable and links to relevant puzzle anchors. Include official video timestamps without embedding copied competitor screenshots.

- [ ] **Step 4: Add Day 1 puzzle cross-links**

Link Cup, Exercise, Berry, Flowers and suitcase `374` to `/puzzles/#cup-puzzle`, `/puzzles/#exercise-puzzle`, `/puzzles/#berry-puzzle`, `/puzzles/#flowers-puzzle` and `/puzzles/#suitcase-codes`.

- [ ] **Step 5: Verify and commit**

```bash
cd site
pnpm test tests/content/day-1.test.tsx
pnpm typecheck
git add src/app/walkthrough/day-1 src/content/guides/day-1.mdx tests/content/day-1.test.tsx
git commit -m "feat: publish Day 1 walkthrough"
```

---

### Task 8: Author and verify Day 2, Day 3 and Versions

**Files:**
- Create: `site/src/content/guides/day-2.mdx`
- Create: `site/src/content/guides/day-3.mdx`
- Create: `site/src/content/guides/versions.mdx`
- Create: `site/src/app/walkthrough/day-2/page.tsx`
- Create: `site/src/app/walkthrough/day-3/page.tsx`
- Create: `site/src/app/walkthrough/versions/page.tsx`
- Create: `site/tests/content/day-2.test.tsx`
- Create: `site/tests/content/day-3.test.tsx`
- Create: `site/tests/content/versions.test.tsx`

**Interfaces:**
- Consumes: verified Day 2, Day 3, Demo and Lite material.
- Produces: three complete child pages linked from the Walkthrough hub.

- [ ] **Step 1: Write three failing heading tests**

Day 2 must contain 8 official tasks. Day 3 must contain 7 official tasks. Versions must compare Demo, Lite and Full Game and include the five-step preview flow.

- [ ] **Step 2: Confirm all three tests fail**

Run: `cd site && pnpm test tests/content/day-2.test.tsx tests/content/day-3.test.tsx tests/content/versions.test.tsx`

- [ ] **Step 3: Author Day 2**

Required sections: Preparing Coffee, Waking up William, Cleaning the Floors, Going Hunting, Doing the Washing, Helping with Bathing, Night Time Duties, Inspecting the Cellar, Day 2 Missable Achievements. Explicitly identify briefcase code `281` and link it to Puzzles.

- [ ] **Step 4: Author Day 3**

Required sections: Looking for the Cat, Assisting in Alchemy, Unforeseen Maintenance, Preparing Dinner, Dressing up for Dinner, Serving Dinner, The Departure, Day 3 Missable Achievements. Put ending identity inside `SpoilerBlock`.

- [ ] **Step 5: Author Versions**

Include platform/version table, 15–30 minute duration, Arrival/Breakfast/Aldous flow, cup/berry/exercise solutions, the official “follow the bird” note and a clear statement that Lite is not the full game. Do not claim save transfer support.

- [ ] **Step 6: Verify and commit**

```bash
cd site
pnpm test tests/content/day-2.test.tsx tests/content/day-3.test.tsx tests/content/versions.test.tsx
pnpm typecheck
git add src/app/walkthrough/day-2 src/app/walkthrough/day-3 src/app/walkthrough/versions src/content/guides/day-2.mdx src/content/guides/day-3.mdx src/content/guides/versions.mdx tests/content
git commit -m "feat: add remaining walkthrough pages"
```

---

### Task 9: Build the complete Achievements page

**Files:**
- Create: `site/src/content/guides/achievements.mdx`
- Create: `site/src/app/achievements/page.tsx`
- Create: `site/tests/content/achievements.test.tsx`

**Interfaces:**
- Consumes: 49-achievement count, Day 1/2/3 missable lists and final hidden chain.
- Produces: `/achievements/` with day-grouped checklists and dedicated anchors for four achievement keywords.

- [ ] **Step 1: Write failing achievement tests**

Assert the page states 49 total achievements, has Day 1/2/3 groups, includes `feeding-the-cat`, `locked-achievements` and `youve-found-him` anchors, and links back to each day page.

- [ ] **Step 2: Confirm failure**

Run: `cd site && pnpm test tests/content/achievements.test.tsx`

- [ ] **Step 3: Author the normal and missable achievement model**

Separate 24 progression achievements from missable interactions. Provide a checklist for 9 Day 1, 8 Day 2 and 7 Day 3 missable items described in the approved material.

- [ ] **Step 4: Add focused answers**

`Feeding the Cat` must answer timing, action and failure reason before the long list. `Locked Achievements` must explain progression versus hidden achievements. `You've Found Him!` must use a spoiler gate and label the clock-time conflict as requiring version-specific verification.

- [ ] **Step 5: Verify and commit**

```bash
cd site
pnpm test tests/content/achievements.test.tsx
pnpm typecheck
git add src/app/achievements src/content/guides/achievements.mdx tests/content/achievements.test.tsx
git commit -m "feat: add complete achievement guide"
```

---

### Task 10: Build the five-topic Puzzle Solutions page

**Files:**
- Create: `site/src/content/guides/puzzles.mdx`
- Create: `site/src/app/puzzles/page.tsx`
- Create: `site/tests/content/puzzles.test.tsx`

**Interfaces:**
- Consumes: verified cup, exercise, berry, flowers and suitcase solutions.
- Produces: `/puzzles/` with five SEO anchors and progressive hints.

- [ ] **Step 1: Write failing puzzle tests**

Assert these IDs exist exactly once: `cup-puzzle`, `exercise-puzzle`, `berry-puzzle`, `flowers-puzzle`, `suitcase-codes`. Assert `374`, `281` and `6294` appear under Suitcase Codes and not in the wrong puzzle sections.

- [ ] **Step 2: Confirm failure**

Run: `cd site && pnpm test tests/content/puzzles.test.tsx`

- [ ] **Step 3: Author each PuzzleCard**

Each card contains chapter, Hint 1, Hint 2, Full Solution, result and a link to the relevant Day page. Use:

```text
Cup: arrange stripe counts 1 → 2 → 3 → 4 → 5
Exercise: Left → Right → Down → Right → Right → Down
Berry: cover the hole the bug enters until it is trapped
Flowers: combine adjacent base elements upward into a four-part top flower
Suitcases: Day 1 = 374; Day 2 = 281; hidden final box = 6294
```

- [ ] **Step 4: Verify and commit**

```bash
cd site
pnpm test tests/content/puzzles.test.tsx
pnpm typecheck
git add src/app/puzzles src/content/guides/puzzles.mdx tests/content/puzzles.test.tsx
git commit -m "feat: add spoiler-light puzzle solutions"
```

---

### Task 11: Build Secrets & Endings with strict spoiler boundaries

**Files:**
- Create: `site/src/content/guides/secrets-endings.mdx`
- Create: `site/src/app/secrets-endings/page.tsx`
- Create: `site/tests/content/secrets-endings.test.tsx`

**Interfaces:**
- Consumes: normal ending, hidden reveal, secret letters, Mr. Owl Easter egg and community theory material.
- Produces: `/secrets-endings/` without exposing major spoilers in title, description or first viewport.

- [ ] **Step 1: Write failing spoiler-boundary tests**

Render the page and assert the main character identity is not visible before activating the story spoiler control. Assert sections for Normal Ending, Hidden Reveal, Secret Letters, Mr. Owl Easter Egg, Timeline and Community Theories.

- [ ] **Step 2: Confirm failure**

Run: `cd site && pnpm test tests/content/secrets-endings.test.tsx`

- [ ] **Step 3: Author confirmed facts separately from theories**

Use two labeled blocks: `Confirmed in the Game` and `Community Interpretation`. The exact timeline and elixir mechanism remain interpretations unless official material confirms them.

- [ ] **Step 4: Handle the final hidden chain**

Publish the cross-chapter sequence and `RRRLRLRRL`/`6294` only inside spoiler controls. Keep the first clock time labeled as version-conflicted until execution includes an approved real-device check.

- [ ] **Step 5: Verify and commit**

```bash
cd site
pnpm test tests/content/secrets-endings.test.tsx
pnpm typecheck
git add src/app/secrets-endings src/content/guides/secrets-endings.mdx tests/content/secrets-endings.test.tsx
git commit -m "feat: add spoiler-controlled endings guide"
```

---

### Task 12: Add metadata, structured data, sitemap, robots, Favicon and legal pages

**Files:**
- Create: `site/src/lib/metadata.ts`
- Create: `site/src/lib/structured-data.ts`
- Create: `site/src/app/sitemap.ts`
- Create: `site/src/app/robots.ts`
- Create: `site/src/app/manifest.ts`
- Create: `site/src/app/not-found.tsx`
- Create: `site/src/app/privacy/page.tsx`
- Create: `site/src/app/terms/page.tsx`
- Copy: `favicon_io/*` to the appropriate `site/src/app/` and `site/public/favicon/` locations.
- Create: `site/tests/content/metadata.test.ts`
- Create: `site/tests/content/sitemap.test.ts`

**Interfaces:**
- Consumes: `CORE_PAGES`, `NEXT_PUBLIC_SITE_URL`, existing Favicon files.
- Produces: canonical metadata, JSON-LD, sitemap, robots, manifest, legal footer targets and 404.

- [ ] **Step 1: Write failing metadata tests**

Assert every core page returns one canonical URL, title/description match the registry, Open Graph image is local, and Privacy/Terms return `robots.index === false`.

- [ ] **Step 2: Write failing sitemap tests**

Assert sitemap contains exactly the 9 core URLs, excludes Privacy/Terms, uses one base URL and has no duplicate locations.

- [ ] **Step 3: Confirm tests fail**

Run: `cd site && pnpm test tests/content/metadata.test.ts tests/content/sitemap.test.ts`

- [ ] **Step 4: Implement the metadata helpers**

Use:

```ts
export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return new URL(value)
}
```

Production deployment procedure must reject the localhost value before publishing. Set `metadataBase`, canonical, Open Graph, Twitter Card and file-based icons.

- [ ] **Step 5: Implement truthful JSON-LD**

Homepage: `WebSite`. Content pages: `Article` and `BreadcrumbList`. Do not output fabricated ratings, reviews, FAQ or `HowTo` data that is not visible on the page.

- [ ] **Step 6: Install existing Favicon assets**

Copy the verified ICO, 16×16, 32×32, Apple touch, 192×192 and 512×512 assets. Update manifest names, theme color and background color; do not regenerate the artwork.

- [ ] **Step 7: Verify all metadata outputs**

Run:

```bash
cd site
pnpm test tests/content/metadata.test.ts tests/content/sitemap.test.ts
pnpm build
test -f out/sitemap.xml
test -f out/robots.txt
test -f out/404.html
```

Expected: all checks PASS.

- [ ] **Step 8: Commit SEO and metadata**

```bash
git add site/src/lib site/src/app/sitemap.ts site/src/app/robots.ts site/src/app/manifest.ts site/src/app/not-found.tsx site/src/app/privacy site/src/app/terms site/src/app/favicon.ico site/public site/tests/content
git commit -m "feat: add technical SEO and site metadata"
```

---

### Task 13: Add licensed media and source tracking

**Files:**
- Create: `site/public/media-sources.md`
- Create: `site/public/images/hero/`
- Create: `site/public/images/guides/`
- Create: `site/tests/content/media.test.ts`

**Interfaces:**
- Consumes: approved official media/press assets or self-captured gameplay.
- Produces: optimized local images with an audit trail.

- [ ] **Step 1: Write a failing media inventory test**

Test that every page registry image path exists under `public/`, has non-empty alt text and has a matching row in `media-sources.md`.

- [ ] **Step 2: Confirm test failure**

Run: `cd site && pnpm test tests/content/media.test.ts`

- [ ] **Step 3: Collect only permitted assets**

For each file record: local filename, original URL or “self-captured”, owner, permission basis, capture/download date and pages used. Do not copy images from Kotaku, AppUnwrapper, Fandom or competing guide sites.

- [ ] **Step 4: Optimize and integrate**

Create WebP or AVIF variants sized to the rendered slot. Keep hero LCP image below 250 KB where visual quality permits and all inline guide images below 180 KB.

- [ ] **Step 5: Verify and commit**

```bash
cd site
pnpm test tests/content/media.test.ts
git add public src/content src/lib/page-registry.ts tests/content/media.test.ts
git commit -m "feat: add licensed local game media"
```

---

### Task 14: Run full browser, accessibility, link and performance verification

**Files:**
- Create: `site/playwright.config.ts`
- Create: `site/e2e/core-pages.spec.ts`
- Create: `site/e2e/navigation.spec.ts`
- Create: `site/e2e/accessibility.spec.ts`
- Create: `site/scripts/check-internal-links.mjs`
- Create: `site/scripts/check-external-sources.mjs`
- Create: `site/verification/` screenshots and reports.

**Interfaces:**
- Consumes: complete static site.
- Produces: reproducible evidence that all 9 pages work locally on desktop and mobile.

- [ ] **Step 1: Write the core route smoke test**

```ts
import { expect, test } from '@playwright/test'

const routes = [
  '/',
  '/walkthrough/',
  '/walkthrough/day-1/',
  '/walkthrough/day-2/',
  '/walkthrough/day-3/',
  '/walkthrough/versions/',
  '/achievements/',
  '/puzzles/',
  '/secrets-endings/',
]

for (const route of routes) {
  test(`${route} renders one H1 without console errors`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    const response = await page.goto(route)
    expect(response?.ok()).toBeTruthy()
    await expect(page.locator('h1')).toHaveCount(1)
    expect(errors).toEqual([])
  })
}
```

- [ ] **Step 2: Add navigation and accessibility tests**

Test desktop and mobile navigation, keyboard focus, spoiler controls, all internal links and axe results on Home, Day 1, Achievements, Puzzles and Secrets & Endings.

- [ ] **Step 3: Run the full automated gate**

```bash
cd site
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Expected: all exit 0; 9 routes pass in Chromium desktop and mobile projects.

- [ ] **Step 4: Check dimensions and visual regressions**

Capture all 9 pages at 1440×1000 and 390×844. Check 375 px, 768 px and 1440 px for horizontal overflow, clipped headings, table behavior, sticky TOC and footer layout.

- [ ] **Step 5: Run internal and external link checks**

Internal links must have zero failures. External sources may be reported separately, but any 404 official link must be removed or replaced before approval.

- [ ] **Step 6: Run Lighthouse on representative pages**

Run Home, Day 1, Achievements, Puzzles and Secrets & Endings. Required minimums: Performance 90, Accessibility 95, Best Practices 95, SEO 95. Record JSON and HTML reports under `site/verification/`.

- [ ] **Step 7: Local acceptance checkpoint**

Present desktop/mobile screenshots, test summary, link report, Lighthouse scores and the static `out/` size. Stop and wait for user approval before any remote operation.

- [ ] **Step 8: Commit verification assets**

```bash
git add site/e2e site/scripts site/playwright.config.ts site/verification
git commit -m "test: verify core game guide experience"
```

---

### Task 15: Prepare optional Cloudflare deployment — outside the current execution scope

**Files:**
- Modify: root `.gitignore`
- Create: root `README.md`
- Create: `site/.env.example`
- Create: `site/DEPLOYMENT.md`

**Interfaces:**
- Consumes: user-approved local site and explicit remote authorization.
- Produces: only after a later approval, a remote repository and a Cloudflare Pages static deployment.

- [ ] **Step 1: Add safe ignore rules**

Ignore `site/node_modules/`, `site/.next/`, `site/out/`, local environment files, Playwright transient output, `.codex_tmp/` and generated inspection files. Do not delete existing research outputs.

- [ ] **Step 2: Document local use**

README commands:

```bash
cd site
pnpm install --frozen-lockfile
pnpm dev
pnpm check
```

Document the 9-page structure, research inputs, content update workflow and fan-made disclaimer.

- [ ] **Step 3: Stop for remote approval**

Ask the user to approve: remote repository provider/account, repository name, default branch, Cloudflare account/project and final domain. Do not infer these values.

- [ ] **Step 4: Create and push only after approval**

Use the approved remote repository. Verify `git remote -v`, push the reviewed branch, then confirm the remote file tree includes `site/` and required research inputs but excludes local caches and secrets.

- [ ] **Step 5: Configure deployment only after a second explicit approval**

Use Cloudflare Pages with Root Directory `site/`, Framework preset `Next.js (Static HTML Export)`, Build Command `pnpm build`, Build Output Directory `out`, and production `NEXT_PUBLIC_SITE_URL` set to the approved HTTPS domain.

- [ ] **Step 6: Verify production**

Repeat the 9-route smoke test, sitemap/robots checks, canonical check and mobile screenshot against the production URL. Do not submit GSC or enable analytics until the user approves those external services.

---

## Review Checklist Before Execution

- [ ] Approve方案 A：`site/` 中原创 Next.js + MDX 静态站。
- [ ] Approve 参考站只做模式审计，不复制竞品代码、图片、文案或整页布局。
- [ ] Approve 9 个核心页面和 5 个顶部目的地。
- [ ] Approve 默认深色主题和绿色主色。
- [ ] Approve 首版不加载广告和分析脚本。
- [ ] Approve 先完成首页 + 一篇内容页截图，再批量制作其余页面。
- [ ] Confirm remote repository and Cloudflare deployment remain separate later approvals.
