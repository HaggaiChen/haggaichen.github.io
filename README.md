# chenbowen's blog

使用 Hugo + [hugo-paper](https://github.com/nanxiaobei/hugo-paper) 构建的个人博客，通过 GitHub Actions 部署到 [GitHub Pages](https://haggaichen.github.io/)。

## 前置依赖

- [Hugo Extended](https://gohugo.io/installation/)
- Git + 子模块支持

## 本地开发

启动开发服务器（包含草稿）：

```bash
hugo server -D
```

生产构建验证：

```bash
hugo --minify
```

## 发布文章

```bash
hugo new content posts/YYYY-MM-DD-NNNN.md
```

编辑 frontmatter：

```yaml
---
title: 文章标题
date: 2026-07-08
tags: [标签1, 标签2]
summary: 文章摘要
draft: true   # 发布时改为 false 或删除
---
```

## 部署

提交并推送到 `main` 分支：

```bash
git add .
git commit -m "add: 文章标题"
git push origin main
```

GitHub Actions 工作流 `.github/workflows/hugo.yml` 会自动构建并部署到 GitHub Pages。

首次部署或修改工作流后，在仓库 **Settings → Pages** 中将 **Source** 设置为 **GitHub Actions**。

## 目录结构

- `archetypes/`：新建文章模板
- `assets/`：Hugo 资源文件（当前为空）
- `content/`：博客内容
  - `posts/`：文章
  - `about.md`：关于页面
  - `tags/`：标签页面（目录为空，渲染由布局控制）
- `data/`：Hugo 数据文件（当前为空）
- `i18n/`：中文翻译
- `layouts/`：自定义布局
  - `index.html`：首页布局（按年份分组、显示摘要和标签）
  - `_default/list.html`：列表页布局（覆盖主题）
  - `_default/single.html`：文章详情页布局（覆盖主题）
  - `tags/list.html`：标签总览页布局
  - `taxonomy/tag.html`：单个标签文章列表布局
- `static/`：静态资源（当前为空）
- `hugo.yaml`：站点配置
- `themes/paper/`：hugo-paper 主题（Git submodule）
- `.github/workflows/hugo.yml`：GitHub Actions 部署工作流

## 更新主题

```bash
git submodule update --remote --merge
```
