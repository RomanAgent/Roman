import { readFile, readdir, writeFile, mkdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import {assertMediaPath,assertPromptPath,assertImageSignature} from './hardware-media-contract.mjs';
const root = new URL('../', import.meta.url);
const dir = new URL('content/hardware/', root);
const metadata = JSON.parse(await readFile(new URL('metadata.json', dir), 'utf8'));
metadata.insightsMarkdown = await readFile(new URL('docs/hardware-market-insights.md',root),'utf8');
const researchFiles = (await readdir(dir)).filter(f => /^research-.+\.json$/.test(f)).sort();
const allProducts = (await Promise.all(researchFiles.map(async f => JSON.parse(await readFile(new URL(f,dir),'utf8'))))).flat();
const innovationIds=new Set((await Promise.all(researchFiles.filter(f=>f.startsWith('research-innovation-')).map(async f=>JSON.parse(await readFile(new URL(f,dir),'utf8'))))).flat().map(p=>p.id));
const products=allProducts.filter(p=>['consumer','prosumer'].includes(p.audience));
const excludedProducts=allProducts.filter(p=>!['consumer','prosumer'].includes(p.audience));
const deepFiles=(await readdir(new URL('deep/',dir))).filter(f=>f.endsWith('.json')).sort();
const deepRows=(await Promise.all(deepFiles.map(async f=>JSON.parse(await readFile(new URL('deep/'+f,dir),'utf8'))))).flat();
const deepMap=new Map(deepRows.map(d=>[d.id,d]));
assert(deepMap.size===deepRows.length,'重复深度分析产品ID');
for(const p of products)if(deepMap.has(p.id)){const {id,...deepDive}=deepMap.get(p.id);p.deepDive=deepDive;}
metadata.deepCoverage=products.filter(p=>p.deepDive).length;
metadata.checkedAt=[...products.map(p=>p.checkedAt),...deepRows.map(d=>d.checkedAt)].filter(Boolean).sort().at(-1)||metadata.checkedAt;
const needGroups=new Map();
const needAliases=JSON.parse(await readFile(new URL('need-aliases.json',dir),'utf8'));
for(const p of products){const profile=p.deepDive?.innovationProfile;if(!profile)continue;const key=needAliases.aliases[profile.needKey]||profile.needKey;const group=needGroups.get(key)||{id:key,name:needAliases.names[key]||profile.needName,productIds:[],available:0};group.productIds.push(p.id);if(['on_sale','preorder'].includes(p.status))group.available++;needGroups.set(key,group);}
metadata.discovery={scope:'按核心需求与使用场景分组；同一组保留不同实现供比较，不把颜色、容量和相近型号计为新的场景。差异属于研究判断，不是全球首创或热度排名。',groups:[...needGroups.values()].sort((a,b)=>a.name.localeCompare(b.name,'zh-CN')),profiledProducts:products.filter(p=>p.deepDive?.innovationProfile).length,innovationProductIds:products.filter(p=>innovationIds.has(p.id)).map(p=>p.id)};
const categories = new Set(metadata.categories.map(c => c.id));
const ids = new Set();
const dimensions = {demand:'需求与市场',userProfile:'用户画像',competition:'竞争与替代',supplyChain:'供应链',technology:'技术路径',aesthetics:'产品审美',risks:'关键风险',opportunity:'机会与验证'};
for (const p of allProducts) {
  assert.match(p.id, /^[a-z0-9-]+$/);
  assert(!ids.has(p.id), `重复ID ${p.id}`); ids.add(p.id);
  assert(categories.has(p.category), `未知分类 ${p.category}`);
  assert(['on_sale','preorder','needs_check','discontinued','reservation','assisted_program'].includes(p.status));
  assert(['consumer','prosumer','developer','business'].includes(p.audience),`${p.id} 缺少消费市场归属`);
  assert(p.statusEvidence && p.checkedAt && p.ai.description && p.ai.dependency && p.price.note && p.china.note);
  for (const key of Object.keys(dimensions)) assert(typeof p.analysis[key] === 'string' && p.analysis[key].length >= 20, `${p.id}: ${key} 不完整`);
  assert(p.sources.length && p.sources.some(s => s.supports.includes('status')),`${p.id} 缺销售状态来源`);
  for(const source of p.sources) assert.equal(new URL(source.url).protocol,'https:');
  assert(p.architecture.length >= 3 && p.architecture.every(a => ['official','inferred'].includes(a.evidence)));
}
const mediaFiles=(await readdir(dir)).filter(f=>/^(media|generated)-.+\.json$/.test(f)).sort();
const mediaRows=(await Promise.all(mediaFiles.map(async f=>JSON.parse(await readFile(new URL(f,dir),'utf8'))))).flat();
const mediaMap=new Map();
for(const row of mediaRows){
 assert(ids.has(row.id),`图片记录对应未知产品 ${row.id}`);
 const entry=mediaMap.get(row.id)||{images:[],notes:[]};
 for(const im of row.images){
  assert(['product','reference','official-structure','ai-exploded'].includes(im.kind),`未知图片类型 ${im.kind}`);
  assertMediaPath(im.path,row.id);
  assert(/\.(png|jpg|jpeg|webp|avif|gif)$/i.test(im.path),`图片格式不支持 ${im.path}`);
  assert(im.verified===true,`图片未经检查 ${im.path}`);
  assert(im.caption&&im.alt&&im.credit,`缺少图片说明 ${im.path}`);
  assert(!entry.images.some(x=>x.path===im.path),`重复图片 ${im.path}`);
  const bytes=await readFile(new URL(im.path,root));
  assert(bytes.length>1000,`图片文件异常 ${im.path}`);
  assertImageSignature(bytes,im.path);
  if(im.kind==='ai-exploded'){
   assert(im.promptPath&&im.referencePaths?.length,`缺生成溯源 ${row.id}`);
   assertPromptPath(im.promptPath,row.id);
   for(const ref of im.referencePaths)assertMediaPath(ref,row.id);
   await stat(new URL(im.promptPath,root));
   for(const ref of im.referencePaths)await stat(new URL(ref,root));
  } else {
   assert.equal(new URL(im.sourceUrl).protocol,'https:');
   assert.equal(new URL(im.sourceImageUrl).protocol,'https:');
  }
  entry.images.push({...im,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
 }
 entry.notes.push(...(row.notes||[]));mediaMap.set(row.id,entry);
}
const mediaOrder={product:0,reference:1,'official-structure':1,'ai-exploded':2};
for(const p of products){const m=mediaMap.get(p.id);p.images=(m?.images||[]).sort((a,b)=>mediaOrder[a.kind]-mediaOrder[b.kind]);p.mediaNotes=m?.notes||[];}
metadata.mediaCoverage={products:products.filter(p=>p.images.some(i=>i.kind==='product')).length,references:products.filter(p=>p.images.some(i=>['reference','official-structure'].includes(i.kind))).length,aiExploded:products.filter(p=>p.images.some(i=>i.kind==='ai-exploded')).length,totalImages:products.reduce((n,p)=>n+p.images.length,0)};
metadata.excludedProducts=excludedProducts.map(p=>({id:p.id,name:p.name,reason:p.scopeNote||'非个人/家庭消费用途，保留在专业设备档案。'}));
products.sort((a,b)=>metadata.categories.findIndex(c=>c.id===a.category)-metadata.categories.findIndex(c=>c.id===b.category)||a.brand.localeCompare(b.brand));
await writeFile(new URL('catalog.json',dir),JSON.stringify({...metadata,products},null,2)+'\n');
await mkdir(new URL('products/',dir),{recursive:true});
await Promise.all(products.map(p=>writeFile(new URL(`products/${p.id}.json`,dir),JSON.stringify(p,null,2)+'\n')));
const listingProducts=products.map(p=>({id:p.id,name:p.name,brand:p.brand,category:p.category,tagline:p.tagline,status:p.status,saleMode:p.saleMode,checkedAt:p.checkedAt,regions:p.regions,price:{text:p.price.text},china:{availability:p.china.availability},ai:{type:p.ai.type,description:p.ai.description},highlights:p.highlights,niche:{level:p.niche.level},images:p.images.filter(i=>i.kind==='product').map(i=>({kind:i.kind,path:i.path,alt:i.alt})),...(p.deepDive?{deepDive:{innovationProfile:p.deepDive.innovationProfile}}:{})}));
await writeFile(new URL('index.json',dir),JSON.stringify({...metadata,products:listingProducts})+'\n');
const labels={on_sale:'在售',preorder:'预售 / 接受延期订单',needs_check:'待复核',discontinued:'停售',reservation:'付费预约 · 非正式订单',assisted_program:'资格申请 · 资助发放'};
const md = s=>String(s).replace(/[|]/g,' / ').replace(/</g,'&lt;');
await mkdir(new URL('docs/hardware/',root),{recursive:true});
const pages = [];
function deepMarkdown(p,key){
 const d=p.deepDive;if(!d)return [p.analysis[key]];
 return [p.analysis[key],...d.dimensions[key].flatMap(b=>[`### ${md(b.title)} · ${{official:'官方资料',analysis:'研究判断',validation:'待验证'}[b.evidence]}`,b.text,`依据：${b.sourceIds.map(id=>{const s=d.sources.find(s=>s.id===id);return `[${md(s.title)}](<${s.url}>)`;}).join(' · ')}`])];
}
function suppliersMarkdown(p){
 if(!p.deepDive)return [];
 return ['## 对应供应链公司','能力候选用于选型研究，不代表本产品实际采用；未公开的供货关系不作推断。',...p.deepDive.supplierLinks.map(l=>`- [${l.supplierId}](../supply-chain/${l.supplierId}.md) — **${l.relationship==='disclosed'?'公开披露关系':'能力候选 · 非已采用'}** / ${l.component}：${l.rationale}`),'[浏览供应链目录](../supply-chain.md)'];
}
function mediaMarkdown(p){
 return p.images.length?['## 产品图片与结构参考',...p.images.flatMap(im=>[
  `### ${im.kind==='ai-exploded'?'AI 生成爆炸示意':im.kind==='official-structure'?'官方结构参考':im.kind==='product'?'产品图':'参考图'}`,
  `![${md(im.alt)}](../../${im.path})`,
  im.kind==='ai-exploded'?`**AI 生成 · 非实物拆机。** 内部为概念推断，不能作为元件布局、BOM 或维修依据。[生成提示词](../../${im.promptPath})`:`${md(im.caption)} · 来源：[${md(im.credit)}](<${im.sourceUrl}>) · [原始图片](<${im.sourceImageUrl}>)`,
 ]),...p.mediaNotes.map(n=>`> ${md(n)}`)]:[];
}
for (const p of products) {
 const text=[`# ${md(p.name)}`,`**${p.brand}** · ${metadata.categories.find(c=>c.id===p.category).name} · 核查 ${p.checkedAt}`,p.tagline,`消费渠道：${({retail:'个人零售',preorder:'消费预订','consumer-fitting':'个人适配 / 验配',rental:'硬件租赁 / 订阅','assisted-program':'资格申请 · 资助发放',reservation:'付费预约 · 非正式订单'})[p.saleMode]||'以官方渠道为准'}。`,...mediaMarkdown(p),`> ${metadata.analysisNote}`,`## 销售与购买`,`- 状态：${labels[p.status]}。${p.statusEvidence}`,`- 地区：${p.regions.join('、')}`,`- 价格：${p.price.text}。${p.price.note}`,`- 中国大陆：${p.china.note}`,`- [官方产品 / 商店](<${p.officialUrl}>)`,`## AI 的实际作用`,p.ai.description,`服务与联网依赖：${p.ai.dependency}`,`## 是否冷门`,`${p.niche.level === 'crowded'?'竞争密集':p.niche.level==='emerging'?'新兴竞争':'细分专业'}（研究判断）：${p.niche.reason}`,...Object.entries(dimensions).flatMap(([key,label])=>[`## ${label}`,...deepMarkdown(p,key)]),...suppliersMarkdown(p),`## 功能分层示意`,`这是功能关系，不是实物拆机、真实空间结构或已核实 BOM。`,...p.architecture.map((a,i)=>`${i+1}. **${a.name}**：${a.detail}（${a.evidence==='official'?'官方披露':'分析推断'}）`),`## 来源`,...p.sources.map((s,i)=>`${i+1}. [${s.title}](<${s.url}>) — ${s.note || s.supports.join('、')}`),`[返回目录](../hardware-market.md) · [网页分析](https://romanagent.github.io/Roman/#hardware/product/${p.id})`].join('\n\n');
 pages.push(writeFile(new URL(`docs/hardware/${p.id}.md`,root),text+'\n'));
}
await Promise.all(pages);
const index=[`# ${metadata.title}`,`核查日期：${metadata.checkedAt} · 收录 ${products.length} 款 / 系列`,`> ${metadata.scope}`,metadata.methodology,`> ${metadata.analysisNote}`,'[打开可筛选、对比的网页目录](https://romanagent.github.io/Roman/#hardware)',...metadata.categories.flatMap(c=>{
 const group=products.filter(p=>p.category===c.id); if(!group.length) return [];
 return [`## ${c.name}`, ['| 产品 | 销售状态 | 已查地区 | 价格参考 |', '| --- | --- | --- | --- |',...group.map(p=>`| [${md(p.name)}](hardware/${p.id}.md) | ${labels[p.status]} | ${md(p.regions.join('、'))} | ${md(p.price.text)} |`)].join('\n')];
}),'## 尚待扩展的范围',...metadata.coverageBacklog.map(b=>`- **${b.category}**：${b.note}`),'[研究方法](hardware-methodology.md) · [项目首页](../README.md)'].join('\n\n');
await writeFile(new URL('docs/hardware-market.md',root),index+'\n');
const mediaDates=[...new Set(products.flatMap(p=>p.images.map(i=>i.generatedAt||i.checkedAt).filter(Boolean)))].sort();
const mediaDateRange=mediaDates[0]===mediaDates.at(-1)?mediaDates[0]:`${mediaDates[0]} — ${mediaDates.at(-1)}`;
const mediaIndex=['# 产品图像档案',`核查与生成日期：${mediaDateRange}。当前 ${metadata.mediaCoverage.products} 款有产品图、${metadata.mediaCoverage.references} 款有参考图、${metadata.mediaCoverage.aiExploded} 款有独立 AI 爆炸示意，共 ${metadata.mediaCoverage.totalImages} 张图片。`,'真实来源图片保留来源与原始外观。AI 图使用内置 ImageGen 按产品分别生成，仅表达概念结构；不是实物拆机、精确 BOM 或维修依据。每款提示词与参考图路径保存在对应 JSON 清单中。','| 产品 | 产品图 / 来源 | 参考图 / 来源 | AI 爆炸示意 | 提示词 |','| --- | --- | --- | --- | --- |',...products.map(p=>{
 const photo=p.images.find(i=>i.kind==='product'),ref=p.images.find(i=>['reference','official-structure'].includes(i.kind)),ai=p.images.find(i=>i.kind==='ai-exploded');
 const original=im=>im?`[图片](../${im.path}) · [${md(im.credit)}](<${im.sourceUrl}>)`:'待补充';
 return `| [${md(p.name)}](hardware/${p.id}.md) | ${original(photo)} | ${original(ref)} | ${ai?`[AI 生成图](../${ai.path})`:'待补充'} | ${ai?`[完整提示词](../${ai.promptPath})`:'待补充'} |`;
})].join('\n\n').replace(/\|\n\n\|/g,'|\n|');
await writeFile(new URL('docs/hardware-media-index.md',root),mediaIndex+'\n');
await writeFile(new URL('docs/hardware-professional-archive.md',root),['# 专业设备档案','以下原有条目不计入C端消费目录与200款可购目标，保留历史研究供查阅。',...excludedProducts.map(p=>`- [${p.name}](hardware/${p.id}.md)：${p.scopeNote||'非个人/家庭消费用途。'}`),'[返回消费目录](hardware-market.md)'].join('\n\n')+'\n');
console.log(JSON.stringify({products:products.length,categories:new Set(products.map(p=>p.category)).size,statuses:Object.fromEntries(Object.keys(labels).map(k=>[k,products.filter(p=>p.status===k).length])),media:metadata.mediaCoverage}));
