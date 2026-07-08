# 文章发布指南

本博客基于 Hugo + hugo-paper 主题构建，通过 GitHub Actions 部署到 GitHub Pages。

## 1. 创建文章

文章统一放在 `content/posts/`，文件名格式为 `YYYY-MM-DD-NNNN.md`，其中 `NNNN` 从 `0001` 递增。

```bash
hugo new content posts/2026-07-08-0001.md
```

Hugo 会根据 `archetypes/default.md` 生成如下 frontmatter：

```yaml
---
date: '2026-07-08T10:00:00+08:00'
draft: true
title: '2026 07 08 0001'
tags: []
summary: ''
---
```

## 2. Frontmatter 说明

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期，可写 `2026-07-08` 或完整 ISO 时间 |
| `tags` | 否 | 标签数组，如 `[技术, 运维, Nginx]` |
| `summary` | 否 | 列表页摘要 |
| `draft` | 否 | `true` 为草稿，正式发布时改为 `false` 或删除 |

完整示例：

```yaml
---
title: 欢迎来到我的个人博客
date: 2026-07-08
tags: [生活, 随笔]
summary: 这是我的第一篇博客文章。
---
```

## 3. 图片与静态资源

- 需要 Hugo 处理的资源放在 `assets/`
- 无需处理的静态文件放在 `static/`

引用 `static/images/example.png`：

```markdown
![示例图片](/images/example.png)
```

## 4. 本地验证

```bash
hugo server -D
```

默认在 `http://localhost:1313` 访问。

生产构建验证：

```bash
hugo --minify
```

检查标题、日期、标签、代码高亮、图片引用是否正常，无报错。

## 5. 发布

发布前确认 `draft` 为 `false` 或已删除，然后提交：

```bash
git add content/posts/2026-07-08-0001.md
git commit -m "add: 2026-07-08-0001 文章标题"
git push origin main
```

推送后 `.github/workflows/hugo.yml` 会自动构建并部署到 GitHub Pages。可在仓库 **Actions** 标签页查看状态。

## 6. 常用命令

| 操作 | 命令 |
|---|---|
| 新建文章 | `hugo new content posts/YYYY-MM-DD-NNNN.md` |
| 本地预览 | `hugo server -D` |
| 生产构建 | `hugo --minify` |
| 更新主题 | `git submodule update --remote --merge` |
| 发布 | `git push origin main` |

## 7. 注意事项

- 文件名决定 URL，发布后不要随意修改。
- 标签页通过 `layouts/tags/list.html` 与 `layouts/taxonomy/tag.html` 自定义渲染。
- 确保本地安装的是 Hugo Extended 版本。
