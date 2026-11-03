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
  .replace(/[\\`*_\[\]]/g, '\\$&');

function sourceLink(source) {
  const url = new URL(source.url);
  if (url.protocol !== 'https:') throw new Error(`资料链接必须使用 HTTPS：${source.url}`);
  return `[${text(source.title)}](<${url.href}>)`;
}

function generatedNote(sourcePath) {
  return `<!-- 由 scripts/export-content.mjs 从 ${sourcePath} 生成；请修改 JSON 后重新运行脚本。 -->`;
}

function articleMarkdown(article, index) {
  const sections = [
    `## ${String(index + 1).padStart(2, '0')} · ${text(article.title)}`,
    `**${text(article.status)}** · 整理于 ${text(article.date)} · ${text(article.readingTime)}阅读`,
    ...article.paragraphs.map(text),
  ];
  if (article.questions?.length) {
    sections.push('### 留给下一次记录的问题', article.questions.map(question => `- ${text(question)}`).join('\n'));
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
  '> 首版展示包含编辑初稿与填写模板，尚未填入真实个人经历。第一人称表达等待本人确认；日期为内容整理日期，不是创业事件发生时间。',
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
await Promise.all(outputs.map(([path, content]) => writeFile(new URL(path, root), `${content}\n`, 'utf8')));
console.log(`已从 JSON 导出 ${outputs.length} 份 Markdown：${history.milestones.length} 个历史节点、${journal.length + notes.length} 篇文章。`);
