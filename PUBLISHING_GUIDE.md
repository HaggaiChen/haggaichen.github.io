# 文章发布指南

本博客基于 Hugo + hugo-paper 主题构建，通过 GitHub Actions 部署到 GitHub Pages。本文档说明如何从零开始创建、验证并发布一篇新文章。

## 1. 创建新文章

### 1.1 文章存放位置

所有文章统一放在：

```text
content/posts/
```

### 1.2 文件命名格式

文章文件名采用以下格式：

```text
YYYY-MM-DD-NNNN.md
```

- `YYYY-MM-DD`：文章发布日期
- `NNNN`：当天第 N 篇文章，从 `0001` 开始递增
- 扩展名：`.md`

示例：

```text
2026-04-15-0001.md
2026-04-15-0002.md
2026-06-12-0001.md
```

> 该命名规则由现有文章约定，配合 `hugo.yaml` 中的 `permalinks: posts: '/posts/:contentbasename/'`，最终访问地址为 `/posts/YYYY-MM-DD-NNNN/`。

### 1.3 使用 Hugo 命令创建（推荐）

```bash
hugo new content posts/2026-04-15-0001.md
```

Hugo 会自动根据 `archetypes/default.md` 模板生成文件头部 frontmatter：

```yaml
---
date: '2026-04-15T10:00:00+08:00'
draft: true
title: '2026 04 15 0001'
tags: []
summary: ''
---
```

## 2. 文章书写格式

### 2.1 文件格式

文章为 Markdown 文件，顶部包含 YAML frontmatter，正文使用标准 Markdown 语法。

### 2.2 Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期，建议写 `YYYY-MM-DD` |
| `tags` | 否 | 标签数组，如 `[技术, 运维, Nginx]` |
| `summary` | 否 | 文章摘要，显示在列表页 |
| `draft` | 否 | 草稿状态，`true` 为草稿，正式发布时改为 `false` |

### 2.3 示例

```yaml
---
title: 欢迎来到我的个人博客
date: 2026-04-15
tags: [生活, 随笔]
summary: 这是我的第一篇博客文章。
---

这是我的第一篇博客文章。

这个博客使用 **GitHub Pages** 搭建，完全通过静态文件渲染 Markdown 文章。

## 特点

- 简约的列表式主页
- 支持文章标签筛选
- 支持代码高亮

```javascript
console.log("Hello, World!");
```
```

### 2.4 图片与静态资源

- 需要 Hugo 直接处理的资源（如图片缩放）放在 `assets/` 目录
- 无需处理的静态文件（如图片、附件、下载文件）放在 `static/` 目录

例如，在文章中引用 `static/images/example.png`：

```markdown
![示例图片](/images/example.png)
```

## 3. 本地验证

### 3.1 启动开发服务器（包含草稿）

```bash
hugo server -D
```

默认在 `http://localhost:1313` 访问。

### 3.2 生产构建验证

```bash
hugo --minify
```

构建输出到 `public/` 目录（已被 `.gitignore` 忽略）。

### 3.3 验证要点

- 文章标题、日期、标签显示正常
- 代码高亮、图片引用正常
- 无 Hugo 报错或警告

## 4. 构建并推送到 GitHub

### 4.1 提交代码

确认本地验证无误后，将文章提交到 `main` 分支：

```bash
git add content/posts/2026-04-15-0001.md
git commit -m "add: 2026-04-15-0001 欢迎来到我的个人博客"
git push origin main
```

### 4.2 自动部署

推送 `main` 分支后，GitHub Actions 工作流 `.github/workflows/hugo.yml` 会自动：

1. 检出代码及子模块
2. 安装 Hugo Extended
3. 执行 `hugo --minify`
4. 将 `public/` 目录部署到 GitHub Pages

部署完成后，通过 `https://haggaichen.github.io/` 访问。

### 4.3 查看部署状态

进入 GitHub 仓库 → **Actions** 标签页，查看 `Deploy Hugo site to Pages` 工作流运行状态。

## 5. 常用命令速查

| 操作 | 命令 |
|---|---|
| 新建文章 | `hugo new content posts/YYYY-MM-DD-NNNN.md` |
| 本地预览 | `hugo server -D` |
| 生产构建 | `hugo --minify` |
| 更新主题 | `git submodule update --remote --merge` |
| 发布 | `git push origin main` |

## 6. 注意事项

- 文章文件名一旦确定，不要随意修改，否则 URL 会发生变化
- 正式发布前将 frontmatter 中的 `draft` 设为 `false` 或删除该字段
- 确保本地已安装 Hugo Extended 版本
- 首次部署或修改工作流后，确保 GitHub 仓库 **Settings → Pages** 的 Source 设置为 **GitHub Actions**
