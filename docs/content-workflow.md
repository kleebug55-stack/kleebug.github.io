# Kleebug content workflow

Kleebug 的公开内容由 `src/content/` 下的内容集合驱动。首页、列表页、标签页和详情页都会自动读取这些文件，不需要手动改页面。

## 内容类型

### 项目

目录：`src/content/projects/`

支持格式：`.md` / `.mdx` / `.html` / `.htm`

项目会生成详情页。推荐 frontmatter：

```yaml
title: "项目标题"
date: 2026-07-08
updated: 2026-07-08
summary: "项目简介"
tags: ["AI产品", "Agent"]
status: "growing"
featured: false
cover: "/project-covers/example.webp"
role: "你的角色"
period: "2 周"
stack: ["Dify", "Markdown"]
outcome: "项目结果"
draft: true
```

### 文章

目录：`src/content/articles/`

支持格式：`.md` / `.mdx` / `.html` / `.htm`

文章会生成详情页。推荐 frontmatter：

```yaml
title: "文章标题"
date: 2026-07-08
updated: 2026-07-08
summary: "文章简介"
tags: ["AI产品", "学习路线"]
status: "growing"
featured: false
readingTime: "6 分钟"
draft: true
```

### 资源

目录：`src/content/resources/`

支持格式：`.md` / `.mdx`

资源不生成详情页。资源列表页、标签页里的资源卡片会直接跳转到 `url`。

推荐 frontmatter：

```yaml
title: "资源名称"
date: 2026-07-08
summary: "资源简介"
tags: ["AI产品", "资源"]
status: "growing"
featured: false
cover: "/resource-covers/example.webp"
type: "link"
url: "https://example.com"
draft: true
```

## 固定收件箱

日常不用输入文件路径。把文件按类型放到固定收件箱：

```txt
imports/content/articles/   放文章，支持 .md / .mdx / .html / .htm
imports/content/projects/   放项目，支持 .md / .mdx / .html / .htm
imports/content/resources/  放资源，支持 .md / .mdx
```

然后在项目根目录直接运行对应命令。

### 发草稿

```bash
npm run draft:articles
npm run draft:projects
npm run draft:resources
```

效果：

- 读取对应 `imports/content/.../` 文件夹里的文件。
- 导入到对应 `src/content/.../` 正式内容目录。
- 自动写入 `draft: true`。
- 正式网站不会显示。
- 用 `npm run dev:drafts` 才能看到。

### 正式发布

```bash
npm run publish:articles
npm run publish:projects
npm run publish:resources
```

效果：

- 读取对应 `imports/content/.../` 文件夹里的文件。
- 导入到对应 `src/content/.../` 正式内容目录。
- 不写入 `draft: true`。
- 文章和项目会生成详情页。
- 资源不会生成详情页，卡片会直接跳到 `url`。

## 高级导入命令

如果只想导入某一个文件，也可以手动指定路径：

```bash
npm run import:content -- article imports/content/my-article.html --draft
npm run import:content -- project imports/content/my-project.md --publish
npm run import:content -- resource imports/content/my-resource.md --draft
```

如果省略路径，脚本会自动读取默认收件箱：

```bash
npm run import:content -- article --draft
npm run import:content -- project --publish
npm run import:content -- resource --draft
```

参数说明：

- `--draft`：生成 `draft: true`，不会进入正式构建。
- `--publish`：生成公开内容，不写入 `draft: true`。
- `--overwrite`：同名 slug 已存在时覆盖。
- `--slug=my-slug`：指定输出文件名，只适合一次导入一个文件。

旧文章 HTML 收件箱仍可用：

```bash
npm run import:articles
npm run import:articles -- --draft
```

## 本地预览

只看公开内容：

```bash
npm run dev
```

连草稿一起看：

```bash
npm run dev:drafts
```

正式提交前检查：

```bash
npm run build
```

`npm run build` 默认不会包含 `draft: true` 的内容。不要用 `npm run build:drafts` 产物部署到 GitHub Pages。

## 发布与草稿

发布一篇内容：确保内容文件没有 `draft: true`，然后运行 `npm run build`。

发草稿：保留 `draft: true`，可以用 `npm run dev:drafts` 本地预览；它不会出现在正式首页、列表页、标签页或详情页里。

把草稿改为发布：删除该文件 frontmatter 里的 `draft: true`，或重新导入时使用 `--publish --overwrite`。
