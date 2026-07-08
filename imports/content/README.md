# Content import inbox

这个目录用来临时放待导入的内容文件，目录里的实际内容默认不会提交到 Git。

日常使用时按类型放到固定收件箱：

```txt
imports/content/articles/   待导入文章
imports/content/projects/   待导入项目
imports/content/resources/  待导入资源
```

然后在项目根目录直接运行：

```bash
npm run draft:articles
npm run draft:projects
npm run draft:resources

npm run publish:articles
npm run publish:projects
npm run publish:resources
```

通用导入命令：

```bash
npm run import:content -- article --draft
npm run import:content -- project --publish
npm run import:content -- resource --draft

npm run import:content -- <article|project|resource> imports/content/文件名.md --draft
npm run import:content -- <article|project|resource> imports/content/文件名.md --publish
```

项目和文章支持 `.md` / `.mdx` / `.html` / `.htm`；资源只支持 `.md` / `.mdx`。

资源 Markdown 可以写 frontmatter，也可以用正文键值：

```md
# 资源名称

链接：https://example.com
简介：这个资源适合用来了解 AI 产品案例。
标签：AI产品, 案例
封面图：/resource-covers/example.webp
```
