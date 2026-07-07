# AGENTS.md

本文件是 Kleebug 个人站重建项目的协作入口。任何后续参与本项目的 Agent 或开发者，应先阅读本文档，再进行设计、开发、内容迁移、部署或重构。

## 项目指纹

- 项目名称：Kleebug
- 项目定位：有个人温度的 AI 产品数字花园
- 目标站点：`kleebug.fun`
- 目标托管：GitHub Pages
- 推荐技术栈：Astro + Markdown/MDX + Content Collections + GitHub Actions
- 内容维护方式：通过新增或修改内容文件夹中的 `.md` / `.mdx` / `.yml` 文件更新站点，而不是手动改首页或列表页
- 核心内容类型：文章、项目、花园笔记、资源、关于页
- 核心气质：可信、有用、亲近、持续生长

一句话定义：

> Kleebug 是一个面向 AI 产品学习与实践的个人数字花园：这里沉淀方法论、项目复盘、学习路线和生活观察，记录一个产品人在 AI 时代持续生长的轨迹。

本项目不是营销型官网、一次性作品集或纯博客。它应该更像一个持续生长的个人知识与项目空间。

## 常用命令

当前项目已初始化为 Astro 项目，以 `package.json` 中的 scripts 为准。

常用命令：

```bash
npm install
npm run dev
npm run build
npm run preview
```

预期用途：

- `npm run dev`：本地开发与页面预览，默认可访问 `http://127.0.0.1:4321/`
- `npm run build`：类型检查并构建静态站点，提交前必须确认通过
- `npm run preview`：预览构建产物

如后续改用 `pnpm`、`yarn` 或新增 lint/test 脚本，应在本节更新为真实命令。

## 架构与规范

### 内容驱动原则

站点应由内容集合驱动，而不是把内容写死在页面组件中。

新增文章、项目、笔记或资源时，应优先通过新增内容文件完成：

```txt
src/content/articles/
src/content/projects/
src/content/notes/
src/content/resources/
src/content/life/
```

首页、列表页、标签页、精选区、相关内容区应自动读取内容集合生成。

### 推荐目录结构

```txt
src/
  content/
    articles/
    projects/
    notes/
    resources/
    life/

  pages/
    index.astro
    articles/
    projects/
    notes/
    resources/
    tags/
    about.astro

  components/
    ArticleCard.astro
    ProjectCard.astro
    NoteCard.astro
    TagList.astro
    Callout.astro
    MetricGrid.astro
    Timeline.astro
    Gallery.astro
    RelatedContent.astro
```

如果后续实际结构有所调整，应保持同一原则：内容、页面、组件、样式、资源边界清晰。

### 内容类型规范

建议内容类型：

- `articles`：正式文章，偏完整表达、方法论沉淀、学习总结
- `projects`：项目作品，偏案例、过程、复盘、结果和后续迭代
- `notes`：花园笔记，偏学习中、想法中、持续更新
- `resources`：工具、书单、链接、Prompt、课程、案例集合
- `life`：生活切片，可选，用于保留个人温度

建议内容成熟度：

- `seedling`：刚发芽，想法、草稿、学习记录
- `growing`：生长中，已有结构但仍会更新
- `evergreen`：常青内容，较完整且长期有效

### Frontmatter 规范

内容文件应尽量使用结构化 frontmatter，便于自动生成页面。

推荐字段：

```yaml
title: "标题"
date: 2026-07-07
updated: 2026-07-07
summary: "简短摘要"
tags: ["AI产品", "Agent"]
status: "growing"
featured: false
cover: "./cover.webp"
series: "AI 产品经理基础素养"
related:
  - "projects/dify-management-qa"
```

字段应服务于页面生成和内容关联，不要为了形式堆字段。

### Markdown 与 MDX 规范

普通文章和笔记优先使用 Markdown，保证维护成本低。

重点项目、长文、案例复盘可以使用 MDX 插入可复用组件，例如：

