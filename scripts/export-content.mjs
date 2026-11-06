import { mkdir, readFile, writeFile } from 'node:fs/promises';

// Run from any directory. The JSON files also power the website.
const root = new URL('../', import.meta.url);
const load = async name => JSON.parse(await readFile(new URL(`content/${name}`, root), 'utf8'));
const [history, journal, notes] = await Promise.all([
  load('ai-history.json'),
  load('journal.json'),
  load('ai-articles.json'),
]);

const text = value => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/[\\`*_\[\]$]/g, '\\$&');

function sourceLink(source) {
  const url = new URL(source.url);
  if (url.protocol !== 'https:') throw new Error(`资料链接必须使用 HTTPS：${source.url}`);
  return `[${text(source.title)}](<${url.href}>)`;
}

function generatedNote(sourcePath) {
  return `<!-- 由 scripts/export-content.mjs 从 ${sourcePath} 生成；请修改 JSON 后重新运行脚本。 -->`;
}

function blockMarkdown(article, block, level) {
  let body = '';
  if (block.type === 'paragraph') body = text(block.text);
  if (block.type === 'callout') body = `> **${text(block.title)}**\n>\n> ${text(block.text)}`;
  if (block.type === 'list') body = block.items.map((item, i) => `${block.ordered ? `${i + 1}.` : '-'} ${text(item)}`).join('\n');
  if (block.type === 'table') {
    const cell = value => text(value).replaceAll('|', '\\|').replaceAll('\n', '<br>');
    body = `**${text(block.title)}**\n\n` + [`| ${block.columns.map(cell).join(' | ')} |`, `| ${block.columns.map(() => '---').join(' | ')} |`, ...block.rows.map(row => `| ${row.map(cell).join(' | ')} |`)].join('\n');
  }
  if (block.type === 'flow') body = `**${text(block.title)}**\n\n${block.nodes.map((node, i) => `${i + 1}. **${text(node.title)}**：${text(node.text)}`).join('\n')}\n\n${text(block.note)}`;
  if (block.sourceIds?.length) body += '\n\n依据：' + block.sourceIds.map(id => { const i = article.sources.findIndex(s => s.id === id); return `[${i + 1}] ${sourceLink(article.sources[i])}`; }).join(' · ');
  return body;
}
function sectionsMarkdown(article, level = 3) {
  return (article.sections || []).flatMap(section => [`${'#'.repeat(level)} ${text(section.title)}`, ...section.blocks.map(block => blockMarkdown(article, block, level + 1))]);
}

function articleMarkdown(article, index) {
  const sections = [
    `## ${String(index + 1).padStart(2, '0')} · ${text(article.title)}`,
    `**${text(article.status)}** · 整理于 ${text(article.date)} · ${text(article.readingTime)}阅读`,
    ...(article.scopeNote ? [`> ${text(article.scopeNote)}`] : []),
    ...article.paragraphs.map(text),
    ...sectionsMarkdown(article),
  ];
  if (article.questions?.length) {
    sections.push(`### ${text(article.questionsTitle || '留给下一次记录的问题')}`, article.questions.map(question => `- ${text(question)}`).join('\n'));
  }
  if (article.sources?.length) {
    sections.push('### 资料与延伸阅读', article.sources.map(source => `- ${sourceLink(source)}`).join('\n'));
  }
  return sections.join('\n\n');
}

const historyMarkdown = [
  generatedNote('content/ai-history.json'),
  `# ${text(history.title)}`,
  text(history.description),
  `> ${text(history.scopeNote)}`,
  `资料核对日期：${text(history.verifiedAt)}。`,
  ...history.milestones.map(milestone => [
    `## ${text(milestone.year)} · ${text(milestone.title)}`,
    text(milestone.summary),
    `> **${text(milestone.insightLabel)}：** ${text(milestone.insight)}`,
    `原始资料：${sourceLink(milestone.source)}`,
  ].join('\n\n')),
  '[返回项目首页](../README.md) · [阅读行业观察](../content/ai-notes.md)',
].join('\n\n');

const journalMarkdown = [
  generatedNote('content/journal.json'),
  '# 我的创业经历',
  '> 包含创业筹备研究、编辑初稿与填写模板。已提供的个人背景、公开资料与待决定事项分别注明；未记录的注册、开户、融资和经营结果不作虚构。日期为内容整理日期。',
  ...journal.map(articleMarkdown),
  '[提交一段经历](../content/journey-template.md) · [返回项目首页](../README.md)',
].join('\n\n');

const notesMarkdown = [
  generatedNote('content/ai-articles.json'),
  '# 行业观察 · 编辑初稿',
  '> 以下文章用于首版内容与 UI 展示，是供 Roman 修改的编辑草稿，不是已确认的个人经历或观点。技术事实附有资料来源，产品思考属于待验证的观察；不宣称覆盖全部最新进展。',
  ...notes.map(articleMarkdown),
  '[查看 AI 历史时间线](../docs/ai-history.md) · [返回项目首页](../README.md)',
].join('\n\n');

await mkdir(new URL('docs/', root), { recursive: true });
const outputs = [
  ['docs/ai-history.md', historyMarkdown],
  ['docs/journal.md', journalMarkdown],
  ['content/ai-notes.md', notesMarkdown],
];
for (const article of journal.filter(a => a.sections)) outputs.push([`docs/journal-${article.id}.md`, [generatedNote('content/journal.json'), `# ${text(article.title)}`, `**${text(article.status)}** · 整理 ${article.date} · 资料核查 ${article.verifiedAt || article.date}`, `> ${text(article.scopeNote)}`, ...article.paragraphs.map(text), ...sectionsMarkdown(article, 2), `## ${text(article.questionsTitle || '待决定事项')}`, ...(article.questions || []).map(q => `- ${text(q)}`), '## 资料与延伸阅读', ...article.sources.map((s, i) => `${i + 1}. ${sourceLink(s)} — ${text(s.kind || '资料')}；核查 ${s.checkedAt || article.verifiedAt || article.date}${s.note ? `。${text(s.note)}` : ''}`), `[网页阅读](https://romanagent.github.io/Roman/#article/${article.id}) · [返回创业手记](journal.md)`].join('\n\n')]);
await Promise.all(outputs.map(([path, content]) => writeFile(new URL(path, root), `${content}\n`, 'utf8')));
console.log(`已从 JSON 导出 ${outputs.length} 份 Markdown：${history.milestones.length} 个历史节点、${journal.length + notes.length} 篇文章。`);
