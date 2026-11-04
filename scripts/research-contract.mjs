import assert from 'node:assert/strict';
export const hardwareDimensions={demand:'需求与市场',userProfile:'用户画像',competition:'竞争与替代',supplyChain:'供应链',technology:'技术路径',aesthetics:'产品审美',risks:'关键风险',opportunity:'市场空间'};
export const zhCount=s=>(s.match(/[\u3400-\u9fff]/g)||[]).length;
export function safeId(id){assert.match(id,/^[a-z0-9-]+$/);}
export function sourcesValid(sources,owner){
 assert(sources.length>=2,`${owner} 至少需要两条来源`);
 const ids=new Set();
 for(const s of sources){safeId(s.id);assert(!ids.has(s.id),`${owner} 来源ID重复`);ids.add(s.id);assert.equal(new URL(s.url).protocol,'https:');assert(s.title&&s.note,`${owner} 来源说明不完整`);}
 return ids;
}
export function blocksValid(blocks,sourceIds,owner,minBlocks,minLength){
 assert(Array.isArray(blocks)&&blocks.length>=minBlocks,`${owner} 分析段落不足`);
 assert(blocks.reduce((n,b)=>n+zhCount(b.text||''),0)>=minLength,`${owner} 深度分析不足`);
 for(const b of blocks){assert(b.title&&zhCount(b.text)>=50,`${owner} 缺少实质分项`);assert(['official','analysis','validation'].includes(b.evidence),`${owner} 未标事实或判断`);assert(b.sourceIds?.length,`${owner} 缺引用`);assert(b.sourceIds.every(s=>sourceIds.has(s)),`${owner} 引用不存在`);}
}
export function companyValid(c,metadata){
 safeId(c.id);assert(c.name&&c.legalName&&c.country&&c.locations.length&&c.summary&&c.tierNote,`${c.id} 公司信息不完整`);
 assert(c.tier in metadata.tierLabels);assert(c.roles.length&&c.roles.every(r=>metadata.roles.some(x=>x.id===r)));assert(c.capabilities.length&&c.productCategories.length);
 for(const u of [c.website,c.contactUrl])assert.equal(new URL(u).protocol,'https:');
 const ids=sourcesValid(c.sources,c.id);for(const k of Object.keys(metadata.dimensions))blocksValid(c.analysis[k],ids,`${c.id}/${k}`,2,140);
}
export function deepValid(d,products){
 safeId(d.id);assert(products.has(d.id),`未知产品深析 ${d.id}`);const ids=sourcesValid(d.sources,d.id);
 for(const k of Object.keys(hardwareDimensions))blocksValid(d.dimensions[k],ids,`${d.id}/${k}`,3,230);
 assert(d.supplierLinks.length>=2,`${d.id} 至少两家公司链接`);const links=new Set();
 for(const l of d.supplierLinks){safeId(l.supplierId);assert(!links.has(l.supplierId+'|'+l.component),`${d.id} 重复关联`);links.add(l.supplierId+'|'+l.component);assert(['candidate','disclosed'].includes(l.relationship));assert(l.component&&zhCount(l.rationale)>=45,`${d.id} 关联理由不完整`);assert(l.sourceIds?.length&&l.sourceIds.every(s=>ids.has(s)));assert(l.supplierSourceIds?.length);if(l.relationship==='disclosed')assert(l.relationshipEvidence&&l.relationshipEvidence.length>=30,`${d.id} 公开采用关系缺点名证据说明`);}
}