```mdx
<Callout type="insight">
这个项目最关键的不是问答，而是把数据、权限、反馈形成闭环。
</Callout>

<MetricGrid
  items={[
    { label: "搭建周期", value: "2 周" },
    { label: "核心流程", value: "6 个" },
    { label: "测试场景", value: "24 个" }
  ]}
/>

<Gallery images={["./screenshots/01.webp", "./screenshots/02.webp"]} />
```

原则：

- 基础排版自动好看
- 重点内容允许增强表现力
- 组件要可复用
- 不要让内容创作依赖复杂代码

### 首页规范

首页是入口地图，不是炫耀页。

首页需要快速回答：

- 这是谁
- 这个站关于什么
- 可以从哪里开始逛
- 最近有什么新内容
- 有哪些代表性项目或文章

首页适合展示：

- 个人定位与一句话介绍
- 最近在研究什么
- 精选项目
- 最新文章
- 正在生长的笔记
- 学习地图或标签入口
- 关于与联系入口

### 视觉与交互规范

视觉方向应偏向：

- 安静
- 清晰
- 温暖
- 有知识感
- 有轻微手作感
- 有个人痕迹

避免通用作品集模板感，尤其避免：

- 大量技能百分比
- 假履历
- 空洞营销话术
- 过度装饰
- 为动效牺牲阅读体验

Astro 不限制交互。交互应放在真正有价值的地方：

- 首页可以有轻量滚动动效和内容浮现
- 重点项目页可以有流程图、时间线、图片画廊、指标卡片、对比滑块
- 文章页可以有目录高亮、代码复制、图片灯箱
- 强交互区域可以局部使用 React / Vue / Svelte / Three.js / GSAP 等组件

普通内容页优先阅读体验；首页和重点项目页可以更有设计感。

### GitHub Pages 部署规范

目标部署方式为 GitHub Actions 构建后发布到 GitHub Pages。

当前项目已提供 `.github/workflows/deploy.yml`，推送到 `main` 后会执行：

```bash
npm ci
npm run build
```

构建产物位于 `dist/`，由 GitHub Actions 发布到 Pages。不要把 `dist/index.html` 手动提交到仓库根目录。

如果继续使用自定义域名 `kleebug.fun`：

- 应在 `public/CNAME` 中写入 `kleebug.fun`
- Astro 配置中应设置 `site: "https://kleebug.fun"`

如果发布到 `username.github.io/repo-name` 形式，需要额外配置 Astro 的 `base`。

### 公开仓库与忽略规则

本项目最终会发布到 GitHub Pages，代码仓库默认按公开项目处理。任何不适合公开的内容都不应提交到 GitHub。

项目使用 `.gitignore` 管理本地私有内容和工程缓存。常见不应公开的内容包括：

- 环境变量和密钥：`.env`、Token、API Key、部署密钥、证书文件。
- 本地依赖和构建产物：`node_modules/`、`dist/`、`.astro/`。
- 个人草稿和未发布内容：`drafts/`、`private/`、`_drafts/`、`*.private.md`。
- 原始素材和参考资料：`raw-assets/`、`source-assets/`、`references-private/`。
- 系统和编辑器缓存：`.DS_Store`、日志、临时文件。

如果某份内容“以后可能公开，但现在还不确定”，默认先放进被忽略的草稿或私有目录，等确认可以发布后再移动到 `src/content/`。

## 安全红线

- 不要把新增文章、项目或资源写死进首页，必须优先走内容集合。
- 不要为了炫酷动效牺牲文章可读性、移动端体验和页面性能。
- 不要引入无法解释用途的大型依赖。
- 不要保留模板残留内容，例如假姓名、假履历、Lorem ipsum、空社交链接。
- 不要把私密联系方式、账号、Token、API Key、部署密钥提交到仓库。
- 不要提交 `.env`、证书、原始私有素材、未确认公开的草稿或私人参考资料。
- 不要在未确认部署策略前改动 GitHub Pages、域名或 Actions 配置。
- 不要删除用户已有内容或素材，除非用户明确要求。
- 不要用破坏性 git 命令清理工作区，除非用户明确要求。
- 不要把 `PROJECT_BRIEF.md` 作为新的协作依据；本文件是后续项目协作的主文档。
