'use strict';
const main = document.querySelector('main');
const categoryNames = { ai: 'AI目录', journey: '创业手记', hardware: '智能硬件' };
let historyData;
let journeyOutline;
let articles = [];
let selectedFilter = 'all';
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const e = escapeHTML;
function safeURL(value) {
  try { const url = new URL(value); return url.protocol === 'https:' ? e(url.href) : '#'; } catch { return '#'; }
}
function articleCard(article) {
  return `<a class="record" href="#article/${e(article.id)}"><div class="record-content"><div class="record-meta"><span>${e(categoryNames[article.category])}</span><span class="draft-label">${e(article.status)}</span></div><h3>${e(article.title)}</h3><p>${e(article.excerpt)}</p><div class="record-bottom"><span>${e(article.date.replaceAll('-', '.'))} &nbsp;·&nbsp; ${e(article.readingTime)}</span><span aria-hidden="true">↗</span></div></div></a>`;
}
function sectionHeading(number, title, end = '') {
  return `<div class="section-heading"><div><span class="section-number">${number}</span><h2>${title}</h2></div>${end}</div>`;
}
function pageIntro(section, title, description) {
  return `<div class="page-intro"><a class="back-link" href="#home">← 返回首页</a><div class="eyebrow">${section}</div><h1>${title}</h1><p>${description}</p></div>`;
}
function renderHome() {
  const directions = [
    ['ai', '01', 'AI目录', '研究AI公司解决什么需求、客户为什么付费，以及产品如何形成可持续的生意。', '全球公司与重点产品 · 八维研究'],
    ['journey', '02', '我的创业经历', '记录真实选择、投入与结果，复盘得失，找到下一次做得更好的方法。', 'YotureToys · 序章与19章目录'],
    ['hardware', '03', '智能硬件目录', '从用户需求、产品差异和供应链出发，研究哪些硬件值得做、怎样卖、如何赚钱。', '全球市场目录 · 逐款分析']
  ];
  main.innerHTML = `<div class="page page-transition"><section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><div class="eyebrow hero-eyebrow">ROMAN / PERSONAL ARCHIVE</div><h1 id="hero-title">复盘创业得失，<br>洞察商业本质。</h1><div class="hero-actions"><a href="#journey" class="button-primary">阅读创业经历 <span aria-hidden="true">↗</span></a><a href="#ai" class="text-link">查看AI目录 <span aria-hidden="true">→</span></a></div></div><div class="hero-about"><span class="section-number">ABOUT THIS ARCHIVE</span><p>从真实经历中沉淀判断，从客户需求中寻找机会，让每一次实践，都更接近可持续的盈利。</p><div class="hero-footnote">EST. 2026 <span>持续记录，也持续验证</span></div></div></section><section class="section-rule" aria-labelledby="directions-heading"><div class="section-heading"><div><span class="section-number">01 / EXPLORING</span><h2 id="directions-heading">复盘与研究的三个方向</h2></div><p>CONTENTS / 01 — 03</p></div><div class="directions">${directions.map(([id, num, title, description, caption]) => `<a href="#${id}" class="direction direction-${id}"><div class="direction-top"><span>${num}</span></div><h3>${title}</h3><p>${description}</p><div class="direction-bottom"><span>${caption}</span><span aria-hidden="true">↗</span></div></a>`).join('')}</div></section><section aria-labelledby="records-title"><div class="records-head"><div class="section-heading"><div><span class="section-number">02 / RECENT NOTES</span><h2 id="records-title">最近的记录</h2></div></div><div class="filters" aria-label="筛选记录">${[['all', '全部记录'], ...Object.entries(categoryNames)].map(([id, label]) => `<button type="button" class="filter" data-filter="${id}" aria-pressed="${selectedFilter === id}">${label}</button>`).join('')}</div></div><div class="records-grid" id="records"></div><p class="record-count" id="record-count" role="status" aria-live="polite"></p></section><aside class="home-note"><div><blockquote>复盘过去的选择，验证下一步的生意。</blockquote><p>记录投入与结果，用真实反馈改进产品、销售和经营。</p></div><a href="#journey" class="text-link">继续阅读 <span aria-hidden="true">↗</span></a></aside></div>`;
  renderRecords();
}
function renderRecords() {
  const filtered = articles.filter(a => selectedFilter === 'all' || a.category === selectedFilter);
  document.querySelector('#records').innerHTML = filtered.map(articleCard).join('') || '<p class="empty-state">这个方向的记录正在酝酿中。</p>';
  document.querySelector('#record-count').textContent = `${filtered.length} 篇记录 · 筹备研究、编辑初稿与模板；真实经历逐篇补充。`;
  document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selectedFilter)));
}
function renderAIHistory() {
  main.innerHTML = `<div class="page page-transition">${pageIntro('ARCHIVE / AI HISTORY', 'AI历史资料', e(historyData.description)).replace('href="#home"','href="#ai"').replace('← 返回首页','← 返回AI目录')}<div class="scope-note"><span aria-hidden="true">◎</span><p>${e(historyData.scopeNote)}</p></div><div class="timeline-layout"><aside class="timeline-sidebar"><p>KEY MOMENTS</p><nav class="year-nav" aria-label="AI 时间线年份">${historyData.milestones.map(m => `<a href="#ai/history/${m.year}">${m.year}</a>`).join('')}</nav></aside><div class="timeline">${historyData.milestones.map(m => `<section class="milestone" id="year-${e(m.year)}"><div class="milestone-head"><span class="milestone-year">${e(m.year)}</span><h2>${e(m.title)}</h2></div><p>${e(m.summary)}</p><div class="insight"><span>${e(m.insightLabel)}</span>${e(m.insight)}</div><a class="source-link" href="${safeURL(m.source.url)}" target="_blank" rel="noopener noreferrer">原始资料 · ${e(m.source.title)} ↗</a></section>`).join('')}</div></div><section class="section-rule">${sectionHeading('READ FURTHER', '行业观察')}<div class="records-grid">${articles.filter(a => a.category === 'ai').map(articleCard).join('')}</div></section></div>`;
}
const journeyStatusLabels = { awaiting: '待补充经历', research: '已有筹备研究', future: '未来思考' };
function renderJourney(chapterId) {
  const outline = journeyOutline;
  const chapters = outline.chapters.map(chapter => `<li><details class="journey-chapter" id="journey-${e(chapter.id)}"><summary><span class="journey-chapter-number">${chapter.number === 0 ? '序章' : String(chapter.number).padStart(2, '0')}</span><span class="journey-chapter-title">${e(chapter.title)}</span><span class="journey-chapter-status">${e(journeyStatusLabels[chapter.status])}</span><span class="journey-chapter-toggle" aria-hidden="true">+</span></summary><div class="journey-chapter-body"><p>${e(chapter.summary)}</p><p class="journey-chapter-records"><strong>值得留下的记录</strong>${e(chapter.records)}</p>${chapter.status === 'research' ? '<p class="journey-chapter-note">现有内容为筹备研究；本章真实注册过程、选择与支出，待本人补充。</p>' : ''}<div class="journey-chapter-links">${chapter.articleId ? `<a class="text-link" href="#article/${e(chapter.articleId)}">阅读现有筹备研究 →</a>` : ''}<a class="text-link" href="#journey/${e(chapter.id)}" aria-label="${e(chapter.title)}的章节链接">章节链接 ↗</a></div></div></details></li>`).join('');
  main.innerHTML = `<div class="page journey-page page-transition">${pageIntro('02 / NOTES FROM THE JOURNEY', '我的创业经历', e(outline.description))}<section class="journey-overview" aria-labelledby="journey-brand-title"><div class="journey-overview-heading"><div><span class="section-number">A COMPANY / A JOURNEY</span><h2 id="journey-brand-title">${e(outline.title)}</h2></div><span class="journey-outline-count">序章 + ${outline.chapters.length - 1} 章 · 逐章补充</span></div><dl class="journey-facts">${outline.facts.map(fact => `<div><dt>${e(fact.label)}</dt><dd>${e(fact.value)}<small>${e(fact.note)}</small></dd></div>`).join('')}</dl><p class="journey-overview-note">背景由本人提供 · 目录整理于 ${e(outline.updatedAt.replaceAll('-', '.'))}</p></section><section class="journey-outline" aria-labelledby="journey-outline-title"><div class="journey-outline-heading"><div><span class="section-number">CONTENTS / 00 — 19</span><h2 id="journey-outline-title">创业经历章节目录</h2></div><div class="journey-outline-actions"><button type="button" data-outline-action="expand">全部展开</button><button type="button" data-outline-action="collapse">全部收起</button></div></div><p class="journey-outline-note">${e(outline.scopeNote)}</p><p class="journey-outline-help">点击章名展开写作提纲；目录不计入已完成文章。</p><ol class="journey-chapters" start="0">${chapters}</ol><a class="text-link" href="https://github.com/RomanAgent/Roman/blob/main/docs/journey-outline.md" target="_blank" rel="noopener noreferrer">在 GitHub 阅读完整目录 ↗</a></section><div class="journey-layout journey-existing"><section aria-labelledby="journey-records-title"><div class="section-heading"><div><span class="section-number">READ / EXISTING NOTES</span><h2 id="journey-records-title">已有文章与研究</h2></div></div><p class="journey-existing-note">公司注册篇保留为筹备研究，早期编辑初稿与模板继续保留。真实经历将在对应章节逐篇整理发布。</p><div class="journal-list">${articles.filter(a => a.category === 'journey').map(articleCard).join('')}</div></section><aside class="journey-aside"><div class="eyebrow">A LIVING ARCHIVE</div><h2>每一章，怎样记录</h2><p>从一个具体事件开始，留下当时的选择和今天的理解。</p><ol class="journey-steps">${outline.writingSteps.map((step, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><div>${e(step.title)}<small>${e(step.text)}</small></div></li>`).join('')}</ol><a class="template-link" href="content/journey-template.md" download>下载一段经历的记录模板 <span aria-hidden="true">↓</span></a></aside></div></div>`;
  if (chapterId) requestAnimationFrame(() => {
    const chapter = document.getElementById(`journey-${chapterId}`);
    if (chapter) { chapter.open = true; chapter.scrollIntoView({behavior:'instant', block:'start'}); }
  });
}
function articleRefs(article, ids = []) {
  return ids.length ? `<p class="chapter-refs">依据 ${ids.map(id => { const index = article.sources.findIndex(s => s.id === id), source = article.sources[index]; return source ? `<a href="${safeURL(source.url)}" target="_blank" rel="noopener noreferrer" title="${e(source.title)}" aria-label="资料 ${index + 1}：${e(source.title)}">[${index + 1}] ${e(source.shortTitle || source.title)}</a>` : ''; }).join(' ')}</p>` : '';
}
function articleBlock(article, block) {
  let html = '';
  if (block.type === 'paragraph') html = `<p>${e(block.text)}</p>`;
  if (block.type === 'callout') html = `<aside class="chapter-callout"><h3>${e(block.title)}</h3><p>${e(block.text)}</p></aside>`;
  if (block.type === 'list') html = `<${block.ordered ? 'ol' : 'ul'} class="chapter-list">${block.items.map(item => `<li>${e(item)}</li>`).join('')}</${block.ordered ? 'ol' : 'ul'}>`;
  if (block.type === 'table') html = `<p class="chapter-table-hint">左右滑动查看完整表格 →</p><div class="chapter-table" tabindex="0" role="region" aria-label="${e(block.title)}，可横向滚动"><table><caption>${e(block.title)}</caption><thead><tr>${block.columns.map(c => `<th scope="col">${e(c)}</th>`).join('')}</tr></thead><tbody>${block.rows.map(row => `<tr>${row.map((cell, i) => i ? `<td>${e(cell)}</td>` : `<th scope="row">${e(cell)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if (block.type === 'flow') html = `<figure class="chapter-flow"><figcaption>${e(block.title)}</figcaption><div>${block.nodes.map((node, i) => `<section><span>${String(i + 1).padStart(2, '0')}</span><h3>${e(node.title)}</h3><p>${e(node.text)}</p></section>`).join('')}</div><p class="chapter-footnote">${e(block.note)}</p></figure>`;
  return html + articleRefs(article, block.sourceIds);
}
function chapterBody(article) {
  return `<div class="chapter-layout"><nav class="chapter-toc" aria-label="本章目录"><p>本章目录</p>${article.sections.map((section, i) => `<a href="#article/${e(article.id)}/${e(section.id)}"><span>${String(i + 1).padStart(2, '0')}</span>${e(section.title)}</a>`).join('')}<a href="#article/${e(article.id)}/sources">资料与报价来源 ↓</a></nav><div class="chapter-content">${article.sections.map((section, i) => `<section class="chapter-section" id="article-${e(section.id)}"><div class="eyebrow">CHAPTER ${e(String(article.chapter || 1).padStart(2, '0'))} / ${String(i + 1).padStart(2, '0')}</div><h2>${e(section.title)}</h2>${section.blocks.map(block => articleBlock(article, block)).join('')}</section>`).join('')}</div></div>`;
}
function renderArticle(id, anchor) {
  const article = articles.find(a => a.id === id);
  if (!article) return renderNotFound();
  document.title = `${article.title} · Roman`;
  main.innerHTML = `<article class="page article-page page-transition ${article.sections?'chapter-article':''}"><div class="page-intro"><a class="back-link" href="#${e(article.category)}">← 返回${e(categoryNames[article.category])}</a><div class="record-meta"><span>${e(categoryNames[article.category])}</span><span class="draft-label">${e(article.status)}</span></div><h1>${e(article.title)}</h1><div class="article-meta"><span>整理于 ${e(article.date.replaceAll('-', '.'))}</span><span>${e(article.readingTime)}阅读</span>${article.verifiedAt?`<span>资料核查 ${e(article.verifiedAt.replaceAll('-','.'))}</span>`:''}</div></div><div class="scope-note"><span aria-hidden="true">✎</span><p>${article.scopeNote ? e(article.scopeNote) : article.category === 'journey' ? '这是一份用于展示与讨论的编辑初稿 / 模板，待本人补充确认。文中的第一人称表达不代表已经确认的个人经历或观点。' : '本文为编辑初稿，供本人修改确认。技术事实与资料来源见文末，产品思考属于待验证的观察。'}</p></div><div class="article-body">${article.paragraphs.map(p => `<p>${e(p)}</p>`).join('')}</div>${article.sections?chapterBody(article):''}${article.questions?.length ? `<section class="article-questions"><h2>${e(article.questionsTitle || '留给下一次记录的问题')}</h2><ul>${article.questions.map(q=>`<li>${e(q)}</li>`).join('')}</ul></section>` : ''}${article.sources?.length ? `<section class="article-sources" id="article-sources"><h2>资料与延伸阅读</h2>${article.sources.map((source,index) => `${article.sections?'<div class="chapter-source-entry">':''}<a href="${safeURL(source.url)}" target="_blank" rel="noopener noreferrer">${article.sections?`[${index+1}] `:''}${e(source.title)} ↗</a>${article.sections?`<p>${e(source.kind||'资料')} · 核查 ${e(source.checkedAt||article.verifiedAt||article.date)}${source.note?` · ${e(source.note)}`:''}</p></div>`:''}`).join('')}</section>` : ''}<div class="article-end"><a class="text-link" href="#${e(article.category)}">← 回到${e(categoryNames[article.category])}</a><a class="text-link" href="${article.sections?`https://github.com/RomanAgent/Roman/blob/main/docs/journal-${e(article.id)}.md`:'https://github.com/RomanAgent/Roman/tree/main/content'}" target="_blank" rel="noopener noreferrer">${article.sections?'在 GitHub 阅读本章':'在 GitHub 阅读源文件'} ↗</a></div></article>`;
  if(anchor) requestAnimationFrame(()=>document.getElementById(`article-${anchor}`)?.scrollIntoView({behavior:'instant',block:'start'}));
  return article.category;
}
function renderNotFound() {
  main.innerHTML = '<div class="page error"><h1>这页记录还没有写下。</h1><p>可以先回到首页，看看已经留下的内容。</p><a class="button-primary" href="#home">返回首页 →</a></div>';
}
function route({ initial = false } = {}) {
  const [page = 'home', detail, productId, anchor] = location.hash.slice(1).split('/');
  window.AIDirectoryApp?.cancel();
  let active = page || 'home';
  document.title = `${({home:'个人档案',ai:'AI目录',journey:'我的创业经历',hardware:'智能硬件目录','supply-chain':'供应链目录'})[active] || '记录'} · Roman`;
  if (!page || page === 'home' || page === 'main') { renderHome(); active = 'home'; }
  else if (page === 'ai' && (detail === 'history' || /^\d{4}$/.test(detail || ''))) { renderAIHistory(); document.title = 'AI历史资料 · Roman'; }
  else if (page === 'ai') window.AIDirectoryApp.render(detail, productId, anchor);
  else if (page === 'journey') renderJourney(detail);
  else if (page === 'hardware') window.HardwareApp.render(detail, productId);
  else if (page === 'supply-chain') window.SupplyChainApp.render(detail,productId);
  else if (page === 'article') active = renderArticle(detail, productId);
  else renderNotFound();
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (!initial) main.focus({preventScroll:true});
  const archiveYear = page === 'ai' ? (detail === 'history' ? productId : (/^\d{4}$/.test(detail || '') ? detail : null)) : null;
  const archiveTarget = archiveYear && document.getElementById(`year-${archiveYear}`);
  if (archiveTarget) archiveTarget.scrollIntoView({behavior:'instant',block:'start'});
  else window.scrollTo({top:0,behavior:'instant'});
}
main.addEventListener('click', event => {
  const outlineAction = event.target.closest('[data-outline-action]');
  if (outlineAction) document.querySelectorAll('.journey-chapter').forEach(chapter => { chapter.open = outlineAction.dataset.outlineAction === 'expand'; });
  const button = event.target.closest('[data-filter]');
  if (button) { selectedFilter = button.dataset.filter; renderRecords(); }
});
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  main.focus({preventScroll:true});
  main.scrollIntoView({behavior:'instant',block:'start'});
});
async function start() {
  try {
    const files = await Promise.all(['ai-history.json', 'journal.json', 'ai-articles.json', 'journey-outline.json'].map(async filename => {
      const response = await fetch(`content/${filename}`, {cache:'no-cache'});
      if (!response.ok) throw new Error(`无法读取 ${filename}`);
      return response.json();
    }));
    historyData = files[0];
    journeyOutline = files[3];
    const featuredOrder = ['ai-opportunity', 'why-write', 'hardware-scenario'];
    const rank = article => featuredOrder.includes(article.id) ? featuredOrder.indexOf(article.id) : featuredOrder.length;
    articles = [...files[2], ...files[1]].sort((a, b) => b.date.localeCompare(a.date) || rank(a) - rank(b));
    route({initial:true});
    window.addEventListener('hashchange', () => route());
  } catch (error) {
    main.innerHTML = '<div class="page error"><h1>记录暂时没有加载出来。</h1><p>请刷新页面重试，或在 GitHub 继续阅读。</p><a class="button-primary" href="https://github.com/RomanAgent/Roman">前往 GitHub ↗</a></div>';
    console.error(error);
  }
}
start();
