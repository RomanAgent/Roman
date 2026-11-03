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
}
let previousYear = 0;
for (const milestone of history.milestones) {
  assert(Number(milestone.year) > previousYear, '时间线必须按年份递增');
  previousYear = Number(milestone.year);
  for (const key of ['title', 'summary', 'insight', 'insightLabel']) assert.equal(typeof milestone[key], 'string');
  assert.equal(new URL(milestone.source.url).protocol, 'https:');
}
for (const path of ['index.html','styles.css','app.js','assets/favicon.svg','content/journey-template.md']) assert(existsSync(new URL(`../${path}`, import.meta.url)), `文件缺失: ${path}`);
console.log(`内容检查通过：${history.milestones.length} 个历史节点、${articles.length} 篇文章，ID、引用和页面资源完整。`);
