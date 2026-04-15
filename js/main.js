async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  return res.text();
}

function parseFrontmatter(text) {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: text };

  const raw = match[1];
  const content = match[2];
  const meta = {};

  raw.split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value.replace(/'/g, '"'));
      } catch {
        value = value.slice(1, -1).split(',').map(s => s.trim());
      }
    }
    meta[key] = value;
  });

  return { meta, content };
}

function renderTags(tags, activeTag) {
  const container = document.getElementById('tags');
  if (!container || !tags || tags.length === 0) return;

  container.innerHTML = '';

  const allBtn = document.createElement('a');
  allBtn.className = 'tag' + (!activeTag ? ' active' : '');
  allBtn.textContent = '全部';
  allBtn.href = 'index.html';
  container.appendChild(allBtn);

  tags.forEach(tag => {
    const span = document.createElement('a');
    span.className = 'tag' + (tag === activeTag ? ' active' : '');
    span.textContent = tag;
    span.href = 'index.html?tag=' + encodeURIComponent(tag);
    container.appendChild(span);
  });
}

async function initIndex() {
  try {
    const params = new URLSearchParams(window.location.search);
    const activeTag = params.get('tag');
    const posts = await fetchJSON('posts.json');
    const listEl = document.getElementById('post-list');

    const allTags = Array.from(new Set(posts.flatMap(p => p.tags || []))).sort();
    renderTags(allTags, activeTag);

    const filtered = activeTag
      ? posts.filter(p => (p.tags || []).includes(activeTag))
      : posts;

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filtered.length === 0) {
      listEl.innerHTML = '<li class="post-item">暂无文章</li>';
      return;
    }

    listEl.innerHTML = filtered.map(post => {
      const tagStr = (post.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join(' ');
      return `
        <li class="post-item">
          <a href="post.html?id=${post.id}">
            <div class="post-title">${escapeHtml(post.title)}</div>
            <div class="post-meta">${post.date} ${tagStr}</div>
            <div class="post-summary">${escapeHtml(post.summary || '')}</div>
          </a>
        </li>
      `;
    }).join('');
  } catch (err) {
    document.getElementById('post-list').innerHTML = `<li class="post-item">加载失败: ${err.message}</li>`;
  }
}

async function initPost() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) throw new Error('缺少文章 ID');

    const posts = await fetchJSON('posts.json');
    const post = posts.find(p => p.id === id);
    if (!post) throw new Error('文章未找到');

    const text = await fetchText(`posts/${id}.md`);
    const { meta, content } = parseFrontmatter(text);
    const title = meta.title || post.title;
    const date = meta.date || post.date;
    const tags = meta.tags || post.tags || [];

    const tagStr = tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join(' ');
    const htmlContent = marked.parse(content);

    document.title = `${title} | 我的博客`;
    document.getElementById('post-content').innerHTML = `
      <div class="post-header">
        <h1>${escapeHtml(title)}</h1>
        <div class="post-meta">${date} ${tagStr}</div>
      </div>
      <div class="post-body">${htmlContent}</div>
    `;

    if (window.hljs) {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  } catch (err) {
    document.getElementById('post-content').innerHTML = `<p>加载失败: ${err.message}</p>`;
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
