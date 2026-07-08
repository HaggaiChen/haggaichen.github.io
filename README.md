# chenbowen's blog

使用 Hugo + [hugo-paper](https://github.com/nanxiaobei/hugo-paper) 主题构建的个人博客，通过 GitHub Actions 部署到 GitHub Pages。

## 本地开发

```bash
hugo server -D
```

## 发布新文章

```bash
hugo new content posts/YYYY-MM-DD-NNNN.md
```

在文件顶部编辑 frontmatter：

```yaml
---
title: 文章标题
date: 2026-04-15
tags: [标签1, 标签2]
summary: 文章摘要
---
```

提交并推送到 main 分支，GitHub Actions 会自动构建并部署到 gh-pages。

## 目录结构

- `archetypes/`：新建文章模板
- `assets/`：Hugo 资源文件
- `content/`：博客内容
  - `posts/`：文章
  - `about.md`：关于页面
- `layouts/`：自定义布局（当前为空，使用主题默认）
- `static/`：静态资源
- `themes/paper/`：hugo-paper 主题（Git submodule）
- `.github/workflows/hugo.yml`：GitHub Actions 部署工作流
