import assert from 'node:assert/strict';
import {zhCount,safeId,blocksValid,sourcesValid} from './research-contract.mjs';
export function aiCompanyValid(c,metadata){
 safeId(c.id);assert(c.name&&c.website&&c.region&&c.regionNote&&c.ownershipNote&&c.stageNote,`${c.id} 基本资料不完整`);
 assert.equal(new URL(c.website).protocol,'https:');assert(/^\d{4}-\d{2}-\d{2}$/.test(c.checkedAt));
 assert(metadata.categories.some(x=>x.id===c.category),`${c.id} 未知分类 ${c.category}`);
 assert(c.stage in metadata.stageLabels);assert(c.audience in metadata.audienceLabels);assert(Array.isArray(c.aliases)&&Array.isArray(c.tags));
 assert(zhCount(c.summary)>=40,`${c.id} 定位摘要不足`);assert(zhCount(c.analysisScope)>=40,`${c.id} 分析范围不足`);
 const sourceIds=sourcesValid(c.sources,c.id);
 for(const s of c.sources){assert(['official-product','official-docs','official-company','official-pricing','paper'].includes(s.kind));assert(/^\d{4}-\d{2}-\d{2}$/.test(s.accessedAt));}
 assert(c.products.length>=1&&c.products.length<=3,`${c.id} 请保留1–3个重点产品组合`);const pids=new Set();
 for(const p of c.products){safeId(p.id);assert(!pids.has(p.id));pids.add(p.id);assert(p.name&&p.kind in metadata.kindLabels&&p.stage in metadata.productStageLabels);assert.equal(new URL(p.url).protocol,'https:');
  for(const [k,min]of Object.entries({description:30,users:12,delivery:20,monetization:20,aiRole:30,limits:35}))assert(zhCount(p[k]||'')>=min,`${c.id}/${p.id}/${k} 信息不足`);
  assert(p.sourceIds?.length&&p.sourceIds.every(id=>sourceIds.has(id)),`${c.id}/${p.id} 引用不存在`);
 }
 assert.deepEqual(Object.keys(c.analysis).sort(),Object.keys(metadata.dimensions).sort(),`${c.id} 维度必须完整`);
 for(const k of Object.keys(metadata.dimensions)){blocksValid(c.analysis[k],sourceIds,`${c.id}/${k}`,2,140);assert(c.analysis[k].every(b=>zhCount(b.text)>=60),`${c.id}/${k} 分项过短`);}
}
