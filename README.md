# chenbowen's blog

使用 Hugo + [hugo-paper](https://github.com/nanxiaobei/hugo-paper) 主题构建的个人博客，通过 GitHub Actions 部署到 GitHub Pages。

## 本地开发

```bash
hugo server -D
```

生产构建：

```bash
hugo --minify
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

提交并推送到 `main` 分支，GitHub Actions 会自动构建并部署到 `gh-pages`。

## 部署说明

在 GitHub 仓库 **Settings → Pages** 中，将 **Source** 设置为 **GitHub Actions**。

首次部署或修改 `.github/workflows/hugo.yml` 后，可在仓库 **Actions** 标签页查看构建状态。

## 目录结构

- `archetypes/`：新建文章模板
- `assets/`：Hugo 资源文件
- `content/`：博客内容
  - `posts/`：文章
  - `about.md`：关于页面
  - `tags/_index.md`：标签总览页
- `data/`：Hugo 数据文件
- `i18n/`：中文翻译
- `layouts/`：自定义布局
  - `tags/list.html`：标签总览页布局
- `static/`：静态资源
- `hugo.yaml`：站点配置
- `themes/paper/`：hugo-paper 主题（Git submodule）
- `.github/workflows/hugo.yml`：GitHub Actions 部署工作流

## 更新主题

```bash
git submodule update --remote --merge
```
