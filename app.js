'use strict';
const main = document.querySelector('main');
const categoryNames = { ai: '行业 AI', journey: '创业手记', hardware: '智能硬件' };
let historyData;
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
    ['ai', '01', '行业 AI 历程', '沿着技术演进的脉络，理解变化，也寻找自己的判断。', '8 个关键节点 · 1956—2024'],
    ['journey', '02', '我的创业经历', '留下每一次选择、行动与复盘，让走过的路有迹可循。', '序章已开启 · 真实经历待续'],
    ['hardware', '03', '智能硬件方向', '从屏幕走向真实世界，探索 AI 与硬件相遇的可能。', '方向探索中 · 持续思考']
  ];
  main.innerHTML = `<div class="page page-transition"><section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><div class="eyebrow hero-eyebrow">ROMAN / PERSONAL ARCHIVE</div><h1 id="hero-title">记录经历，<br>也记录判断。</h1><div class="hero-actions"><a href="#journey" class="button-primary">阅读创业手记 <span aria-hidden="true">↗</span></a><a href="#ai" class="text-link">查看 AI 历程 <span aria-hidden="true">→</span></a></div></div><div class="hero-about"><span class="section-number">ABOUT THIS ARCHIVE</span><p>关于行业变化、创业实践，<br>以及智能硬件的未来方向。</p><p class="hero-description">把做过的事、当时的想法，和仍在思考的问题，放在这里。逐篇记录，慢慢完善。</p><div class="hero-footnote">EST. 2026 <span>持续更新的个人档案</span></div></div></section><section class="section-rule" aria-labelledby="directions-heading"><div class="section-heading"><div><span class="section-number">01 / EXPLORING</span><h2 id="directions-heading">记录的三个方向</h2></div><p>CONTENTS / 01 — 03</p></div><div class="directions">${directions.map(([id, num, title, description, caption]) => `<a href="#${id}" class="direction direction-${id}"><div class="direction-top"><span>${num}</span></div><h3>${title}</h3><p>${description}</p><div class="direction-bottom"><span>${caption}</span><span aria-hidden="true">↗</span></div></a>`).join('')}</div></section><section aria-labelledby="records-title"><div class="records-head"><div class="section-heading"><div><span class="section-number">02 / RECENT NOTES</span><h2 id="records-title">最近的记录</h2></div></div><div class="filters" aria-label="筛选记录">${[['all', '全部记录'], ...Object.entries(categoryNames)].map(([id, label]) => `<button type="button" class="filter" data-filter="${id}" aria-pressed="${selectedFilter === id}">${label}</button>`).join('')}</div></div><div class="records-grid" id="records"></div><p class="record-count" id="record-count" role="status" aria-live="polite"></p></section><aside class="home-note"><div><blockquote>保留当时的想法，也允许未来的修正。</blockquote><p>这份记录，会随着新的经历继续更新。</p></div><a href="#journey" class="text-link">继续阅读 <span aria-hidden="true">↗</span></a></aside></div>`;
  renderRecords();
}
function renderRecords() {
  const filtered = articles.filter(a => selectedFilter === 'all' || a.category === selectedFilter);
  document.querySelector('#records').innerHTML = filtered.map(articleCard).join('') || '<p class="empty-state">这个方向的记录正在酝酿中。</p>';
  document.querySelector('#record-count').textContent = `${filtered.length} 篇记录 · 首版内容为编辑初稿，等待本人补充与确认。`;
  document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selectedFilter)));
}
function renderAI() {
  main.innerHTML = `<div class="page page-transition">${pageIntro('01 / THE INTELLIGENCE ERA', '行业 AI 历程', e(historyData.description))}<div class="scope-note"><span aria-hidden="true">◎</span><p>${e(historyData.scopeNote)}</p></div><div class="timeline-layout"><aside class="timeline-sidebar"><p>KEY MOMENTS</p><nav class="year-nav" aria-label="AI 时间线年份">${historyData.milestones.map(m => `<a href="#ai/${m.year}">${m.year}</a>`).join('')}</nav></aside><div class="timeline">${historyData.milestones.map(m => `<section class="milestone" id="year-${e(m.year)}"><div class="milestone-head"><span class="milestone-year">${e(m.year)}</span><h2>${e(m.title)}</h2></div><p>${e(m.summary)}</p><div class="insight"><span>${e(m.insightLabel)}</span>${e(m.insight)}</div><a class="source-link" href="${safeURL(m.source.url)}" target="_blank" rel="noopener noreferrer">原始资料 · ${e(m.source.title)} ↗</a></section>`).join('')}</div></div><section class="section-rule">${sectionHeading('READ FURTHER', '行业观察')}<div class="records-grid">${articles.filter(a => a.category === 'ai').map(articleCard).join('')}</div></section></div>`;
}
function renderJourney() {
  main.innerHTML = `<div class="page page-transition">${pageIntro('02 / NOTES FROM THE JOURNEY', '我的创业经历', '记录出发的原因、途中的选择，以及每一次重新理解问题的时刻。经历会逐段补充，思考也会不断更新。')}<div class="scope-note"><span aria-hidden="true">✎</span><p>手记从这里开始。当前展示的是序章编辑初稿与填写模板；真实的项目、时间、行动和结果，将在本人提供经历后逐篇加入。</p></div><div class="journey-layout"><section class="journal-list" aria-label="创业手记">${articles.filter(a => a.category === 'journey').map(articleCard).join('')}</section><aside class="journey-aside"><div class="eyebrow">A LIVING ARCHIVE</div><h2>关于这份记录</h2><p>不只记下发生了什么，也留下当时为什么这样想。这会成为一份能回头阅读的成长记录。</p><ol class="journey-steps"><li><span>01</span><div>当时的处境<small>时间、背景，以及真正面对的问题</small></div></li><li><span>02</span><div>做出的选择<small>尝试过什么，为什么这样决定</small></div></li><li><span>03</span><div>结果与复盘<small>发生了什么，如今如何重新理解</small></div></li><li><span>04</span><div>下一步行动<small>哪些判断要保留，哪些需要验证</small></div></li></ol><a class="template-link" href="content/journey-template.md" download>下载一段经历的记录模板 <span aria-hidden="true">↓</span></a></aside></div></div>`;
}
function renderHardware() {
  main.innerHTML = `<div class="page page-transition">${pageIntro('03 / BEYOND THE SCREEN', '智能硬件方向', '当智能走出屏幕，产品如何与真实生活相遇？从具体的问题出发，慢慢寻找答案。')}<div class="hardware-banner"><div><div class="eyebrow"><span class="live-dot"></span>探索方向 · 尚待验证</div><h2>先理解场景，<br>再讨论产品。</h2><p>这里将收集值得研究的场景、原型实验与产品思考。目前处于问题梳理阶段，以下是用于讨论的研究框架。</p></div></div><section class="research-grid" aria-label="智能硬件研究框架">${[
    ['01 / SCENARIO', '先找到一个真实问题', '谁会使用？在什么时刻使用？现有方式有什么不足？先把场景说清楚，再决定设备的形态。', '场景待补充'],
    ['02 / PROTOTYPE', '用最小原型验证体验', '观察交互是否自然、反馈是否及时，以及用户能否不看说明就完成最重要的任务。', '实验待设计'],
    ['03 / REFLECTION', '记录使用，而不只记录功能', '留下每次测试的观察、失败原因和下一步改动。让真实反馈逐步修正最初的产品假设。', '反馈待积累']
  ].map(([label,title,description,status]) => `<article class="research-item"><div class="eyebrow">${label}</div><h3>${title}</h3><p>${description}</p><span class="research-status">${status}</span></article>`).join('')}</section><section>${sectionHeading('FIELD NOTES', '从一个问题开始')}<div class="records-grid">${articles.filter(a => a.category === 'hardware').map(articleCard).join('')}</div></section></div>`;
}
function renderArticle(id) {
  const article = articles.find(a => a.id === id);
  if (!article) return renderNotFound();
  document.title = `${article.title} · Roman`;
  main.innerHTML = `<article class="page article-page page-transition"><div class="page-intro"><a class="back-link" href="#${e(article.category)}">← 返回${e(categoryNames[article.category])}</a><div class="record-meta"><span>${e(categoryNames[article.category])}</span><span class="draft-label">${e(article.status)}</span></div><h1>${e(article.title)}</h1><div class="article-meta"><span>整理于 ${e(article.date.replaceAll('-', '.'))}</span><span>${e(article.readingTime)}阅读</span></div></div><div class="scope-note"><span aria-hidden="true">✎</span><p>${article.category === 'journey' ? '这是一份用于展示与讨论的编辑初稿 / 模板，待本人补充确认。文中的第一人称表达不代表已经确认的个人经历或观点。' : '本文为编辑初稿，供本人修改确认。技术事实与资料来源见文末，产品思考属于待验证的观察。'}</p></div><div class="article-body">${article.paragraphs.map(p => `<p>${e(p)}</p>`).join('')}</div>${article.questions?.length ? `<section class="article-questions"><h2>留给下一次记录的问题</h2><ul>${article.questions.map(q=>`<li>${e(q)}</li>`).join('')}</ul></section>` : ''}${article.sources?.length ? `<section class="article-sources"><h2>资料与延伸阅读</h2>${article.sources.map(source => `<a href="${safeURL(source.url)}" target="_blank" rel="noopener noreferrer">${e(source.title)} ↗</a>`).join('')}</section>` : ''}<div class="article-end"><a class="text-link" href="#${e(article.category)}">← 回到${e(categoryNames[article.category])}</a><a class="text-link" href="https://github.com/RomanAgent/Roman/tree/main/content" target="_blank" rel="noopener noreferrer">在 GitHub 阅读源文件 ↗</a></div></article>`;
  return article.category;
}
function renderNotFound() {
  main.innerHTML = '<div class="page error"><h1>这页记录还没有写下。</h1><p>可以先回到首页，看看已经留下的内容。</p><a class="button-primary" href="#home">返回首页 →</a></div>';
}
function route({ initial = false } = {}) {
  const [page = 'home', detail] = location.hash.slice(1).split('/');
  let active = page || 'home';
  document.title = `${({home:'个人档案',ai:'行业 AI 历程',journey:'我的创业经历',hardware:'智能硬件方向'})[active] || '记录'} · Roman`;
  if (!page || page === 'home' || page === 'main') { renderHome(); active = 'home'; }
  else if (page === 'ai') renderAI();
  else if (page === 'journey') renderJourney();
  else if (page === 'hardware') renderHardware();
  else if (page === 'article') active = renderArticle(detail);
  else renderNotFound();
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (!initial) main.focus({preventScroll:true});
  if (page === 'ai' && detail && /^\d{4}$/.test(detail)) document.getElementById(`year-${detail}`)?.scrollIntoView({behavior:'instant',block:'start'});
  else window.scrollTo({top:0,behavior:'instant'});
}
main.addEventListener('click', event => {
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
    const files = await Promise.all(['ai-history.json', 'journal.json', 'ai-articles.json'].map(async filename => {
      const response = await fetch(`content/${filename}`);
      if (!response.ok) throw new Error(`无法读取 ${filename}`);
      return response.json();
    }));
    historyData = files[0];
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
