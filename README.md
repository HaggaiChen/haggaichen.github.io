# 个人博客

使用 GitHub Pages 部署的纯静态博客，通过 HTML + CSS + JavaScript 直接渲染 Markdown 文章。

## 文章命名格式

```
YYYY-MM-DD-NNNN.md
```

例如：
- `2026-04-15-0001.md`
- `2026-04-15-0002.md`
- `2026-04-16-0001.md`

## 发布新文章步骤

1. 在 `posts/` 目录下新建 Markdown 文件，命名符合上述格式
2. 在文件顶部添加 frontmatter：

```markdown
---
title: 文章标题
date: 2026-04-15
tags: [标签1, 标签2]
---

正文内容...
```

3. 在 `posts.json` 中新增一条记录：

```json
{
  "id": "2026-04-15-0002",
  "title": "文章标题",
  "date": "2026-04-15",
  "tags": ["标签1", "标签2"],
  "summary": "文章摘要"
}
```

4. 提交并推送到 GitHub，GitHub Pages 将自动更新
