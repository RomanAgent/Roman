import {readFileSync,existsSync,readdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const root = new URL('../',import.meta.url);
const read = path => readFileSync(new URL(path,root),'utf8');
const catalog = JSON.parse(read('content/hardware/catalog.json'));
const research = readdirSync(new URL('content/hardware/',root)).filter(f=>/^research-.+\.json$/.test(f)).flatMap(f=>JSON.parse(read(`content/hardware/${f}`))).filter(p=>['consumer','prosumer'].includes(p.audience));
assert.equal(catalog.products.length,research.length,'目录数量与研究源数据不同，请运行 npm run catalog');
for(const p of research){const {images,mediaNotes,deepDive,...record}=catalog.products.find(c=>c.id===p.id);assert.deepEqual(record,p,`${p.id} 目录尚未同步`);assert(existsSync(new URL(`docs/hardware/${p.id}.md`,root)),`${p.id} 阅读版缺失`);}
const market = read('docs/hardware-market.md');
assert(!/\|[^\n]*\|\n\n\|/m.test(market),'Markdown表格内部不能有空行');
for(const file of ['hardware.js','hardware.css','docs/hardware-methodology.md'])assert(existsSync(new URL(file,root)));
assert(catalog.products.every(p=>p.sources.some(s=>s.supports.includes('status'))),'销售状态缺来源');
assert(new Set(catalog.products.map(p=>p.id)).size===catalog.products.length,'产品ID重复');
assert(catalog.products.every(p=>/^[a-z0-9-]+$/.test(p.id)),'产品ID不安全');
console.log(`硬件目录检查通过：${catalog.products.length} 个产品 / 系列、${new Set(catalog.products.map(p=>p.category)).size} 类，源数据及Markdown同步。`);
