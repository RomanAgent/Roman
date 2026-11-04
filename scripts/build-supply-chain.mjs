import {readFile,readdir,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {companyValid,deepValid} from './research-contract.mjs';
const root=new URL('../',import.meta.url),draft=process.argv.includes('--draft');
const read=async p=>JSON.parse(await readFile(new URL(p,root),'utf8'));
const meta=await read('content/supply-chain/metadata.json');
const files=await readdir(new URL('content/supply-chain/',root));
const companies=(await Promise.all(files.filter(f=>/^companies-.+\.json$/.test(f)).sort().map(f=>read('content/supply-chain/'+f)))).flat();
const hardwareFiles=await readdir(new URL('content/hardware/',root));
const products=(await Promise.all(hardwareFiles.filter(f=>/^research-.+\.json$/.test(f)).map(f=>read('content/hardware/'+f)))).flat().filter(p=>['consumer','prosumer'].includes(p.audience));
const productMap=new Map(products.map(p=>[p.id,p]));
const deepFiles=await readdir(new URL('content/hardware/deep/',root));
const details=(await Promise.all(deepFiles.filter(f=>f.endsWith('.json')).sort().map(f=>read('content/hardware/deep/'+f)))).flat();
meta.checkedAt=[...companies.map(c=>c.checkedAt),...details.map(d=>d.checkedAt)].filter(Boolean).sort().at(-1)||meta.checkedAt;
const companyMap=new Map(),detailMap=new Map();
for(const c of companies){companyValid(c,meta);assert(!companyMap.has(c.id),'重复公司 '+c.id);companyMap.set(c.id,c);c.relatedProducts=[];}
let candidateLinks=0,disclosedLinks=0;
for(const d of details){
 deepValid(d,productMap);assert(!detailMap.has(d.id),'重复产品深析 '+d.id);detailMap.set(d.id,d);
 for(const l of d.supplierLinks){
  const c=companyMap.get(l.supplierId);if(!c&&draft)continue;assert(c,`${d.id} 引用不存在公司 ${l.supplierId}`);
  assert(c.roles.includes(l.role),`${d.id} 引用的公司没有该能力环节 ${l.role}`);
  assert(l.supplierSourceIds.every(id=>c.sources.some(s=>s.id===id)),`${d.id} 公司证据不存在`);
  const p=productMap.get(d.id);c.relatedProducts.push({...l,productId:p.id,productName:p.name,category:p.category,status:p.status});
  l.relationship==='disclosed'?disclosedLinks++:candidateLinks++;
 }
}
if(!draft){assert(companies.length>=100,'供应链覆盖尚不足100家公司');assert(products.every(p=>detailMap.has(p.id)),'存在尚未完成八维深析的产品');}
companies.sort((a,b)=>a.name.localeCompare(b.name,'zh-CN'));
const output={...meta,complete:!draft,counts:{companies:companies.length,deepProducts:details.length,products:products.length,candidateLinks,disclosedLinks},companies};
await writeFile(new URL('content/supply-chain/catalog.json',root),JSON.stringify(output,null,2)+'\n');
await mkdir(new URL('content/supply-chain/companies/',root),{recursive:true});
await Promise.all(companies.map(c=>writeFile(new URL(`content/supply-chain/companies/${c.id}.json`,root),JSON.stringify(c,null,2)+'\n')));
const listingCompanies=companies.map(({analysis,...c})=>({...c,relatedProducts:c.relatedProducts.map(r=>({productId:r.productId,relationship:r.relationship}))}));
await writeFile(new URL('content/supply-chain/index.json',root),JSON.stringify({...output,companies:listingCompanies})+'\n');
await mkdir(new URL('docs/supply-chain/',root),{recursive:true});
const md=s=>String(s).replaceAll('|',' / ').replaceAll('<','&lt;');
const kind={official:'官方资料',analysis:'研究判断',validation:'待验证'};
for(const c of companies){
 const parts=[`# ${c.name}`,c.summary,`核查 ${c.checkedAt} · ${c.country} · ${meta.tierLabels[c.tier]}`,c.tierNote,`[官网](<${c.website}>) · [公开联系入口](<${c.contactUrl}>)`,`公开地区：${c.locations.join('、')}`,`能力：${c.capabilities.join('、')}`];
 for(const [key,label]of Object.entries(meta.dimensions)){parts.push(`## ${label}`);for(const b of c.analysis[key])parts.push(`### ${b.title} · ${kind[b.evidence]}`,b.text,`依据：${b.sourceIds.map(id=>{const s=c.sources.find(s=>s.id===id);return `[${s.title}](<${s.url}>)`;}).join(' · ')}`);}
 parts.push('## 关联硬件产品',`> ${meta.relationshipNote}`,...c.relatedProducts.map(l=>`- [${l.productName}](../hardware/${l.productId}.md) — **${l.relationship==='disclosed'?'公开披露关系':'能力候选 · 非已采用'}** / ${l.component}：${l.rationale}`),'## 来源',...c.sources.map(s=>`- [${s.title}](<${s.url}>)：${s.note}`),'[返回供应链目录](../supply-chain.md)');
 await writeFile(new URL(`docs/supply-chain/${c.id}.md`,root),parts.join('\n\n')+'\n');
}
const index=[`# ${meta.title}`,`核查 ${meta.checkedAt} · ${companies.length} 家公司 · ${meta.roles.filter(r=>companies.some(c=>c.roles.includes(r.id))).length} 个供应环节`,meta.scope,`> ${meta.relationshipNote}`,'[网页供应链目录](https://romanagent.github.io/Roman/#supply-chain)',...meta.roles.flatMap(r=>{const list=companies.filter(c=>c.roles.includes(r.id));return list.length?[`## ${r.name}`,r.description,['| 公司 | 公开地区标签 | 能力摘要 |','| --- | --- | --- |',...list.map(c=>`| [${md(c.name)}](supply-chain/${c.id}.md) | ${md(c.country)} | ${md(c.capabilities.join('、'))} |`)].join('\n')]:[];})];
await writeFile(new URL('docs/supply-chain.md',root),index.join('\n\n')+'\n');
console.log(JSON.stringify(output.counts));
