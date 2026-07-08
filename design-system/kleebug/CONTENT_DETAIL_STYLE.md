# Kleebug Content Detail Style Library

本文件记录 Kleebug 文章、项目、笔记、资源和生活内容的详情页标准样式。后续新增内容时，优先沿用这里的结构，而不是在页面里临时写样式。

## 核心原则

- 详情页统一使用 `src/layouts/ContentDetailLayout.astro`。
- 内容区统一使用 `1120px` 版心；顶部导航栏和底部页脚可保持各自布局宽度。
- 页面标题区由 frontmatter 驱动，正文由 Markdown/MDX 驱动。
- 正文段落、标题和内容块共享同一版心，不额外做窄栏居中。
- 新增项目或文章时，不手动改详情页样式；只新增 `src/content/**` 下的内容文件。

## 标准详情页结构

所有详情页都应包含：

- 内容类型标识：例如 `项目复盘`、`文章`、`花园笔记`。
- 标题、摘要、日期、状态、标签。
- 可选关键信息卡片：项目角色、周期、结果；笔记信心；资源类型等。
- 正文内容：Markdown 为主，重点内容可用 MDX 组件增强。

## 推荐 Frontmatter

```yaml
title: "标题"
date: 2026-07-07
updated: 2026-07-07
summary: "一句话说明这篇内容解决什么问题或记录什么过程。"
tags: ["AI产品", "Agent"]
status: "growing"
featured: false
cover: "/project-covers/project-default.svg"
series: "AI 产品经理基础素养"
related:
  - "projects/dify-management-qa"
```

项目内容可额外使用：

```yaml
role: "产品设计 / 流程梳理 / 测试验收"
period: "2 周"
stack: ["Dify", "Markdown", "知识库检索"]
outcome: "沉淀 6 个核心流程和 24 个测试场景"
```

## MDX 内容块

重点项目、长文、案例复盘可以导入以下组件：

```mdx
import Callout from "../../components/Callout.astro";
import MetricGrid from "../../components/MetricGrid.astro";
import Timeline from "../../components/Timeline.astro";
import Gallery from "../../components/Gallery.astro";
```

### 指标卡片

用于展示项目结果、周期、测试规模、流程数量等。

```mdx
<MetricGrid
  items={[
    { label: "搭建周期", value: "2 周" },
    { label: "核心流程", value: "6 个" },
    { label: "测试场景", value: "24 个" },
  ]}
/>
```

### 重点旁注

用于突出洞察、提醒或阶段性判断。

```mdx
<Callout type="insight">
这个项目最关键的不是问答，而是把数据、权限、反馈形成闭环。
</Callout>
```

可选类型：`insight`、`note`、`warning`。

### 过程时间线

用于项目过程、学习路径、版本迭代。

```mdx
<Timeline
  items={[
    { title: "整理知识边界", text: "明确哪些制度可以公开检索，哪些需要权限或人工确认。" },
    { title: "搭建问答原型", text: "连接知识库，验证召回、引用和追问体验。" },
    { title: "设计测试集", text: "覆盖模糊问法、跨文档问题、无答案问题和边界问题。" },
  ]}
/>
```

## 写作建议

- 项目复盘优先使用 `MetricGrid` 开场，让读者先看到结果和规模。
- 每篇长文最多使用 1-3 个强调型组件，避免正文被卡片打碎。
- 二级标题负责搭建阅读地图，段落负责解释判断，不要把大量信息塞进标题。
- 如果一篇内容只是普通短文，直接 Markdown 就可以，详情页会自动套用统一样式。
