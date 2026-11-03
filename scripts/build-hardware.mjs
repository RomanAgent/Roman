import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const root = new URL('../', import.meta.url);
const dir = new URL('content/hardware/', root);
const metadata = JSON.parse(await readFile(new URL('metadata.json', dir), 'utf8'));
metadata.insightsMarkdown = await readFile(new URL('docs/hardware-market-insights.md',root),'utf8');
const researchFiles = (await readdir(dir)).filter(f => /^research-.+\.json$/.test(f)).sort();
const products = (await Promise.all(researchFiles.map(async f => JSON.parse(await readFile(new URL(f,dir),'utf8'))))).flat();
const categories = new Set(metadata.categories.map(c => c.id));
const ids = new Set();
const dimensions = {demand:'需求与市场',userProfile:'用户画像',competition:'竞争与替代',supplyChain:'供应链',technology:'技术路径',aesthetics:'产品审美',risks:'关键风险',opportunity:'机会与验证'};
for (const p of products) {
  assert.match(p.id, /^[a-z0-9-]+$/);
  assert(!ids.has(p.id), `重复ID ${p.id}`); ids.add(p.id);
  assert(categories.has(p.category), `未知分类 ${p.category}`);
  assert(['on_sale','preorder','needs_check','discontinued'].includes(p.status));
  assert(p.statusEvidence && p.checkedAt && p.ai.description && p.ai.dependency && p.price.note && p.china.note);
  for (const key of Object.keys(dimensions)) assert(typeof p.analysis[key] === 'string' && p.analysis[key].length >= 20, `${p.id}: ${key} 不完整`);
  assert(p.sources.length && p.sources.some(s => s.supports.includes('status')),`${p.id} 缺销售状态来源`);
  for(const source of p.sources) assert.equal(new URL(source.url).protocol,'https:');
  assert(p.architecture.length >= 3 && p.architecture.every(a => ['official','inferred'].includes(a.evidence)));
}
products.sort((a,b)=>metadata.categories.findIndex(c=>c.id===a.category)-metadata.categories.findIndex(c=>c.id===b.category)||a.brand.localeCompare(b.brand));
await writeFile(new URL('catalog.json',dir),JSON.stringify({...metadata,products},null,2)+'\n');
const labels={on_sale:'在售',preorder:'预售 / 接受延期订单',needs_check:'待复核',discontinued:'停售'};
const md = s=>String(s).replace(/[|]/g,' / ').replace(/</g,'&lt;');
await mkdir(new URL('docs/hardware/',root),{recursive:true});
const pages = [];
for (const p of products) {
 const text=[`# ${md(p.name)}`,`**${p.brand}** · ${metadata.categories.find(c=>c.id===p.category).name} · 核查 ${p.checkedAt}`,p.tagline,`> ${metadata.analysisNote}`,`## 销售与购买`,`- 状态：${labels[p.status]}。${p.statusEvidence}`,`- 地区：${p.regions.join('、')}`,`- 价格：${p.price.text}。${p.price.note}`,`- 中国大陆：${p.china.note}`,`- [官方产品 / 商店](<${p.officialUrl}>)`,`## AI 的实际作用`,p.ai.description,`服务与联网依赖：${p.ai.dependency}`,`## 是否冷门`,`${p.niche.level === 'crowded'?'竞争密集':p.niche.level==='emerging'?'新兴竞争':'细分专业'}（研究判断）：${p.niche.reason}`,...Object.entries(dimensions).flatMap(([key,label])=>[`## ${label}`,p.analysis[key]]),`## 功能分层示意`,`这是功能关系，不是实物拆机、真实空间结构或已核实 BOM。`,...p.architecture.map((a,i)=>`${i+1}. **${a.name}**：${a.detail}（${a.evidence==='official'?'官方披露':'分析推断'}）`),`## 来源`,...p.sources.map((s,i)=>`${i+1}. [${s.title}](<${s.url}>) — ${s.note || s.supports.join('、')}`),`[返回目录](../hardware-market.md) · [网页分析](https://romanagent.github.io/Roman/#hardware/product/${p.id})`].join('\n\n');
 pages.push(writeFile(new URL(`docs/hardware/${p.id}.md`,root),text+'\n'));
}
await Promise.all(pages);
const index=['# AI 智能硬件市场目录',`核查日期：${metadata.checkedAt} · 收录 ${products.length} 款 / 系列`,`> ${metadata.scope}`,metadata.methodology,`> ${metadata.analysisNote}`,'[打开可筛选、对比的网页目录](https://romanagent.github.io/Roman/#hardware)',...metadata.categories.flatMap(c=>{
 const group=products.filter(p=>p.category===c.id); if(!group.length) return [];
 return [`## ${c.name}`, ['| 产品 | 销售状态 | 已查地区 | 价格参考 |', '| --- | --- | --- | --- |',...group.map(p=>`| [${md(p.name)}](hardware/${p.id}.md) | ${labels[p.status]} | ${md(p.regions.join('、'))} | ${md(p.price.text)} |`)].join('\n')];
}),'## 尚待扩展的范围',...metadata.coverageBacklog.map(b=>`- **${b.category}**：${b.note}`),'[研究方法](hardware-methodology.md) · [项目首页](../README.md)'].join('\n\n');
await writeFile(new URL('docs/hardware-market.md',root),index+'\n');
console.log(JSON.stringify({products:products.length,categories:new Set(products.map(p=>p.category)).size,statuses:Object.fromEntries(Object.keys(labels).map(k=>[k,products.filter(p=>p.status===k).length]))}));
