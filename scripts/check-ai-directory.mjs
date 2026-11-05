import {readFileSync,readdirSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import {aiCompanyValid} from './ai-directory-contract.mjs';
const root=new URL('../',import.meta.url),read=p=>JSON.parse(readFileSync(new URL(p,root),'utf8'));
const catalog=read('content/ai-directory/catalog.json'),index=read('content/ai-directory/index.json');
const raw=readdirSync(new URL('content/ai-directory/',root)).filter(f=>/^companies-.+\.json$/.test(f)).flatMap(f=>read('content/ai-directory/'+f));
assert.equal(raw.length,catalog.companies.length);assert.equal(raw.length,catalog.counts.companies);assert.equal(new Set(raw.map(c=>c.id)).size,raw.length);
assert.deepEqual(index.companies.map(c=>c.id),catalog.companies.map(c=>c.id));
for(const c of raw){aiCompanyValid(c,catalog);assert.deepEqual(catalog.companies.find(x=>x.id===c.id),c,`${c.id} 源数据不同步`);assert.deepEqual(read(`content/ai-directory/companies/${c.id}.json`),c);assert(existsSync(new URL(`docs/ai-companies/${c.id}.md`,root)));}
assert.equal(catalog.counts.products,raw.reduce((n,c)=>n+c.products.length,0));
const html=readFileSync(new URL('index.html',root),'utf8');assert(html.includes('data-nav="ai">AI目录'));assert(html.includes('data-nav="hardware">智能硬件目录'));assert(!html.includes('行业 AI 历程')&&!html.includes('智能硬件方向'));
for(const path of ['ai-directory.js','ai-directory.css','docs/ai-directory.md'])assert(existsSync(new URL(path,root)));
console.log(`AI目录检查通过：${raw.length}份业务档案、${catalog.counts.products}个重点产品、八维详析、引用与阅读版同步。`);
