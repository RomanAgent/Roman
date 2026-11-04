import {readFileSync,readdirSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import {companyValid,deepValid,zhCount,safeId} from './research-contract.mjs';
const root=new URL('../',import.meta.url),read=p=>JSON.parse(readFileSync(new URL(p,root),'utf8'));
const supply=read('content/supply-chain/catalog.json'),hardware=read('content/hardware/catalog.json');
assert(supply.complete===true,'供应链目录仍是临时构建，请完成全部深析后运行 npm run catalog');
const productMap=new Map(hardware.products.map(p=>[p.id,p]));
const rawCompanies=readdirSync(new URL('content/supply-chain/',root)).filter(f=>/^companies-.+\.json$/.test(f)).flatMap(f=>read('content/supply-chain/'+f));
const rawDeep=readdirSync(new URL('content/hardware/deep/',root)).filter(f=>f.endsWith('.json')).flatMap(f=>read('content/hardware/deep/'+f));
assert.equal(rawCompanies.length,supply.companies.length);assert.equal(rawDeep.length,hardware.products.length,'产品深析覆盖不完整');
const companyMap=new Map(supply.companies.map(c=>[c.id,c]));let links=0,disclosed=0;
const supplyIndex=read('content/supply-chain/index.json'),hardwareIndex=read('content/hardware/index.json');
assert.deepEqual(supplyIndex.companies.map(c=>c.id),supply.companies.map(c=>c.id),'公司摘要索引不同步');
assert.deepEqual(hardwareIndex.products.map(p=>p.id),hardware.products.map(p=>p.id),'产品摘要索引不同步');
for(const p of hardware.products)assert.deepEqual(read(`content/hardware/products/${p.id}.json`),p,`${p.id} 独立详情不同步`);
for(const c of supply.companies)assert.deepEqual(read(`content/supply-chain/companies/${c.id}.json`),c,`${c.id} 公司独立详情不同步`);
for(const c of rawCompanies){companyValid(c,supply);const {relatedProducts,...record}=companyMap.get(c.id);assert.deepEqual(record,c,`${c.id} 公司源数据未同步`);assert(existsSync(new URL(`docs/supply-chain/${c.id}.md`,root)));}
for(const d of rawDeep){
 deepValid(d,productMap);const {id,...record}=d;assert.deepEqual(productMap.get(id).deepDive,record,`${id} 深析源数据未同步`);
 const p=d.innovationProfile;assert(p,`${id} 缺场景去重资料`);safeId(p.needKey);assert(p.needName&&p.comparisonBasis&&zhCount(p.difference)>=80,`${id} 创新差异不完整`);assert(p.evidence==='analysis');assert(p.sourceIds.length&&p.sourceIds.every(s=>d.sources.some(x=>x.id===s)));
 for(const l of d.supplierLinks){const c=companyMap.get(l.supplierId);assert(c,`${id} 关联公司不存在`);assert(c.roles.includes(l.role));assert(l.supplierSourceIds.every(s=>c.sources.some(x=>x.id===s)));assert(c.relatedProducts.some(r=>r.productId===id&&r.component===l.component&&r.relationship===l.relationship),`${id} 反向关联缺失`);links++;if(l.relationship==='disclosed')disclosed++;}
}
assert.equal(supply.counts.candidateLinks+supply.counts.disclosedLinks,links);assert.equal(supply.counts.disclosedLinks,disclosed);
assert.equal(hardware.discovery.profiledProducts,hardware.products.length);
const sceneIds=hardware.discovery.groups.flatMap(g=>g.productIds);assert.equal(new Set(sceneIds).size,hardware.products.length);assert.equal(sceneIds.length,hardware.products.length,'场景重复计数');
for(const p of hardware.products.filter(p=>p.status==='reservation'))assert.equal(p.saleMode,'reservation',`${p.id} 预约不能标成零售/正式预售`);
for(const p of hardware.products.filter(p=>p.status==='assisted_program'))assert.equal(p.saleMode,'assisted-program',`${p.id} 资助申领不能标成零售/正式预售`);
assert.equal(new Set(hardware.discovery.innovationProductIds).size,hardware.discovery.innovationProductIds.length,'创新专题产品重复');
assert(hardware.discovery.innovationProductIds.every(id=>productMap.has(id)),'创新专题有未知产品');
console.log(`供应链与深析检查通过：${rawCompanies.length}家公司、${rawDeep.length}款八维详析、${hardware.discovery.groups.length}个核心场景、${links}条双向关联（${disclosed}条公开披露）。`);
