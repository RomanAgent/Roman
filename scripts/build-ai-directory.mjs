import {readFile,readdir,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {aiCompanyValid} from './ai-directory-contract.mjs';
const root=new URL('../',import.meta.url),dir=new URL('content/ai-directory/',root);
const metadata=JSON.parse(await readFile(new URL('metadata.json',dir),'utf8'));
const files=(await readdir(dir)).filter(f=>/^companies-.+\.json$/.test(f)).sort();
const companies=(await Promise.all(files.map(async f=>JSON.parse(await readFile(new URL(f,dir),'utf8'))))).flat();
assert(companies.length,'AI目录没有研究记录');const ids=new Set();
for(const c of companies){aiCompanyValid(c,metadata);assert(!ids.has(c.id),`公司ID重复 ${c.id}`);ids.add(c.id);}
companies.sort((a,b)=>metadata.categories.findIndex(c=>c.id===a.category)-metadata.categories.findIndex(c=>c.id===b.category)||a.name.localeCompare(b.name,'zh-CN'));
const checkedAt=companies.map(c=>c.checkedAt).sort().at(-1);
const counts={companies:companies.length,products:companies.reduce((n,c)=>n+c.products.length,0),categories:new Set(companies.map(c=>c.category)).size,sources:new Set(companies.flatMap(c=>c.sources.map(s=>s.url))).size};
const data={...metadata,checkedAt,counts,companies};
await writeFile(new URL('catalog.json',dir),JSON.stringify(data,null,2)+'\n');
const indexCompanies=companies.map(({analysis,sources,analysisScope,...c})=>({...c,sourceCount:sources.length}));
await writeFile(new URL('index.json',dir),JSON.stringify({...metadata,checkedAt,counts,companies:indexCompanies})+'\n');
await mkdir(new URL('companies/',dir),{recursive:true});await mkdir(new URL('docs/ai-companies/',root),{recursive:true});
const md=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/[\\`*_\[\]|]/g,'\\$&');
const sourceLinks=(c,refs)=>refs.map(id=>{const s=c.sources.find(s=>s.id===id);return `[${md(s.title)}](<${s.url}>)`;}).join(' · ');
for(const c of companies){
 await writeFile(new URL(`companies/${c.id}.json`,dir),JSON.stringify(c,null,2)+'\n');
 const text=[`# ${md(c.name)}`,`${metadata.categories.find(x=>x.id===c.category).name} · ${md(c.region)} · 核查 ${c.checkedAt}`,c.summary,`**业务入口：${metadata.stageLabels[c.stage]}**。${c.stageNote}`,`公司与集团：${c.ownershipNote}`,`地区口径：${c.regionNote}`,`[公司官网](<${c.website}>) · [网页档案](https://romanagent.github.io/Roman/#ai/company/${c.id})`,`## 重点产品`,...c.products.flatMap(p=>[`### ${md(p.name)}`,`${metadata.kindLabels[p.kind]} · ${metadata.productStageLabels[p.stage]}`,p.description,`目标用户：${p.users}`,`AI作用：${p.aiRole}`,`使用与交付：${p.delivery}`,`收费形式：${p.monetization}`,`产品边界：${p.limits}`,`[产品入口](<${p.url}>) · ${sourceLinks(c,p.sourceIds)}`]),`## 八维产品分析`,c.analysisScope,`> ${metadata.analysisNote}`,...Object.entries(metadata.dimensions).flatMap(([key,label])=>[`## ${label}`,...c.analysis[key].flatMap(b=>[`### ${md(b.title)} · ${{official:'官方资料',analysis:'研究判断',validation:'待验证'}[b.evidence]}`,b.text,`依据：${sourceLinks(c,b.sourceIds)}`])]),`## 资料来源`,...c.sources.map(s=>`- [${md(s.title)}](<${s.url}>) — ${md(s.note)}（核查 ${s.accessedAt}）`),`[返回AI目录](../ai-directory.md)`].join('\n\n');
 await writeFile(new URL(`docs/ai-companies/${c.id}.md`,root),text+'\n');
}
const lines=[`# AI目录`,`最新核查 ${checkedAt} · ${counts.companies} 份公司 / 产品业务档案 · ${counts.products} 个重点产品 / 产品组合`,metadata.scope,metadata.coverageNote,`> ${metadata.analysisNote}`,`[打开可搜索与对比的网页目录](https://romanagent.github.io/Roman/#ai)`,...metadata.categories.flatMap(cat=>{const rows=companies.filter(c=>c.category===cat.id);return rows.length?[`## ${cat.name}`,['| 公司 / 业务 | 重点产品 | 入口状态 | 地区 |','| --- | --- | --- | --- |',...rows.map(c=>`| [${md(c.name)}](ai-companies/${c.id}.md) | ${c.products.map(p=>md(p.name)).join(' / ')} | ${metadata.stageLabels[c.stage]} | ${md(c.region)} |`)].join('\n')]:[];}),`[AI历史资料归档](ai-history.md) · [项目首页](../README.md)`];
await writeFile(new URL('docs/ai-directory.md',root),lines.join('\n\n')+'\n');
const readmeURL=new URL('README.md',root);let readme=await readFile(readmeURL,'utf8');
if(readme.includes('<!-- AI-DIRECTORY-SUMMARY:START -->')){const block=`<!-- AI-DIRECTORY-SUMMARY:START -->\n\n当前收录 **${counts.companies} 份公司 / 产品业务档案、${counts.products} 个重点产品 / 产品组合、${counts.categories} 个主赛道**，最新核查 **${checkedAt}**。每份档案列出重点产品、使用与收费形式，并提供八维详细分析和一手来源。公开产品、商务接洽、研发观察与业务调整分别标明；条目数量不代表全球全部AI公司或独立集团数量。\n\n<!-- AI-DIRECTORY-SUMMARY:END -->`;readme=readme.replace(/<!-- AI-DIRECTORY-SUMMARY:START -->[\s\S]*?<!-- AI-DIRECTORY-SUMMARY:END -->/,block);await writeFile(readmeURL,readme);}
console.log(JSON.stringify({aiDirectory:counts,checkedAt}));
