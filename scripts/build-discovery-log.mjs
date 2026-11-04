import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
const data=JSON.parse(await readFile(new URL('content/discovery/screening-decisions.json',root),'utf8'));
const products=JSON.parse(await readFile(new URL('content/hardware/catalog.json',root),'utf8')).products;
const ids=new Set(products.map(p=>p.id));
const md=s=>String(s).replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('\n',' ');
for(const r of data.records){
 assert(r.name&&r.reason&&r.outcome&&r.checkedAt&&r.sources.length,'筛查记录不完整');
 if(r.productId)assert(ids.has(r.productId),`${r.name} 对应正式档案不存在`);
 for(const url of r.sources)assert.equal(new URL(url).protocol,'https:');
}
const groups=[...new Set(data.records.map(r=>r.outcome))];
const text=['# 硬件发现：筛选案例与核查结果',`整理日期：${data.snapshotAt} · ${data.records.length} 项已保存筛选事件`,data.scope,'线索进入目录需要同时满足消费用途、具体AI功能、明确渠道、实质差异及完整研究与图片。待核不代表产品一定不存在；同任务保留代表也不等于其它产品没有价值。',...groups.flatMap(group=>{
 const rows=data.records.filter(r=>r.outcome===group);
 return [`## ${group}（${rows.length}）`,...rows.flatMap(r=>[`### ${md(r.name)}`,`核查：${r.checkedAt}${r.productId?` · [正式产品档案](hardware/${r.productId}.md)`:''}`,md(r.reason),...(r.previousReason?[`此前记录：${md(r.previousReason)}`]:[]),`依据：${r.sources.map((url,i)=>`[来源 ${i+1}](<${url}>)`).join(' · ')}`])];
}),'[发现范围与收录方法](hardware-discovery-log.md) · [正式市场目录](hardware-market.md) · [结构化筛选记录](../content/discovery/screening-decisions.json)'].join('\n\n');
await writeFile(new URL('docs/hardware-screening.md',root),text+'\n');
console.log(`发现记录已同步：${data.records.length} 项筛选事件，不计入产品数量。`);
