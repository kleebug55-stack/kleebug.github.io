# HTML article import inbox

把要导入为正式文章的 `.html` / `.htm` 文件放在这个目录，然后在项目根目录运行：

```bash
npm run import:articles
```

导入结果会生成到：

```txt
src/content/articles/
```

生成后的 `.md` 文件会自动进入 Astro 内容集合，文章列表页和详情页会自动读取它们。

建议文件名使用稳定的英文 slug，例如：

```txt
2026-07-08-ai-product-notes.html
```

如果文章还不想公开，可以运行：

```bash
npm run import:articles -- --draft
```

如果同名文章已经存在，脚本会跳过它。确认要覆盖时再运行：

```bash
npm run import:articles -- --overwrite
```
