import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const json = name => JSON.parse(readFileSync(new URL(`../content/${name}`, import.meta.url), 'utf8'));
const history = json('ai-history.json');
const articles = [...json('journal.json'), ...json('ai-articles.json')];
const ids = new Set();
for (const article of articles) {
  assert.match(article.id, /^[a-z0-9-]+$/, '文章 ID 必须可以安全用于链接');
  assert(!ids.has(article.id), `文章 ID 重复: ${article.id}`);
  ids.add(article.id);
  for (const key of ['title', 'category', 'date', 'status', 'excerpt', 'readingTime']) assert.equal(typeof article[key], 'string', `${article.id} 缺少 ${key}`);
  assert(['ai', 'journey', 'hardware'].includes(article.category));
  assert(article.paragraphs.length > 0 && article.paragraphs.every(p => typeof p === 'string'));
  for (const source of article.sources || []) assert.equal(new URL(source.url).protocol, 'https:');
  if (article.sections) {
    assert(article.scopeNote && Number.isInteger(article.chapter) && article.chapter > 0);
    assert(article.sources.every(s => /^[a-z0-9-]+$/.test(s.id) && s.title && /^\d{4}-\d{2}-\d{2}$/.test(s.checkedAt)));
    const sourceIds = new Set(article.sources.map(s => s.id));
    assert.equal(sourceIds.size, article.sources.length, `${article.id} 资料ID重复`);
    const sectionIds = new Set();
    for (const section of article.sections) {
      assert.match(section.id, /^[a-z0-9-]+$/);assert(!sectionIds.has(section.id));sectionIds.add(section.id);
      assert(section.title && section.blocks.length);
      for (const block of section.blocks) {
        assert(['paragraph','list','table','callout','flow'].includes(block.type));
        for (const id of block.sourceIds || []) assert(sourceIds.has(id), `${article.id} 未知引用 ${id}`);
        if (['paragraph','callout'].includes(block.type)) assert(block.text?.length);
        if (block.type === 'list') assert(block.items.length && block.items.every(i => typeof i === 'string'));
        if (block.type === 'table') assert(block.title && block.columns.length && block.rows.length && block.rows.every(row => row.length === block.columns.length && row.every(cell => typeof cell === 'string')));
        if (block.type === 'flow') assert(block.title && block.note && block.nodes.length && block.nodes.every(node => node.title && node.text));
      }
    }
  }
}
const outline = json('journey-outline.json');
for (const key of ['title', 'description', 'scopeNote']) assert(outline[key]?.length, `章节目录缺少 ${key}`);
assert.match(outline.updatedAt, /^\d{4}-\d{2}-\d{2}$/);
assert(outline.facts.length && outline.facts.every(f => f.label && f.value && f.note));
assert(outline.writingSteps.length && outline.writingSteps.every(s => s.title && s.text));
const outlineIds = new Set();
assert(outline.chapters.length > 1);
for (const [index, chapter] of outline.chapters.entries()) {
  assert.equal(chapter.number, index, '目录应从序章开始连续编号');
  assert.match(chapter.id, /^[a-z0-9-]+$/);
  assert(!outlineIds.has(chapter.id), `目录ID重复：${chapter.id}`); outlineIds.add(chapter.id);
  assert(chapter.title && chapter.summary && chapter.records);
  assert(['awaiting', 'research', 'future'].includes(chapter.status), `未知目录状态：${chapter.status}`);
  if (chapter.articleId) {
    const article = articles.find(a => a.id === chapter.articleId);
    assert(article?.category === 'journey', `目录文章不存在：${chapter.articleId}`);
    assert.equal(chapter.status, 'research', '只有已有研究的目录项可以链接现有研究文章');
    assert.equal(article.chapter, chapter.number, '目录与文章章节编号不一致');
  }
  if (chapter.status === 'research') assert(chapter.articleId, '研究状态必须链接实际文章');
}
let previousYear = 0;
for (const milestone of history.milestones) {
  assert(Number(milestone.year) > previousYear, '时间线必须按年份递增');
  previousYear = Number(milestone.year);
  for (const key of ['title', 'summary', 'insight', 'insightLabel']) assert.equal(typeof milestone[key], 'string');
  assert.equal(new URL(milestone.source.url).protocol, 'https:');
}
for (const path of ['index.html','styles.css','journal.css','app.js','assets/favicon.svg','content/journey-template.md']) assert(existsSync(new URL(`../${path}`, import.meta.url)), `文件缺失: ${path}`);
console.log(`内容检查通过：${history.milestones.length} 个历史节点、${articles.length} 篇文章，ID、引用和页面资源完整。`);
console.log(`创业目录检查通过：${outline.chapters.length} 个目录项，独立于文章计数。`);
